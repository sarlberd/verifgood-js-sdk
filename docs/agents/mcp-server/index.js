#!/usr/bin/env node
/**
 * VgSdkDocs MCP Server
 *
 * Exposes VerifgoodSDK documentation as MCP tools so AI agents can
 * query services, methods, and types on demand without reading files.
 *
 * Reads sdk-reference.json from the path in SDK_REFERENCE_PATH env var.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";

// ─── Load SDK reference ─────────────────────────────────────────────────────

const SDK_REF_PATH = process.env.SDK_REFERENCE_PATH;
if (!SDK_REF_PATH) {
  process.stderr.write("[vg-sdk-docs] ERROR: SDK_REFERENCE_PATH env var not set\n");
  process.exit(1);
}

let sdkRef;
try {
  sdkRef = JSON.parse(fs.readFileSync(SDK_REF_PATH, "utf-8"));
  process.stderr.write(`[vg-sdk-docs] Loaded ${sdkRef.services.length} services from ${SDK_REF_PATH}\n`);
} catch (err) {
  process.stderr.write(`[vg-sdk-docs] ERROR reading ${SDK_REF_PATH}: ${err.message}\n`);
  process.exit(1);
}

// ─── Build indexes for fast lookup ──────────────────────────────────────────

const servicesByName = new Map();
const servicesByAccessor = new Map();
const servicesByDomain = new Map();
const typesByName = new Map();

for (const svc of sdkRef.services) {
  servicesByName.set(svc.className.toLowerCase(), svc);
  const accessor = svc.accessor.replace("sdk.", "");
  servicesByAccessor.set(accessor.toLowerCase(), svc);

  const domain = svc.domain || "other";
  if (!servicesByDomain.has(domain)) servicesByDomain.set(domain, []);
  servicesByDomain.get(domain).push(svc);

  for (const t of svc.types) {
    typesByName.set(t.name.toLowerCase(), { ...t, service: svc.accessor });
  }
}

// ─── Naming rules (legacy disambiguation) ──────────────────────────────────

const namingRules = sdkRef.namingRules || null;

/** Map field names to their clarification note */
const fieldNotes = new Map();
if (namingRules) {
  for (const alias of namingRules.tenantId.aliases) {
    fieldNotes.set(alias.toLowerCase(), `⚠ "${alias}" = Tenant/Organization ID (not a user)`);
  }
  for (const alias of namingRules.userId.aliases) {
    fieldNotes.set(alias.toLowerCase(), `⚠ "${alias}" = User primary key (integer)`);
  }
}

function fieldNote(fieldName) {
  return fieldNotes.get(fieldName.toLowerCase()) || null;
}

// ─── Tool implementations ───────────────────────────────────────────────────

function listServices(domain) {
  let services;
  if (domain) {
    services = servicesByDomain.get(domain.toLowerCase()) || [];
  } else {
    services = sdkRef.services;
  }

  const lines = [];
  if (!domain) {
    const domains = [...servicesByDomain.keys()].sort();
    lines.push(`Domains: ${domains.join(", ")}\n`);
  }

  for (const svc of services) {
    const methodCount = svc.methods.length;
    const typeCount = svc.types.length;
    const custom = svc.methods.filter(m => !m.isInherited && !m.isOverride).length;
    lines.push(`${svc.accessor} — ${svc.endpoint} (${methodCount} methods, ${typeCount} types, ${custom} custom)`);
    if (svc.description) lines.push(`  ${svc.description}`);
  }

  return lines.join("\n");
}

function getService(name) {
  const key = name.toLowerCase().replace("sdk.", "");
  const svc = servicesByAccessor.get(key) || servicesByName.get(key);
  if (!svc) return `Service "${name}" not found. Use list_services to see available services.`;

  const lines = [];
  lines.push(`# ${svc.accessor}`);
  lines.push(`Class: ${svc.className}`);
  lines.push(`Endpoint: ${svc.endpoint} | ${svc.endpointSingleton}`);
  lines.push(`Domain: ${svc.domain}`);
  if (svc.description) lines.push(`Description: ${svc.description}`);
  lines.push("");

  lines.push("## Methods");
  for (const m of svc.methods) {
    const params = m.params.map(p => {
      let s = p.name;
      if (p.optional) s += "?";
      s += ": " + p.type;
      if (p.default) s += " = " + p.default;
      return s;
    }).join(", ");

    const tags = [];
    if (m.isInherited) tags.push("inherited");
    if (m.isOverride) tags.push("override");
    if (m.isDeprecated) tags.push("DEPRECATED");
    const tagStr = tags.length ? ` [${tags.join(", ")}]` : "";

    lines.push(`- ${m.httpVerb} ${m.name}(${params}): ${m.returnType}${tagStr}`);
    if (m.description) lines.push(`  ${m.description}`);
    if (m.customEndpoint) lines.push(`  Endpoint: ${m.customEndpoint}`);

    // Annotate ambiguous param names
    const paramNotes = m.params.map(p => fieldNote(p.name)).filter(Boolean);
    for (const n of paramNotes) lines.push(`  ${n}`);
  }

  if (svc.types.length > 0) {
    lines.push("");
    lines.push("## Types");
    for (const t of svc.types) {
      lines.push(`\n### ${t.name} (${t.kind})`);
      if (t.fields.length > 0) {
        for (const f of t.fields) {
          const opt = f.optional ? " (optional)" : " (required)";
          const note = fieldNote(f.name);
          lines.push(`  ${f.name}: ${f.type}${opt}${note ? "  — " + note : ""}`);
        }
      }
    }
  }

  return lines.join("\n");
}

