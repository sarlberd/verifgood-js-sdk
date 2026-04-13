/**
 * generate-agent-docs.ts
 *
 * Parses the VerifgoodSDK source code using ts-morph and generates:
 * - docs/agents/sdk-reference.json  (structured data for MCP server)
 * - docs/agents/llms.txt            (compact index for AI agents)
 * - docs/agents/llms-full.txt       (full reference with types)
 *
 * Usage: npx ts-node scripts/generate-agent-docs.ts
 */

import { Project, ClassDeclaration, MethodDeclaration, SourceFile, SyntaxKind, PropertyDeclaration, InterfaceDeclaration, Scope } from "ts-morph";
import * as fs from "fs";
import * as path from "path";

// ─── Domain context (manually maintained) ───────────────────────────────────

const DOMAIN_MAP: Record<string, { domain: string; description: string }> = {
  "Equipements": { domain: "assets", description: "Physical assets/equipment tracked in locations" },
  "Lieux": { domain: "locations", description: "Hierarchical location tree (Organisation > Site > Batiment > Etage > Piece)" },
  "Maintenance": { domain: "maintenance", description: "Work orders (fiches SAV) for equipment repair" },
  "Interventions": { domain: "maintenance", description: "Service interventions linked to maintenance and contracts" },
  "Taches": { domain: "preventive", description: "Preventive maintenance tasks with checkpoints" },
  "Checkpoints": { domain: "preventive", description: "Verification checkpoints within preventive tasks" },
  "Verifications": { domain: "compliance", description: "Periodic compliance checks on equipment" },
  "Categories": { domain: "assets", description: "Equipment classification categories with composants" },
  "Contrat": { domain: "contracts", description: "Service contracts with third-party providers" },
  "ContratEcheancier": { domain: "contracts", description: "Contract payment schedules" },
  "Tiers": { domain: "contracts", description: "Third-party service providers/contractors" },
  "Contact": { domain: "contracts", description: "Contacts associated with third parties" },
  "Composant": { domain: "assets", description: "Component templates associated with categories" },
  "Consommable": { domain: "stocks", description: "Consumable items tracked in stock" },
  "Stocks": { domain: "stocks", description: "Stock levels and movements" },
  "BonsDeCommande": { domain: "purchasing", description: "Purchase orders" },
  "BonDeCommandeItems": { domain: "purchasing", description: "Line items within purchase orders" },
  "BonsDeCommandeEntites": { domain: "purchasing", description: "Entities associated with purchase orders" },
  "BonsDentree": { domain: "purchasing", description: "Goods receipt notes" },
  "BonsDeSortie": { domain: "purchasing", description: "Goods dispatch notes" },
  "Documents": { domain: "documents", description: "File attachments and documents" },
  "Affectations": { domain: "scheduling", description: "Task assignments and scheduling" },
  "Calendar": { domain: "scheduling", description: "Calendar events and scheduling views" },
  "Dashboard": { domain: "analytics", description: "Dashboard widgets and statistics" },
  "Statistiques": { domain: "analytics", description: "Statistical reports and data" },
  "SyntheseMaintenance": { domain: "analytics", description: "Maintenance synthesis reports" },
  "Account": { domain: "admin", description: "User account management" },
  "Roles": { domain: "admin", description: "Role-based access control" },
  "Parametres": { domain: "admin", description: "Application parameters and settings" },
  "PersonalParameters": { domain: "admin", description: "User-specific preferences" },
  "Invitations": { domain: "admin", description: "User invitation management" },
  "Tags": { domain: "organization", description: "Tag management for entities" },
  "LibelProblem": { domain: "organization", description: "Problem label definitions" },
  "LibelServices": { domain: "organization", description: "Service label definitions" },
  "LibellesCategorie": { domain: "organization", description: "Category label definitions" },
  "CorpsDetat": { domain: "organization", description: "Trade/craft type definitions" },
  "Reponses": { domain: "compliance", description: "Verification responses and answers" },
  "Operation": { domain: "maintenance", description: "Maintenance operations" },
  "PlanMaintenance": { domain: "preventive", description: "Maintenance planning" },
  "PlanInteractif": { domain: "locations", description: "Interactive floor plans for locations" },
  "Inventaire": { domain: "assets", description: "Equipment inventory management" },
  "IntegrationsDonnees": { domain: "admin", description: "Data integration/import management" },
  "GroupeValidateurs": { domain: "admin", description: "Validator groups for approval workflows" },
  "GroupeValidateursUsers": { domain: "admin", description: "Users within validator groups" },
  "FicheDemandeConsommables": { domain: "stocks", description: "Consumable request forms" },
  "DeplacementsEquipements": { domain: "assets", description: "Equipment movement history" },
  "MouvementsEquipements": { domain: "assets", description: "Equipment movement records" },
  "SortieEquipement": { domain: "assets", description: "Equipment decommissioning/exit" },
  "SearchDatas": { domain: "search", description: "Global search across entities" },
  "SharedLinks": { domain: "sharing", description: "Shared link management" },
  "Messaging": { domain: "notifications", description: "Firebase Cloud Messaging (FCM) integration" },
  "Stripe": { domain: "billing", description: "Stripe payment integration" },
  "TacheUsers": { domain: "preventive", description: "User assignments for preventive tasks" },
};

// ─── Service enrichments (domain knowledge from backend) ────────────────────

