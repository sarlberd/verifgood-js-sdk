# Process: Generate Reliable CRUD Interfaces for apiRequests

> This document is a repeatable process for any Claude session to generate correct, backend-aligned TypeScript interfaces for any apiRequest in the SDK.

## Related Projects

| Name | Path |
|------|------|
| vg-sdk | `/mnt/c/xampp/htdocs/verifgood/VerifgoodSDK` |
| vg-backend | `/mnt/c/xampp2/htdocs/verifgood/symlab-V2` |
| vg-frontend | `/mnt/c/xampp/htdocs/verifgood/Verifgood-Frontend-3` |

## Overview

Each apiRequest class in `src/apiRequests/<Entity>.ts` needs typed interfaces for:

1. **Entity** — the full object as returned by GET endpoints
2. **CreateRequest** — payload accepted by POST endpoint
3. **UpdateRequest** — payload accepted by PUT endpoint
4. **Response wrappers** — `{ datas: Entity[], metadatas: Metadatas }` for list endpoints

Interfaces live in `src/types/<Entity>.ts` and must be imported + used in the apiRequest class.

---

## Step-by-Step Process

### Step 1: Read the Backend Entity (source of truth for DB columns)

**Where:** `vg-backend/src/Entity/<Entity>.php`

- List every ORM column: name, type, nullable, default
- Note which fields are auto-set server-side (created_at, updated_at, uid, userId, batchNumber, qrCode…)
- Note FK relationships (ManyToOne, OneToMany) and their cascade behavior

**Output:** A raw field list with types and nullability.

### Step 2: Read the Backend Controller (source of truth for API payloads)

**Where:** `vg-backend/src/Controller/<Entity>RestController.php`

For each CRUD endpoint:

| Endpoint | What to extract |
|----------|----------------|
| **POST** (create) | Required fields (400 if missing), optional fields, ignored fields, auto-set fields |
| **GET** (getAll) | Response normalization — what fields are returned, nested objects, computed fields |
| **GET/:id** (getById) | Additional nested data (contrats, taches, logs, etc.) |
| **PUT/:id** (update) | Updatable fields, field remapping (e.g. `libelEquipement` → `libel_equipement`), ignored fields |
| **DELETE/:id** (delete) | Params needed |

Also check:
- `vg-backend/src/Validators/<Entity>Validator.php` for validation rules
- `vg-backend/src/Services/<Entity>Manager.php` for business logic / transforms

### Step 3: Read the Frontend Mixin (source of truth for actual usage)

**Where:** `vg-frontend/src/mixins/<entity>Mixins.js`

- List all methods and which SDK / API calls they make
- Identify which methods are already migrated to `$vg.<entity>.*` vs still using `$rc`

Then read the main form component:

**Where:** `vg-frontend/src/components/Vg/Forms/Vg<Entity>Form.vue`

- Extract the default object shape used on create (the `data()` initialization)
- Extract any field transformations before API call (date formatting, field deletion, renaming)
- Extract the update diff logic (which fields are compared / sent)

### Step 4: Cross-reference and Build Interfaces

Using data from Steps 1-3, create three interfaces:

#### 4a. Entity Interface (GET response shape)

```typescript
export interface Equipement {
    // Include ALL fields returned by the backend's normalize/getAll
    // Use the backend column names as they appear in the JSON response
    // Type them correctly (number, string, boolean, Date string, null)
    // Include nested objects as sub-interfaces or inline types
}
```

Rules:
- **Field names** = what the backend JSON response returns (often snake_case: `libel_equipement`, `idLieu_id`)
- **Types** = mapped from PHP types: `string(255)` → `string`, `integer` → `number`, `boolean` → `boolean`, `datetime/date` → `string` (ISO format), `text` → `string`
- **Nullable** = if DB column is nullable OR if the field can be absent, mark as `field?: type | null`
- **Nested objects** = define as separate interfaces (e.g. `EquipementCategorie`, `EquipementLieu`)
- **Computed fields** = fields added by controller normalization but not in DB (e.g. `accountingTag`)

