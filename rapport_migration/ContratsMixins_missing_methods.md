# ContratsMixins - Missing Methods Analysis

## Mixin Methods Found:
- ContratsMixins_getContrats
- ContratsMixins_fetchContrats
- ContratsMixins_fetchContrat
- ContratsMixins_createContrat
- ContratsMixins_updateContrat
- ContratsMixins_archive
- ContratsMixins_delete
- ContratsMixins_attachCategoriesToContrat
- ContratsMixins_formatStatus

## Implementation Status:
✅ **All methods implemented**

- `ContratsMixins_getContrats` → Implemented as `getContrats()` method
- `ContratsMixins_fetchContrats` → Implemented as `fetchContrats()` method (deprecated)
- `ContratsMixins_fetchContrat` → Implemented as `fetchContrat()` method (deprecated)
- `ContratsMixins_createContrat` → Implemented as `create()` method (overridden with datas array wrapper)
- `ContratsMixins_updateContrat` → Implemented as `updateContrat()` method (removes tiers fields)
- `ContratsMixins_archive` → Implemented as `archive()` method (sets isArchived flag)
- `ContratsMixins_delete` → Implemented as `deleteContrat()` method (deprecated)
- `ContratsMixins_attachCategoriesToContrat` → Implemented as `attachCategoriesToContrat()` method (deprecated)
- `ContratsMixins_formatStatus` → Implemented as `formatStatus()` method (deprecated - should move to client)

## Missing Methods:
None - all methods are implemented with their specific business logic.

## Notes:
- This service contains extensive custom business logic beyond standard CRUD operations
- Several methods are marked as deprecated in the original mixin
- Service includes specialized functionality for:
  - Site-restricted contract listing
  - Contract archiving workflow
  - Category attachment to contracts
  - Contract status formatting (client-side utility)
- All endpoints are clean without userId parameters (handled by backend)
- Standard CRUD operations are available via inherited methods: `list()`, `get()`, `update()`, `delete()`

## TODO Items:
- `//@TODO: Extract site restrictions from app context` - in getContrats and fetchContrats methods
- `//@TODO: This method uses a different host (v2)` - in attachCategoriesToContrat method needs manual review
- `//@TODO: This utility method should be moved to client-side utilities` - formatStatus should be client-side

## Endpoints:
- List contracts: GET /api/contrats
- Get single contract: GET /api/contrat/{id}
- Create contract: POST /api/contrats
- Update contract: PUT /api/contrat/{id}
- Archive contract: PUT /api/contrat/{id} (with isArchived flag)
- Delete contract: DELETE /api/contrat/{id}
- Attach categories: POST /api/tier/contrat/categories