const SERVICE_ENRICHMENTS: Record<string, ServiceEnrichment> = {
  "Operation": {
    notes: [
      "Operations are the audit trail / event log of a maintenance (ficheSAV). Each operation has a `flag` that determines its type, required payload, status effects, and side effects.",
      "Always required fields: dateOperation (timestamp), ficheSav_id (maintenance ID), idUser (user performing action).",
    ],
    enums: [{
      name: "OperationFlags",
      description: "The `flag` field determines the operation type. Each flag may require additional payload fields, change the maintenance status, or trigger side effects (emails, document links).",
      field: "flag",
      values: [
        {
          value: "fermeture",
          label: "Closure",
          description: "Close/resolve a maintenance ticket",
          statusChange: "→ RESOLUE (or → ATTENTE_VALIDATION_SUPERVISEUR if supervisor validation required)",
          sideEffects: ["Sets dateFermetureSAV", "May generate CLOTURE_FILE operations if files attached", "May generate AFFECTES_WORKING_TIME_UPDATE"],
        },
        {
          value: "reouverture",
          label: "Reopening",
          description: "Reopen a previously closed maintenance",
          requiredFields: ["date"],
          statusChange: "→ EN_COURS",
          sideEffects: ["Clears dateFermetureSAV (set to null)"],
        },
        {
          value: "prise_en_compte",
          label: "Acknowledged",
          description: "Acknowledge/take ownership of a maintenance request",
          statusChange: "→ PRISE_EN_COMPTE",
        },
        {
          value: "en_attente",
          label: "On Hold",
          description: "Put maintenance on hold (waiting for parts, customer feedback, etc.)",
          statusChange: "→ EN_ATTENTE",
        },
        {
          value: "a-valider",
          label: "Pending Validation",
          description: "Closure pending supervisor approval. Auto-generated when non-supervisor closes a maintenance that requires validation.",
          statusChange: "→ ATTENTE_VALIDATION_SUPERVISEUR",
        },
        {
          value: "validation",
          label: "Supervisor Validation",
          description: "Supervisor approves/validates completed maintenance",
          statusChange: "→ RESOLUE",
        },
        {
          value: "manuelle",
          label: "Manual Comment",
          description: "Add a manual comment/note to maintenance timeline",
          requiredFields: ["operation (comment text)"],
          sideEffects: ["EMAIL: notifies team members with emailing_commentaire_fm preference enabled"],
        },
        {
          value: "relance",
          label: "Follow-up",
          description: "Follow up / escalate a pending maintenance",
          sideEffects: ["Sets isRelance flag on maintenance"],
        },
        {
          value: "relance/iot",
          label: "IoT Follow-up",
          description: "Automated follow-up triggered by IoT device",
          sideEffects: ["Sets isRelance flag on maintenance"],
        },
        {
          value: "urgence",
          label: "Emergency",
          description: "Mark maintenance as urgent priority",
        },
        {
          value: "differe",
          label: "Deferred",
          description: "Defer/postpone maintenance to a later date",
        },
        {
          value: "affectation/interne",
          label: "Internal Assignment",
          description: "Assign maintenance to internal team member(s)",
          requiredFields: ["affectation_id", "affectes (array of user IDs)"],
        },
        {
          value: "affectation/externe",
          label: "External Assignment",
          description: "Assign maintenance to external third party (vendor/contractor)",
          requiredFields: ["tiers_id", "affectation_id"],
        },
        {
          value: "affectation/externe/email",
          label: "External Assignment + Email",
          description: "Assign to external party AND send notification email",
          requiredFields: ["tiers_id", "affectation_id"],
          sideEffects: ["EMAIL: sends assignment notification to external party"],
        },
        {
          value: "affectation-tiers-accept",
          label: "Third Party Accepts",
          description: "Third party confirms acceptance of maintenance assignment",
          requiredFields: ["affectation_id"],
        },
        {
          value: "affectation-tiers-reject",
          label: "Third Party Rejects",
          description: "Third party declines the maintenance assignment",
          requiredFields: ["affectation_id"],
        },
        {
          value: "affectes-working-time-update",
          label: "Working Time Update",
          description: "Record/update time worked by assigned technicians. Auto-generated at closure.",
          requiredFields: ["affectation_id", "affectes (array with time allocations)"],
        },
        {
          value: "photo",
          label: "Attach Photo",
          description: "Attach a photo/image to maintenance timeline",
          requiredFields: ["attachedFile_id"],
        },
        {
          value: "img",
          label: "Image from DI",
          description: "Photo taken from dispatch instruction system",
          requiredFields: ["attachedFile_id"],
        },
        {
          value: "cloture-file",
          label: "Closure File",
          description: "Attach supporting document at closure. Auto-generated during fermeture when files provided.",
          requiredFields: ["attachedFile_id", "operation (file name)"],
        },
        {
          value: "levee-reserve-file",
          label: "Reserve Lift File",
          description: "Attach document to lift/clear reserve status. Auto-generated when lifting reserves with files.",
          requiredFields: ["attachedFile_id"],
        },
        {
          value: "email",
          label: "Email Notification",
          description: "Send email notification about maintenance",
          sideEffects: ["EMAIL: triggers notification to configured recipients"],
        },
        {
          value: "email-demande-devis",
          label: "Quote Request Email",
          description: "Send quote request email to vendor",
          requiredFields: ["tiers_id"],
          sideEffects: ["EMAIL: sends quote request to vendor"],
        },
        {
          value: "bi",
          label: "Work Order (Bon d'Intervention)",
          description: "Generate/attach a work order document",
        },
        {
          value: "consommation",
          label: "Consumable Usage",
          description: "Record consumption of spare parts/materials during maintenance",
          requiredFields: ["consommableMouvement_id"],
        },
        {
          value: "changement_equipement",
          label: "Equipment Replacement",
          description: "Record equipment replacement/swap",
          requiredFields: ["sortieEquipement_id"],
          sideEffects: ["Creates SortieEquipement record", "May trigger automatic closure"],
        },
        {
          value: "a_prevoir",
          label: "To Be Planned",
          description: "Mark maintenance as pending planning/scheduling",
          requiredFields: ["operation (description)"],
        },
        {
          value: "tache",
          label: "Task",
          description: "Add a task/work item to maintenance",
          requiredFields: ["operation (task description)"],
        },
        {
          value: "intervention-reserve",
          label: "Reserved Intervention",
          description: "Mark intervention as reserved with external party",
          requiredFields: ["intervention_id"],
        },
        {
          value: "tiersinterventionponctuelle",
          label: "One-Time Vendor Intervention",
          description: "One-time intervention by external vendor (not under contract)",
          requiredFields: ["tiersintervention_id"],
        },
        {
          value: "retourAFaire",
          label: "Rework Needed",
          description: "Work requires correction before closure can proceed",
          requiredFields: ["retourClient (reason)"],
        },
        {
          value: "retourFait",
          label: "Rework Completed",
          description: "Correction/rework has been completed, closure can proceed",
        },
      ],
    }],
  },
  "Taches": {
    notes: [
      "Taches are preventive maintenance tasks with checkpoints. Each tache is linked to a category or specific equipments, assigned to sites, and scheduled via affectations.",
      "Two creation schemas: Schema A (category-based, requires idCategorie_id) applies to all equipment of that category. Schema B (equipment-restricted, requires tacheEquipements[]) applies to specific equipment only.",
    ],
    methods: {
      "getTaches": {
        outputNotes: "{ datas: TacheEntity[], metadatas: { counters: { All: number } } }",
      },
      "getTache": {
        outputNotes: "Single TacheEntity with checkpoints[], affectation, tacheSites[], tacheEquipements[], and categorie fully populated.",
      },
      "getTachesOverview": {
        outputNotes: "{ total: number, completed: number, pending: number }",
      },
      "createTaches": {
        inputNotes: "{ datas: TacheCreateRequest[], restrictionSites?: number[] }. Each tache must include checkpoints[] with question, typeReponse, orderOfAppearance. Schema A: set idCategorie_id. Schema B: set tacheEquipements[].",
        outputNotes: "{ datas: TacheEntity[] } — created taches with generated IDs and checkpoint IDs.",
      },
      "updateTache": {
        inputNotes: "{ datas: TacheUpdateRequest, restrictionSites?: number[] }. Include checkpoint.id to update existing, omit id to create new. Same for tacheSites and affectation.",
        outputNotes: "{ datas: TacheEntity } — updated tache.",
      },
      "deleteTache": {
        inputNotes: "Tache object with { id: number }.",
        outputNotes: "Deletion confirmation.",
      },
      "getExcelFile": {
        outputNotes: "Blob — binary file (CSV or Excel) for download.",
      },
    },
  },
  "Checkpoints": {
    methods: {
      "getAll": {
        outputNotes: "{ datas: Checkpoint[], metadatas: { counters: { All: number } } }. Each checkpoint includes nested composant and consommable objects when linked.",
      },
      "create": {
        inputNotes: "{ datas: Checkpoint[] }. Required fields per checkpoint: question, typeReponse, orderOfAppearance, idTache_id.",
        outputNotes: "Array of created checkpoints with generated IDs.",
      },
      "update": {
        inputNotes: "{ datas: Checkpoint }. Partial update — only include fields to change.",
        outputNotes: "{ datas: Checkpoint } — updated checkpoint.",
      },
    },
  },
  "TacheUsers": {
    methods: {
      "createTacheUsers": {
        inputNotes: "Array of user assignment objects + tacheId. Creates associations between users and the tache.",
        outputNotes: "Created assignment records.",
      },
      "deleteTacheUsers": {
        inputNotes: "tacheId: number. Deletes ALL user assignments from this tache.",
        outputNotes: "Deletion confirmation.",
      },
      "deleteTacheUser": {
        inputNotes: "tacheId: number, userId: number. Deletes a single user assignment.",
        outputNotes: "Deletion confirmation.",
      },
    },
  },
  "Verifications": {
    methods: {
      "getProgressionsTaches": {
        outputNotes: "{ datas: ProgressionTache[], metadatas: ... }. Each progression has nested site (id, libel_lieu, path) and tache (id, libel, type, categorie) objects.",
      },
      "getCheckDatas": {
        outputNotes: "{ equipements: Equipement[], taches: TacheEntity[], verifications: Verification[], counters: {} }. Returns equipment that must be verified with their tasks and latest verification status.",
      },
      "getVerification": {
        outputNotes: "{ verification: Verification, reponses: Reponse[], account: Account, logs: VerificationLog[] }. Full verification detail with responses, account context, and change history.",
      },
      "updateVerification": {
        inputNotes: "{ datas: { dateVerif?, commentaire?, nbNonConformites?, spentTime?, username?, documents?, reponses[] } }.",
        outputNotes: "Updated verification object.",
      },
      "startVerification": {
        inputNotes: "equipementId (required), tacheId (optional), uniquementMesTachesAffectes (boolean, default false).",
        outputNotes: "Array of taches for the equipment, with checkpoints and affectation data.",
      },
    },
  },
};

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface ParamInfo {
  name: string;
  type: string;
  optional: boolean;
  default?: string;
}