function getType(name) {
  const key = name.toLowerCase();
  const t = typesByName.get(key);
  if (!t) return `Type "${name}" not found. Use get_service to see types for a service.`;

  const lines = [];
  lines.push(`# ${t.name} (${t.kind})`);
  lines.push(`Service: ${t.service}`);
  lines.push("");

  if (t.fields.length > 0) {
    lines.push("| Field | Type | Optional | Note |");
    lines.push("|-------|------|----------|------|");
    for (const f of t.fields) {
      const note = fieldNote(f.name) || "";
      lines.push(`| ${f.name} | ${f.type} | ${f.optional ? "yes" : "no"} | ${note} |`);
    }
  } else {
    lines.push("No fields defined.");
  }

  return lines.join("\n");
}

function searchMethods(query) {
  const q = query.toLowerCase();
  const results = [];

  for (const svc of sdkRef.services) {
    for (const m of svc.methods) {
      const searchable = `${m.name} ${m.description || ""} ${m.httpVerb}`.toLowerCase();
      if (searchable.includes(q)) {
        const params = m.params.map(p => {
          let s = p.name;
          if (p.optional) s += "?";
          s += ": " + p.type;
          return s;
        }).join(", ");

        const tags = [];
        if (m.isDeprecated) tags.push("DEPRECATED");
        const tagStr = tags.length ? ` [${tags.join(", ")}]` : "";

        results.push(`${svc.accessor}.${m.name}(${params}): ${m.returnType}${tagStr}`);
        if (m.description) results.push(`  ${m.description}`);
      }
    }
  }

  if (results.length === 0) return `No methods matching "${query}".`;
  return `Found ${results.length} matching methods:\n\n${results.join("\n")}`;
}

function getMetadatas() {
  const meta = sdkRef.metadatas;
  const lines = [];
  lines.push("# Metadatas (Query Builder)");
  lines.push(meta.description);
  lines.push("");

  lines.push("## Filter Actions");
  lines.push(meta.filterActions.join(", "));
  lines.push("");

  lines.push("## Methods");
  for (const m of meta.methods) {
    const params = m.params.map(p => {
      let s = p.name;
      if (p.optional) s += "?";
      s += ": " + p.type;
      return s;
    }).join(", ");
    lines.push(`- ${m.name}(${params}): ${m.returnType}`);
    if (m.description) lines.push(`  ${m.description}`);
  }
  lines.push("");

  lines.push("## Examples");
  for (const ex of meta.examples) {
    lines.push("```typescript");
    lines.push(ex);
    lines.push("```");
    lines.push("");
  }

  lines.push("## Response Format");
  lines.push("{ datas: T[], metadatas: { counters: { All: number } } }");

  return lines.join("\n");
}

// ─── MCP Server ─────────────────────────────────────────────────────────────

const server = new Server(
  { name: "vg-sdk-docs", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_services",
      description: "List all VerifgoodSDK services, optionally filtered by domain (assets, maintenance, preventive, locations, contracts, stocks, purchasing, admin, analytics, compliance, organization, scheduling, search, sharing, notifications, billing, documents)",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "Filter by domain. Omit to list all services with domains summary.",
          },
        },
      },
    },
    {
      name: "get_service",
      description: "Get full details of a VerifgoodSDK service: methods with signatures, types, endpoint. Use the accessor name (e.g. 'equipements', 'lieux', 'taches') or class name.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Service accessor name (e.g. 'equipements') or class name (e.g. 'Equipements')",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "get_type",
      description: "Get the full field definition of a VerifgoodSDK TypeScript interface (entity, createRequest, or updateRequest).",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Interface name (e.g. 'Equipement', 'LieuCreateRequest', 'TacheUpdateRequest')",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "search_methods",
      description: "Search across all VerifgoodSDK service methods by keyword. Matches method names, descriptions, and HTTP verbs.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search keyword (e.g. 'export', 'excel', 'timeline', 'create', 'POST')",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_metadatas",
      description: "Get documentation for the Metadatas query builder class: filter actions, methods, pagination, and usage examples.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  let result;
  switch (name) {
    case "list_services":
      result = listServices(args?.domain);
      break;
    case "get_service":
      result = getService(args.name);
      break;
    case "get_type":
      result = getType(args.name);
      break;
    case "search_methods":
      result = searchMethods(args.query);
      break;
    case "get_metadatas":
      result = getMetadatas();
      break;
    default:
      result = `Unknown tool: ${name}`;
  }

  return {
    content: [{ type: "text", text: result }],
  };
});

// ─── Start ──────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
process.stderr.write("[vg-sdk-docs] MCP server running on stdio\n");
