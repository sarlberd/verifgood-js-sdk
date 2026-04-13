# VerifgoodSDK - AI Agent Instructions

When writing code that uses VerifgoodSDK:

1. Read `docs/agents/llms.txt` for a compact overview of all 53 services, grouped by domain
2. For full type definitions and method signatures, read `docs/agents/llms-full.txt`
3. For programmatic access (MCP tools), use `docs/agents/sdk-reference.json`

## Key Patterns

- Services are accessed via `sdk.<serviceName>` (lazy-initialized)
- Use `Metadatas` class for filtering/pagination on all `getAll()` calls
- Filter actions: equals, contains, between, start_with, is_null, greater_than, in, ...
- Collection responses: `{ datas: Entity[], metadatas: { counters: { All: number } } }`
- All services inherit CRUD: `getAll(metadatas)`, `getById(id)`, `create(data)`, `update(id, data)`, `remove(id)`
- Some services override CRUD methods with custom behavior (noted in docs)

## MCP Toolbelt (recommended)

An MCP server is available so AI agents can query SDK docs on demand instead of reading files. This gives your agent 5 tools: `list_services`, `get_service`, `get_type`, `search_methods`, `get_metadatas`.

### Setup

1. Install dependencies:
```bash
cd docs/agents/mcp-server
npm install
```

2. Add to your `.mcp.json` (Claude Code) or MCP client config:
```json
{
  "mcpServers": {
    "vg-sdk-docs": {
      "type": "stdio",
      "command": "node",
      "args": ["<path-to-sdk>/docs/agents/mcp-server/index.js"],
      "env": {
        "SDK_REFERENCE_PATH": "<path-to-sdk>/docs/agents/sdk-reference.json"
      }
    }
  }
}
```

Replace `<path-to-sdk>` with the absolute path to the VerifgoodSDK directory.

### Available Tools

| Tool | Description | Example |
|------|-------------|---------|
| `list_services(domain?)` | List all services or filter by domain | `list_services({ domain: "assets" })` |
| `get_service(name)` | Full service detail: methods, types, endpoints | `get_service({ name: "equipements" })` |
| `get_type(name)` | Interface field definitions | `get_type({ name: "Equipement" })` |
| `search_methods(query)` | Search methods by keyword | `search_methods({ query: "export" })` |
| `get_metadatas()` | Metadatas query builder docs | `get_metadatas()` |

Domains: assets, maintenance, preventive, locations, contracts, stocks, purchasing, admin, analytics, compliance, organization, scheduling, search, sharing, notifications, billing, documents

## Regenerating docs

After modifying `src/apiRequests/`, `src/types/`, or `src/VGSDK.ts`:
```
npm run docs:agents
```