interface MethodInfo {
  name: string;
  params: ParamInfo[];
  returnType: string;
  description: string;
  isInherited: boolean;
  isOverride: boolean;
  isDeprecated: boolean;
  httpVerb: string;
  customEndpoint: string;
}

interface FieldInfo {
  name: string;
  type: string;
  optional: boolean;
}

interface TypeInfo {
  name: string;
  kind: "entity" | "createRequest" | "updateRequest" | "other";
  fields: FieldInfo[];
  description: string;
}

interface EnumValue {
  value: string;
  label: string;
  description: string;
  requiredFields?: string[];
  statusChange?: string;
  sideEffects?: string[];
}

interface MethodEnrichment {
  inputNotes?: string;
  outputNotes?: string;
  inputType?: string;
  outputType?: string;
}

interface ServiceEnrichment {
  enums?: { name: string; description: string; field: string; values: EnumValue[] }[];
  notes?: string[];
  methods?: Record<string, MethodEnrichment>;
}

interface ServiceInfo {
  name: string;
  className: string;
  accessor: string;
  endpoint: string;
  endpointSingleton: string;
  domain: string;
  description: string;
  methods: MethodInfo[];
  types: TypeInfo[];
  enrichment?: ServiceEnrichment;
}

interface MetadatasInfo {
  description: string;
  filterActions: string[];
  methods: MethodInfo[];
  examples: string[];
}

