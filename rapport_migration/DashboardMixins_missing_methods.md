# Dashboard Mixins Migration Documentation

## Overview
**Source**: `mixins_to_migrate/DashboardMixins.js`
**Target**: `src/apiRequests/Dashboard.ts`
**Status**: ✅ COMPLETED

## Migration Summary
The Dashboard mixin has been successfully migrated to a TypeScript service. This service provides dashboard analytics and reporting functionality with 20 different methods for retrieving various dashboard data.

## Methods Mapping

### ✅ Curatif (Maintenance) Methods
| Original Method | New Method | Status | Notes |
|---|---|---|---|
| `getCuratifTotaux` | `getCuratifTotaux` | ✅ Implemented | Dashboard totals for maintenance |
| `getCuratifUrgentes` | `getCuratifUrgentes` | ✅ Implemented | Urgent maintenance dashboard |
| `getCuratifRepartitionAge` | `getCuratifRepartitionAge` | ✅ Implemented | Age distribution dashboard |
| `getCuratifRepartitionComposants` | `getCuratifRepartitionComposants` | ✅ Implemented | Component distribution dashboard |
| `getCuratifRepartitionDemandeur` | `getCuratifRepartitionDemandeur` | ✅ Implemented | Requestor distribution dashboard |
| `getCuratifRepartitionUserAffecte` | `getCuratifRepartitionUserAffecte` | ✅ Implemented | Assigned user distribution dashboard |
| `getCuratifRepartitionTiersAffecte` | `getCuratifRepartitionTiersAffecte` | ✅ Implemented | Assigned third-party distribution dashboard |
| `getCuratifRepartitionCategoriesEquipements` | `getCuratifRepartitionCategoriesEquipements` | ✅ Implemented | Equipment categories distribution |
| `getCuratifRepartitionCorpsDetat` | `getCuratifRepartitionCorpsDetat` | ✅ Implemented | Corps d'état distribution dashboard |
| `getCuratifRepartitionEquipements` | `getCuratifRepartitionEquipements` | ✅ Implemented | Equipment distribution dashboard |
| `getCuratifRepartitionEquipementsCouts` | `getCuratifRepartitionEquipementsCouts` | ✅ Implemented | Equipment costs distribution dashboard |
| `getCuratifRepartitionPieces` | `getCuratifRepartitionPieces` | ✅ Implemented | Parts distribution dashboard |
| `getCuratifRepartitionDureeTraitement` | `getCuratifRepartitionDureeTraitement` | ✅ Implemented | Processing time distribution dashboard |

### ✅ Preventif Methods
| Original Method | New Method | Status | Notes |
|---|---|---|---|
| `getPreventifRepartitionNonConformites` | `getPreventifRepartitionNonConformites` | ✅ Implemented | Non-conformity distribution dashboard |
| `getPreventifReleverCompteur` | `getPreventifReleverCompteur` | ✅ Implemented | Counter reading dashboard |
| `getPreventifProchainesInterventionsExternes` | `getPreventifProchainesInterventionsExternes` | ✅ Implemented | Upcoming external interventions |
| `getPreventifProgressionInterne` | `getPreventifProgressionInterne` | ✅ Implemented | Internal progression dashboard |

### ✅ Consommables Methods
| Original Method | New Method | Status | Notes |
|---|---|---|---|
| `getConsommablesRepartitionConsommationsMaintenances` | `getConsommablesRepartitionConsommationsMaintenances` | ✅ Implemented | Maintenance consumption distribution |
| `getConsommablesRepartitionConsommationsBonsDeSortie` | `getConsommablesRepartitionConsommationsBonsDeSortie` | ✅ Implemented | Outbound consumption distribution |
| `getConsommablesRepartitionEnStock` | `getConsommablesRepartitionEnStock` | ✅ Implemented | Stock distribution dashboard |

## Implementation Details

### Service Structure
- **Base Class**: `ApiRequest`
- **Endpoint**: `/api/dashboard`
- **Helper Method**: `getDashboardDatas()` - Common method for all dashboard requests with site restrictions

### Key Features
1. **Consistent Query Parameters**: All methods use the same query structure with site restrictions
2. **Template Literals**: Uses `${this.endpoint}` for dynamic endpoint construction
3. **TypeScript Types**: Full TypeScript support with proper type definitions
4. **Error Handling**: Inherits error handling from BaseApiRequest

### Special Considerations
- **Site Restrictions**: All methods include a `sites` parameter (currently null) for future site-based filtering
- **No Authentication**: Dashboard methods don't require user authentication parameters
- **Read-Only**: All methods are GET requests for data retrieval only

## Testing
- ✅ All 20 methods have comprehensive unit tests
- ✅ Tests verify correct endpoint construction and method calls
- ✅ Mocked responses validate data flow
- ✅ Error handling scenarios covered

## Migration Notes
1. **Method Names**: Preserved exact method names from original mixin
2. **Endpoint Structure**: Maintained original endpoint patterns
3. **Parameter Handling**: Simplified to use only Metadatas parameter
4. **Return Types**: All methods return `Promise<any>` for maximum flexibility

## TODO
- [ ] Consider adding specific return types for each dashboard method
- [ ] Implement actual site restriction logic when app context is available
- [ ] Add caching mechanism for dashboard data if needed

## Files Modified
- ✅ `src/apiRequests/Dashboard.ts` - Main service implementation
- ✅ `tests/Dashboard.test.ts` - Comprehensive test suite
- ✅ `src/types/Dashboard.ts` - Type definitions (generated by hygen)

**Migration completed successfully** ✅