#### 4b. CreateRequest Interface

```typescript
export interface EquipementCreateRequest {
    // REQUIRED fields (backend returns 400 if missing)
    requiredField: type;
    // OPTIONAL fields
    optionalField?: type;
    // EXCLUDE: auto-set fields (userId, uid, created_at, updated_at, batchNumber)
    // EXCLUDE: ignored fields (from controller's ignore list)
}
```

Rules:
- Required fields are NOT optional (`?`)
- Auto-set fields are excluded entirely
- Ignored fields are excluded entirely
- Frontend transforms should be documented as JSDoc comments

#### 4c. UpdateRequest Interface

```typescript
export interface EquipementUpdateRequest {
    // All updatable fields, ALL optional (partial update)
    field?: type;
    // EXCLUDE: non-updatable fields
}
```

Rules:
- All fields are optional (partial update pattern)
- `id` is NOT in the interface — it's passed as a separate param
- Only include fields the backend actually processes in PUT

### Step 5: Write the Types File

**Where:** `vg-sdk/src/types/<Entity>.ts`

Structure:
```typescript
/**
 * <Entity> interfaces - generated from backend Entity + Controller analysis
 * Source: vg-backend/src/Entity/<Entity>.php
 * Source: vg-backend/src/Controller/<Entity>RestController.php
 */

// Nested sub-interfaces first
export interface <Entity>Categorie { ... }
export interface <Entity>Lieu { ... }

// Main entity (GET response)
export interface <Entity> { ... }

// Create payload
export interface <Entity>CreateRequest { ... }

// Update payload
export interface <Entity>UpdateRequest { ... }
```

### Step 6: Update the apiRequest Class

**Where:** `vg-sdk/src/apiRequests/<Entity>.ts`

1. Import the new interfaces
2. Replace `any` params and return types with proper types
3. Fix signature mismatches with parent class if needed
4. Ensure `create()` accepts `CreateRequest[]` and `update()` accepts `UpdateRequest`

### Step 7: Verify Against Frontend Usage

Grep the frontend for actual usage patterns:
```
grep -r "equipementsMixins_create\|equipementsMixins_update\|\$vg\.equipements\." vg-frontend/src/
```

Confirm that the interface fields match what the frontend actually sends. If the frontend sends fields not in the interface, investigate whether it's a bug or a missing field.

---

## Field Type Mapping Reference

| PHP / DB Type | TypeScript Type |
|---------------|----------------|
| `integer` | `number` |
| `string(N)` | `string` |
| `text` | `string` |
| `boolean` | `boolean` |
| `datetime`, `date` | `string` (ISO format) |
| `float`, `decimal` | `number` |
| FK (ManyToOne) | `number` (ID) or nested interface (in response) |
| JSON column | `Record<string, any>` or specific interface |

## Nullable Rules

| Condition | TypeScript |
|-----------|-----------|
| DB NOT NULL + no default | `field: type` (required) |
| DB NOT NULL + has default | `field?: type` (optional, server defaults) |
| DB nullable | `field?: type \| null` |
| Auto-set server-side | exclude from Create/Update |

---

## Checklist per Entity

- [ ] Read backend Entity PHP → raw field list
- [ ] Read backend Controller PHP → CRUD payloads + response shape
- [ ] Read backend Validator PHP → validation rules
- [ ] Read frontend mixin JS → method inventory
- [ ] Read frontend form Vue → create/update field shapes
- [ ] Cross-reference all three sources
- [ ] Write `src/types/<Entity>.ts` with Entity, CreateRequest, UpdateRequest
- [ ] Update `src/apiRequests/<Entity>.ts` to use new interfaces
- [ ] Verify no frontend breakage (field names match)
- [ ] Run existing tests: `npx jest tests/<entity>`

---

## Example: Equipements

### Sources analyzed
- Entity: `vg-backend/src/Entity/Equipement.php`
- Controller: `vg-backend/src/Controller/EquipementRestController.php`
- Validator: `vg-backend/src/Validators/EquipementValidator.php`
- Manager: `vg-backend/src/Services/EquipementsManager.php`
- Mixin: `vg-frontend/src/mixins/equipementsMixins.js`
- Form: `vg-frontend/src/components/Vg/Forms/VgEquipementForm.vue`