interface SdkReference {
  version: string;
  generatedAt: string;
  init: { code: string; description: string };
  metadatas: MetadatasInfo;
  services: ServiceInfo[];
}

// ─── CRUD methods from ApiRequest base class ────────────────────────────────

const BASE_CRUD_METHODS: MethodInfo[] = [
  { name: "getAll", params: [{ name: "metadatas", type: "Metadatas", optional: false }], returnType: "Promise<any>", description: "Get all records with filtering/pagination", isInherited: true, isOverride: false, isDeprecated: false, httpVerb: "GET", customEndpoint: "" },
  { name: "getById", params: [{ name: "id", type: "number", optional: false }], returnType: "Promise<any>", description: "Get a single record by ID", isInherited: true, isOverride: false, isDeprecated: false, httpVerb: "GET", customEndpoint: "" },
  { name: "create", params: [{ name: "datas", type: "any", optional: false }], returnType: "Promise<any>", description: "Create a new record", isInherited: true, isOverride: false, isDeprecated: false, httpVerb: "POST", customEndpoint: "" },
  { name: "update", params: [{ name: "id", type: "number", optional: false }, { name: "datas", type: "any", optional: false }], returnType: "Promise<any>", description: "Update a record by ID", isInherited: true, isOverride: false, isDeprecated: false, httpVerb: "PUT", customEndpoint: "" },
  { name: "remove", params: [{ name: "id", type: "number", optional: false }], returnType: "Promise<any>", description: "Delete a record by ID", isInherited: true, isOverride: false, isDeprecated: false, httpVerb: "DELETE", customEndpoint: "" },
];

const CRUD_METHOD_NAMES = new Set(BASE_CRUD_METHODS.map(m => m.name));

// ─── Parsing helpers ────────────────────────────────────────────────────────

function getJsDocText(node: MethodDeclaration | InterfaceDeclaration | ClassDeclaration): string {
  const jsDocs = node.getJsDocs();
  if (jsDocs.length === 0) return "";
  return jsDocs[0].getDescription().trim();
}

function isDeprecated(node: MethodDeclaration): boolean {
  const jsDocs = node.getJsDocs();
  for (const doc of jsDocs) {
    const tags = doc.getTags();
    for (const tag of tags) {
      if (tag.getTagName() === "deprecated") return true;
    }
    if (doc.getFullText().includes("@deprecated")) return true;
  }
  return false;
}

function extractHttpVerb(method: MethodDeclaration): string {
  const body = method.getBody()?.getText() || "";
  if (body.includes("'POST'") || body.includes('"POST"') || body.includes('this.post(')) return "POST";
  if (body.includes("'PUT'") || body.includes('"PUT"') || body.includes('this.put(')) return "PUT";
  if (body.includes("'DELETE'") || body.includes('"DELETE"') || body.includes('this.delete(')) return "DELETE";
  if (body.includes("'GET'") || body.includes('"GET"') || body.includes('this.get(') || body.includes('this.apiRequest(')) return "GET";
  return "";
}

function extractCustomEndpoint(method: MethodDeclaration): string {
  const body = method.getBody()?.getText() || "";
  // Look for string template literals or string concatenations with endpoint paths
  const templateMatch = body.match(/`([^`]*\$\{[^}]+\}[^`]*)`/);
  if (templateMatch) {
    // Simplify: replace ${this.endpoint} and ${this.endpointSingleton} with markers
    let ep = templateMatch[1];
    ep = ep.replace(/\$\{this\.endpoint\}/g, "{endpoint}");
    ep = ep.replace(/\$\{this\.endpointSingleton\}/g, "{singleton}");
    ep = ep.replace(/\$\{[^}]+\}/g, "{param}");
    return ep;
  }
  return "";
}

function getStringPropertyValue(cls: ClassDeclaration, propName: string): string {
  const prop = cls.getProperty(propName);
  if (!prop) return "";
  const init = prop.getInitializer();
  if (!init) return "";
  const text = init.getText();
  return text.replace(/['"]/g, "");
}

function classifyType(name: string): TypeInfo["kind"] {
  if (name.endsWith("CreateRequest")) return "createRequest";
  if (name.endsWith("UpdateRequest")) return "updateRequest";
  // Check for common entity patterns - not a request type
  if (!name.includes("Request") && !name.includes("Options") && !name.includes("Response")) return "entity";
  return "other";
}

// ─── Main parsing functions ─────────────────────────────────────────────────

function parseApiRequestFile(sourceFile: SourceFile): { className: string; endpoint: string; endpointSingleton: string; methods: MethodInfo[]; importedTypes: string[] } | null {
  const classes = sourceFile.getClasses();
  if (classes.length === 0) return null;

  const cls = classes[0];
  const className = cls.getName() || "";
  if (!className) return null;

  const endpoint = getStringPropertyValue(cls, "endpoint");
  const endpointSingleton = getStringPropertyValue(cls, "endpointSingleton");

  // Extract methods (public, non-constructor)
  const methods: MethodInfo[] = [];
  for (const method of cls.getMethods()) {
    const name = method.getName();
    if (name.startsWith("_") || name === "constructor") continue;

    // Skip private methods
    const scope = method.getScope();
    if (scope === Scope.Private) continue;

    const params: ParamInfo[] = method.getParameters().map(p => {
      let typeText = p.getType().getText(p);
      const isOpt = p.isOptional();
      if (isOpt) typeText = typeText.replace(/\s*\|\s*undefined$/, "");
      return {
        name: p.getName(),
        type: typeText,
        optional: isOpt,
        default: p.getInitializer()?.getText(),
      };
    });

    const returnType = method.getReturnType().getText(method);
    const description = getJsDocText(method);
    const deprecated = isDeprecated(method);
    const httpVerb = extractHttpVerb(method);
    const customEndpoint = extractCustomEndpoint(method);
    const isOverride = CRUD_METHOD_NAMES.has(name);

    methods.push({
      name,
      params,
      returnType,
      description,
      isInherited: false,
      isOverride,
      isDeprecated: deprecated,
      httpVerb,
      customEndpoint,
    });
  }

  // Extract imported type names from the types/ directory
  const importedTypes: string[] = [];
  for (const imp of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = imp.getModuleSpecifierValue();
    if (moduleSpecifier.includes("../types/")) {
      for (const named of imp.getNamedImports()) {
        importedTypes.push(named.getName());
      }
    }
  }

  return { className, endpoint, endpointSingleton, methods, importedTypes };
}

function parseTypeFile(sourceFile: SourceFile): TypeInfo[] {
  const types: TypeInfo[] = [];

  for (const iface of sourceFile.getInterfaces()) {
    const name = iface.getName();
    const kind = classifyType(name);
    const description = getJsDocText(iface);

    const fields: FieldInfo[] = iface.getProperties().map(p => {
      let typeText = p.getType().getText(p);
      const isOptional = p.hasQuestionToken();
      // Strip " | undefined" suffix for optional fields since optionality is tracked separately
      if (isOptional) {
        typeText = typeText.replace(/\s*\|\s*undefined$/, "");
      }
      return { name: p.getName(), type: typeText, optional: isOptional };
    });

    types.push({ name, kind, fields, description });
  }

  return types;
}

function parseVGSDK(sourceFile: SourceFile): Map<string, string> {
  const accessorMap = new Map<string, string>(); // accessor name -> class name

  const classes = sourceFile.getClasses();
  if (classes.length === 0) return accessorMap;

  const cls = classes[0];
  for (const getter of cls.getGetAccessors()) {
    const accessorName = getter.getName();
    const returnType = getter.getReturnType().getText(getter);
    // Return type is the class name (e.g., "Equipements")
    accessorMap.set(accessorName, returnType);
  }

  return accessorMap;
}

function parseMetadatas(sourceFile: SourceFile): MetadatasInfo {
  const filterActions = [
    "equals", "not_equals", "contains", "start_with", "end_with",
    "between", "is_null", "is_not_null", "greater_than", "less_than",
    "in", "not_in"
  ];

  const methods: MethodInfo[] = [];
  const classes = sourceFile.getClasses();
  if (classes.length > 0) {
    const cls = classes[0];
    for (const method of cls.getMethods()) {
      const name = method.getName();
      const params: ParamInfo[] = method.getParameters().map(p => ({
        name: p.getName(),
        type: p.getType().getText(p),
        optional: p.isOptional(),
        default: p.getInitializer()?.getText(),
      }));
      const returnType = method.getReturnType().getText(method);
      const description = getJsDocText(method);

      methods.push({
        name,
        params,
        returnType,
        description,
        isInherited: false,
        isOverride: false,
        isDeprecated: false,
        httpVerb: "",
        customEndpoint: "",
      });
    }
  }

  return {
    description: "Query builder for filtering, pagination, and column selection. Pass to getAll() methods.",
    filterActions,
    methods,
    examples: [
      'const m = new Metadatas();\nm.setFilter("status", "active", "equals");\nm.setLimit(0, 25);\nconst result = await sdk.equipements.getAll(m);',
      'const m = new Metadatas();\nm.setFilter("created_at", ["2024-01-01", "2024-12-31"], "between");\nm.setFilter("type_lieu", "Site", "equals");\nconst sites = await sdk.lieux.getAll(m);',
    ],
  };
}

// ─── Text generators ────────────────────────────────────────────────────────

function formatMethodSignature(m: MethodInfo): string {
  const params = m.params.map(p => {
    let s = p.name;
    if (p.optional) s += "?";
    s += ": " + p.type;
    if (p.default) s += " = " + p.default;
    return s;
  }).join(", ");
  return `${m.name}(${params}): ${m.returnType}`;
}

function formatMethodOneLiner(m: MethodInfo): string {
  const params = m.params.map(p => {
    let s = p.name;
    if (p.optional) s += "?";
    return s;
  }).join(", ");
  const prefix = m.isDeprecated ? "[DEPRECATED] " : "";
  const verb = m.httpVerb ? `[${m.httpVerb}] ` : "";
  return `${prefix}${verb}${m.name}(${params})`;
}

function generateLlmsTxt(ref: SdkReference): string {
  const lines: string[] = [];

  lines.push(`# VerifgoodSDK v${ref.version}`);
  lines.push(`> GMAO (maintenance management) TypeScript SDK — ${ref.services.length} services`);
  lines.push(`> Generated: ${ref.generatedAt}`);
  lines.push("");

  // Init
  lines.push("## Initialization");
  lines.push("```typescript");
  lines.push(ref.init.code);
  lines.push("```");
  lines.push("");

  // Metadatas
  lines.push("## Metadatas (query builder)");
  lines.push(ref.metadatas.description);
  lines.push("");
  lines.push("Filter actions: " + ref.metadatas.filterActions.join(", "));
  lines.push("");
  lines.push("Key methods:");
  lines.push("- setFilter(name, value, action?) — add a filter (default action: \"equals\")");
  lines.push("- setLimit(offset, limit) — pagination");
  lines.push("- setColumns(columns) — select specific fields");
  lines.push("- clearAllFilters() — reset filters");
  lines.push("- get() — serialize for API call (used internally)");
  lines.push("");
  lines.push("Response format: { datas: T[], metadatas: { counters: { All: number } } }");
  lines.push("");
  lines.push("Example:");
  lines.push("```typescript");
  lines.push(ref.metadatas.examples[0]);
  lines.push("```");
  lines.push("");

  // Services grouped by domain
  const domains = new Map<string, ServiceInfo[]>();
  for (const svc of ref.services) {
    const d = svc.domain || "other";
    if (!domains.has(d)) domains.set(d, []);
    domains.get(d)!.push(svc);
  }

  lines.push("## Services");
  lines.push("");

  for (const [domain, services] of [...domains.entries()].sort()) {
    lines.push(`### [${domain}]`);
    lines.push("");
    for (const svc of services) {
      lines.push(`#### ${svc.accessor} — ${svc.endpoint}`);
      if (svc.description) lines.push(`> ${svc.description}`);

      // List methods compactly
      const inherited = svc.methods.filter(m => m.isInherited);
      const overridden = svc.methods.filter(m => m.isOverride && !m.isInherited);
      const custom = svc.methods.filter(m => !m.isInherited && !m.isOverride && !m.isDeprecated);
      const deprecated = svc.methods.filter(m => m.isDeprecated && !m.isOverride);

      if (inherited.length > 0) {
        lines.push("CRUD: " + inherited.map(m => m.name).join(", "));
      }
      if (overridden.length > 0) {
        lines.push("CRUD (overridden): " + overridden.map(m => formatMethodOneLiner(m)).join(", "));
      }
      if (custom.length > 0) {
        lines.push("Custom: " + custom.map(m => formatMethodOneLiner(m)).join(", "));
      }

      // Types
      const typeNames = svc.types.map(t => t.name);
      if (typeNames.length > 0) {
        lines.push("Types: " + typeNames.join(", "));
      }

      // Enrichments (compact: just enum names + value count)
      if (svc.enrichment?.enums) {
        for (const en of svc.enrichment.enums) {
          lines.push(`Enum [${en.field}]: ${en.values.length} values — see llms-full.txt for details`);
        }
      }

      lines.push("");
    }
  }

  lines.push("---");
  lines.push("Full reference: llms-full.txt | Structured data: sdk-reference.json");

  return lines.join("\n");
}

function generateLlmsFullTxt(ref: SdkReference): string {
  const lines: string[] = [];

  lines.push(`# VerifgoodSDK v${ref.version} — Full Reference`);
  lines.push(`> GMAO (maintenance management) TypeScript SDK — ${ref.services.length} services`);
  lines.push(`> Generated: ${ref.generatedAt}`);
  lines.push("");

  // Init
  lines.push("## Initialization");
  lines.push("```typescript");
  lines.push(ref.init.code);
  lines.push("```");
  lines.push("");

  // Metadatas full
  lines.push("## Metadatas (query builder)");
  lines.push(ref.metadatas.description);
  lines.push("");
  lines.push("### Filter Actions");
  lines.push("| Action | Description |");
  lines.push("|--------|-------------|");
  lines.push("| equals | Exact match |");
  lines.push("| not_equals | Not equal |");
  lines.push("| contains | Substring match |");
  lines.push("| start_with | Starts with value |");
  lines.push("| end_with | Ends with value |");
  lines.push("| between | Range (value = [start, end]) |");
  lines.push("| is_null | Field is null |");
  lines.push("| is_not_null | Field is not null |");
  lines.push("| greater_than | Greater than value |");
  lines.push("| less_than | Less than value |");
  lines.push("| in | Value in array |");
  lines.push("| not_in | Value not in array |");
  lines.push("");

  lines.push("### Methods");
  for (const m of ref.metadatas.methods) {
    lines.push(`- \`${formatMethodSignature(m)}\``);
    if (m.description) lines.push(`  ${m.description}`);
  }
  lines.push("");

  lines.push("### Examples");
  for (const ex of ref.metadatas.examples) {
    lines.push("```typescript");
    lines.push(ex);
    lines.push("```");
    lines.push("");
  }

  lines.push("Response format: `{ datas: T[], metadatas: { counters: { All: number } } }`");
  lines.push("");

  // Services with full detail
  const domains = new Map<string, ServiceInfo[]>();
  for (const svc of ref.services) {
    const d = svc.domain || "other";
    if (!domains.has(d)) domains.set(d, []);
    domains.get(d)!.push(svc);
  }

  lines.push("## Services");
  lines.push("");

  for (const [domain, services] of [...domains.entries()].sort()) {
    lines.push(`### [${domain}]`);
    lines.push("");
    for (const svc of services) {
      lines.push(`#### ${svc.accessor} — ${svc.endpoint} | ${svc.endpointSingleton}`);
      if (svc.description) lines.push(`> ${svc.description}`);
      lines.push("");

      // Methods with full signatures
      lines.push("**Methods:**");
      for (const m of svc.methods) {
        const prefix = m.isDeprecated ? "[DEPRECATED] " : "";
        const tag = m.isInherited ? " (inherited)" : m.isOverride ? " (override)" : "";
        lines.push(`- \`${prefix}${formatMethodSignature(m)}\`${tag}`);
        if (m.description) lines.push(`  ${m.description}`);
        if (m.httpVerb && m.customEndpoint) lines.push(`  ${m.httpVerb} ${m.customEndpoint}`);
        // Method enrichment (input/output notes)
        const methodEnrichment = svc.enrichment?.methods?.[m.name];
        if (methodEnrichment) {
          if (methodEnrichment.inputNotes) lines.push(`  Input: ${methodEnrichment.inputNotes}`);
          if (methodEnrichment.outputNotes) lines.push(`  Output: ${methodEnrichment.outputNotes}`);
        }
      }
      lines.push("");

      // Types with fields
      if (svc.types.length > 0) {
        lines.push("**Types:**");
        for (const t of svc.types) {
          lines.push("");
          lines.push(`\`${t.name}\` (${t.kind})`);
          if (t.fields.length > 0) {
            lines.push("| Field | Type | Optional |");
            lines.push("|-------|------|----------|");
            for (const f of t.fields) {
              lines.push(`| ${f.name} | ${f.type} | ${f.optional ? "yes" : "no"} |`);
            }
          }
        }
        lines.push("");
      }

      // Enrichments (full detail)
      if (svc.enrichment) {
        if (svc.enrichment.notes) {
          lines.push("**Notes:**");
          for (const note of svc.enrichment.notes) {
            lines.push(`- ${note}`);
          }
          lines.push("");
        }

        if (svc.enrichment.enums) {
          for (const en of svc.enrichment.enums) {
            lines.push(`**Enum: ${en.name}** (field: \`${en.field}\`)`);
            lines.push(en.description);
            lines.push("");
            lines.push("| Value | Label | Description | Required Fields | Status Change | Side Effects |");
            lines.push("|-------|-------|-------------|-----------------|---------------|--------------|");
            for (const v of en.values) {
              const req = v.requiredFields ? v.requiredFields.join(", ") : "-";
              const status = v.statusChange || "-";
              const effects = v.sideEffects ? v.sideEffects.join("; ") : "-";
              lines.push(`| ${v.value} | ${v.label} | ${v.description} | ${req} | ${status} | ${effects} |`);
            }
            lines.push("");
          }
        }
      }

      lines.push("---");
      lines.push("");
    }
  }

  return lines.join("\n");
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const sdkRoot = path.resolve(__dirname, "..");
  const srcDir = path.join(sdkRoot, "src");
  const outDir = path.join(sdkRoot, "docs", "agents");

  // Ensure output directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Initialize ts-morph project
  const project = new Project({
    tsConfigFilePath: path.join(sdkRoot, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });

  // Add only the source files we need
  project.addSourceFilesAtPaths([
    path.join(srcDir, "apiRequests", "*.ts"),
    path.join(srcDir, "types", "*.ts"),
    path.join(srcDir, "core", "Metadatas.ts"),
    path.join(srcDir, "VGSDK.ts"),
  ]);

  // 1. Parse VGSDK.ts for accessor mapping
  const vgsdkFile = project.getSourceFile(path.join(srcDir, "VGSDK.ts"));
  if (!vgsdkFile) {
    console.error("Could not find VGSDK.ts");
    process.exit(1);
  }
  const accessorMap = parseVGSDK(vgsdkFile);
  console.log(`Parsed VGSDK: ${accessorMap.size} accessors`);

  // 2. Parse all type files
  const allTypes = new Map<string, TypeInfo[]>(); // filename (without ext) -> types
  const typesByName = new Map<string, TypeInfo>(); // interface name -> type info

  const typeFiles = project.getSourceFiles().filter(f => f.getFilePath().includes("/types/"));
  for (const file of typeFiles) {
    const types = parseTypeFile(file);
    const baseName = path.basename(file.getFilePath(), ".ts");
    allTypes.set(baseName, types);
    for (const t of types) {
      typesByName.set(t.name, t);
    }
  }
  console.log(`Parsed types: ${typesByName.size} interfaces from ${typeFiles.length} files`);

  // 3. Parse all apiRequest files
  const apiFiles = project.getSourceFiles().filter(f => f.getFilePath().includes("/apiRequests/"));
  const parsedServices: { className: string; endpoint: string; endpointSingleton: string; methods: MethodInfo[]; importedTypes: string[] }[] = [];

  for (const file of apiFiles) {
    const parsed = parseApiRequestFile(file);
    if (parsed) parsedServices.push(parsed);
  }
  console.log(`Parsed apiRequests: ${parsedServices.length} services`);

  // 4. Parse Metadatas
  const metadatasFile = project.getSourceFile(path.join(srcDir, "core", "Metadatas.ts"));
  const metadatasInfo = metadatasFile ? parseMetadatas(metadatasFile) : {
    description: "Query builder for filtering and pagination",
    filterActions: [],
    methods: [],
    examples: [],
  };

  // 5. Build the reverse accessor map (className -> accessor name)
  const classToAccessor = new Map<string, string>();
  for (const [accessor, className] of accessorMap) {
    classToAccessor.set(className, accessor);
  }

  // 6. Correlate and build ServiceInfo
  const services: ServiceInfo[] = [];

  for (const parsed of parsedServices) {
    const accessor = classToAccessor.get(parsed.className) || parsed.className.toLowerCase();
    const domainInfo = DOMAIN_MAP[parsed.className] || { domain: "other", description: "" };

    // Get associated types via import analysis + filename matching
    const associatedTypes: TypeInfo[] = [];
    const addedTypeNames = new Set<string>();

    // 1. Add explicitly imported types
    for (const typeName of parsed.importedTypes) {
      const typeInfo = typesByName.get(typeName);
      if (typeInfo && !addedTypeNames.has(typeName)) {
        associatedTypes.push(typeInfo);
        addedTypeNames.add(typeName);
      }
    }

    // 2. Also include all types from the matching filename (covers non-imported types like TacheEntity)
    const candidates = [parsed.className, parsed.className.replace(/s$/, ""), parsed.className.replace(/es$/, "")];
    for (const candidate of candidates) {
      const types = allTypes.get(candidate);
      if (types && types.length > 0) {
        for (const t of types) {
          if (!addedTypeNames.has(t.name)) {
            associatedTypes.push(t);
            addedTypeNames.add(t.name);
          }
        }
        break;
      }
    }

    // Build methods list: inherited CRUD + overridden/custom
    const declaredMethodNames = new Set(parsed.methods.map(m => m.name));
    const methods: MethodInfo[] = [];

    // Find associated type names for CRUD auto-linking
    // Find the main entity type — prefer exact match patterns: ClassName singular, ClassNameEntity, or the one with most fields
    const entityTypes = associatedTypes.filter(t => t.kind === "entity");
    const singular = parsed.className.replace(/s$/, "").replace(/es$/, "");
    const entityType =
      entityTypes.find(t => t.name === singular) ||                              // e.g., "Equipement" for Equipements
      entityTypes.find(t => t.name === singular + "Entity") ||                   // e.g., "TacheEntity" for Taches
      entityTypes.find(t => t.name === parsed.className.replace(/s$/, "")) ||    // e.g., "Categorie" for Categories
      entityTypes.sort((a, b) => b.fields.length - a.fields.length)[0];          // fallback: most fields = likely main entity
    const createType = associatedTypes.find(t => t.kind === "createRequest");
    const updateType = associatedTypes.find(t => t.kind === "updateRequest");

    // Add inherited CRUD methods (not overridden), with types substituted when available
    for (const crud of BASE_CRUD_METHODS) {
      if (!declaredMethodNames.has(crud.name)) {
        const linked = { ...crud, params: crud.params.map(p => ({ ...p })) };
        if (entityType) {
          if (linked.name === "getAll") {
            linked.returnType = `Promise<{ datas: ${entityType.name}[], metadatas: any }>`;
          } else if (linked.name === "getById") {
            linked.returnType = `Promise<${entityType.name}>`;
          }
        }
        if (createType && linked.name === "create") {
          linked.params[0] = { ...linked.params[0], type: createType.name };
          if (entityType) linked.returnType = `Promise<${entityType.name}>`;
        }
        if (updateType && linked.name === "update") {
          linked.params[1] = { ...linked.params[1], type: updateType.name };
          if (entityType) linked.returnType = `Promise<${entityType.name}>`;
        }
        if (entityType && linked.name === "remove") {
          linked.returnType = "Promise<void>";
        }
        methods.push(linked);
      }
    }

    // Add declared methods, filtering out non-API helpers (no HTTP verb and not a CRUD override)
    for (const m of parsed.methods) {
      if (!m.httpVerb && !m.isOverride) continue; // skip utility/helper methods like calculDepreciation
      methods.push(m);
    }

    const enrichment = SERVICE_ENRICHMENTS[parsed.className];

    services.push({
      name: parsed.className,
      className: parsed.className,
      accessor: `sdk.${accessor}`,
      endpoint: parsed.endpoint,
      endpointSingleton: parsed.endpointSingleton,
      domain: domainInfo.domain,
      description: domainInfo.description,
      methods,
      types: associatedTypes,
      ...(enrichment ? { enrichment } : {}),
    });
  }

  // Sort services by domain then name
  services.sort((a, b) => a.domain.localeCompare(b.domain) || a.name.localeCompare(b.name));

  // 7. Read version from package.json
  const pkg = JSON.parse(fs.readFileSync(path.join(sdkRoot, "package.json"), "utf-8"));

  // 8. Build the reference
  const reference: SdkReference = {
    version: pkg.version,
    generatedAt: new Date().toISOString().split("T")[0],
    init: {
      code: `import { VGSDK, Metadatas } from "verifgood-js-sdk";\n\nconst sdk = new VGSDK({\n  apiBaseUrl: "https://your-api-host.com/public/index.php",\n  apiKey: "your-auth0-token"\n});`,
      description: "Initialize with API base URL and Auth0 access token.",
    },
    metadatas: metadatasInfo,
    services,
  };

  // 9. Write outputs
  const jsonPath = path.join(outDir, "sdk-reference.json");
  fs.writeFileSync(jsonPath, JSON.stringify(reference, null, 2), "utf-8");
  console.log(`Written: ${jsonPath}`);

  const llmsPath = path.join(outDir, "llms.txt");
  fs.writeFileSync(llmsPath, generateLlmsTxt(reference), "utf-8");
  console.log(`Written: ${llmsPath}`);

  const llmsFullPath = path.join(outDir, "llms-full.txt");
  fs.writeFileSync(llmsFullPath, generateLlmsFullTxt(reference), "utf-8");
  console.log(`Written: ${llmsFullPath}`);

  // Summary
  console.log(`\nDone! Generated docs for ${services.length} services, ${typesByName.size} types.`);
}

main();