### Backend Entity Fields (38 columns)

| Column | Type | Nullable | Auto-set | Notes |
|--------|------|----------|----------|-------|
| id | integer | NO | PK auto | |
| libel_equipement | string(255) | NO | | **REQUIRED on create** |
| idLieu_id | FK→Lieux | NO | | **REQUIRED on create** |
| idCategorie_id | FK→Categorie | NO | | **REQUIRED on create** |
| qrCode | string(50) | NO | auto if empty | `VLGE` + timestamp |
| userId | string(255) | NO | from auth | |
| uid | string(255) | YES | `uniqid()` | |
| created_at | datetime | YES | on persist | |
| updated_at | datetime | YES | on flush | |
| batchNumber | string(70) | YES | auto | |
| alerte_defaut | boolean | NO | default 0 | |
| date_verif | date | YES | | |
| carac_techniques | text | YES | | |
| num_serie | string(45) | YES | | |
| refConstructeur | string(200) | YES | | |
| reponsesNegative | integer | YES | default 0 | |
| champOptionel | string(200) | YES | | |
| posX | string(200) | YES | | |
| posY | string(200) | YES | | |
| adresse | string(255) | YES | |
| miseEnService | datetime | YES | | |
| tagEquipement | text | YES | | |
| dateFabrication | date | YES | | |
| sourceFinancement | string(100) | YES | | |
| valeurAchat | string(100) | YES | | |
| valeurActualise | string(100) | YES | deprecated |
| dureeAmortissement | string(100) | YES | deprecated |
| tauxDepreciationAnnuel | string(100) | YES | | |
| fournisseur_id | FK→Tiers | YES | | |
| typeCategorie | string(255) | YES | | |
| marque | string(255) | YES | | |
| etiquetter | boolean | YES | | |
| etat | string(50) | YES | | Good/Medium/Bad |
| statut | string(200) | YES | | |
| statutVerification | string(250) | YES | | |
| type | string(50) | YES | default 'Asset' | |
| isMine | boolean | YES | | |
| isGroupEqp | boolean | YES | default 0 | |
| isGroupEqpSite | boolean | YES | | |
| numeroImmobilisation | string(50) | YES | | |
| marker_id | FK→Markers | YES | SET NULL | |
| dateRemplacementPrevisionelle | date | YES | auto-calc | |
| dureeDeViePrevisionnelle | integer | YES | | |
| dateExpirationGarantie | date | YES | | |
| ReferenceDocumentExterne | string(255) | YES | | |
| isHorsService | boolean | NO | default false | |

### Create: ignored fields (controller strips these)
`categorie`, `qty`, `path`, `maintenances`, `accountingTag`, `categorie_libelle`, `lieu_path`, `dateSortie`, `sortieEquipement_type`, `nbMaintenances`, `dateRecensement`, `tachesDerniereDateVerif`

### GET response: nested objects
- `categorie: { id, libelle, icon, tags, codeCouleur, ... }`
- `lieu: { id, path, type_lieu, codeUn }`
- `tiers: { id, name } | null`
- `sortieEquipement: { ... } | null`
- `tagsEquipements: []`
- `tachesDerniereDateVerif: []` (getAll only)

### Update: field remapping
- `libelEquipement` → `libel_equipement`
- `idCategorie` → `idCategorie_id`
- `fournisseurId` → `fournisseur_id`

### Frontend transforms on create
- `dureeDeViePrevisionnelle` and `dureeGarantie` deleted before send (used for date calc only)
- `miseEnService` formatted as `YYYY-MM-DD 00:00`
- `type` force-set to `"Asset"`
- `libel_equipement` = `categorie.libelle + " " + complement`

### Frontend transforms on update
- Only changed fields sent (diff via `compareObjects`)
- Payload: `{ id, userId, ...changedFields }`
