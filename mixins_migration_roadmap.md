# Mixins to SDK Migration Roadmap

| Filename | Total Methods | Basic CRUD Methods | Non-Basic CRUD Methods | TODO Flag Resolution |
|----------|---------------|-------------------|------------------------|---------------------|
| AccountMixins.js | 4 | 0 | 4 | Low - Basic API operations |
| AffectationsMixins.js | 13 | 0 | 13 | Medium - Data transformations (3x), Multiple custom methods (13) |
| BonDeCommandeItemsMixins.js | 5 | 3 | 2 | High - Complex store management (5x), Data transformations (1x), Debug code (2x) |
| BonsDeCommandeEntitesMixins.js | 4 | 3 | 1 | Medium - Complex store management (4x), Debug code (1x) |
| BonsDeCommandeMixins.js | 19 | 3 | 16 | Very High - File handling (15x), Complex store management (19x), Conditional logic (1x) |
| BonsDentreeMixins.js | 5 | 1 | 4 | High - Complex store management (6x), Debug code (2x) |
| BonsDeSortieMixins.js | 6 | 2 | 4 | High - Complex store management (8x), Debug code (3x) |
| CalendarMixins.js | 2 | 1 | 1 | Medium - Data transformations (2x), Debug code (5x) |
| CategorieMixins.js | 15 | 1 | 14 | Very High - File handling (7x), Complex store management (10x), Conditional logic (2x) |
| CheckpointMixins.js | 5 | 1 | 4 | Low - Basic API operations |
| ComposantMixins.js | 15 | 1 | 14 | Very High - Complex store management (5x), Data transformations (4x), Conditional logic (1x) |
| ConsommablesMixins.js | 35 | 9 | 26 | Very High - File handling (11x), Complex store management (27x), Complex endpoints (6x) |
| ContactsMixins.js | 4 | 0 | 4 | Medium - Complex store management (4x) |
| ContratsEcheancierMixins.js | 4 | 4 | 0 | Low - Basic API operations |
| ContratsMixins.js | 10 | 2 | 8 | Very High - Complex store management (6x), Complex endpoints (2x), Data transformations (2x) |
| CorpsDetatMixins.js | 4 | 4 | 0 | Medium - Complex store management (4x) |
| DashboardMixins.js | 22 | 0 | 22 | Very High - Complex store management (20x), Complex endpoints (20x), Debug code (2x) |
| debuggerMixins.js | 0 | 0 | 0 | Low - Basic API operations |
| DemandeInterventionMixins.js | 1 | 0 | 1 | Low - Basic API operations |
| DeplacementsEquipementsMixins.js | 1 | 0 | 1 | Low - Basic API operations |
| DocumentsMixins.js | 5 | 1 | 4 | Low - Basic API operations |
| equipementsMixins.js | 18 | 1 | 17 | Very High - File handling (16x), Complex store management (14x), Complex endpoints (3x) |
| FicheDemandeConsommablesMixins.js | 10 | 2 | 8 | Very High - File handling (7x), Complex store management (10x), Conditional logic (1x) |
| FiltersMixins.js | 8 | 0 | 8 | Very High - Data transformations (68x), Data parsing (3x), Conditional logic (2x) |
| GroupeValidateursMixins.js | 4 | 3 | 1 | Medium - Complex store management (4x), Debug code (2x) |
| GroupeValidateursUsersMixins.js | 2 | 2 | 0 | Medium - Complex store management (2x), Data transformations (1x) |
| IfcMixins.js | 1 | 0 | 1 | Low - Basic API operations |
| IntegrationsDonneesMixins.js | 2 | 0 | 2 | Low - Basic API operations |
| InterventionsMixins.js | 11 | 1 | 10 | Very High - File handling (4x), Complex store management (10x), Data transformations (4x) |
| InventaireMixins.js | 11 | 2 | 9 | Very High - Complex store management (10x), Data transformations (4x), Conditional logic (5x) |
| LibellesCategorieMixins.js | 3 | 3 | 0 | Low - Basic API operations |
| LibelProblemMixins.js | 9 | 2 | 7 | High - Complex store management (7x) |
| LibelServicesMixins.js | 3 | 3 | 0 | Medium - Complex store management (3x), Conditional logic (1x) |
| LieuMixins.js | 18 | 2 | 16 | Very High - File handling (7x), Complex store management (6x), Data transformations (11x) |
| mainMixins.js | 4 | 0 | 4 | Medium - Date manipulations (2x), Conditional logic (3x) |
| MaintenanceMixins.js | 32 | 1 | 31 | Very High - File handling (11x), Complex store management (19x), Data transformations (18x) |
| MouvementsEquipementsMixins.js | 7 | 2 | 5 | Very High - File handling (7x), Complex store management (9x), Conditional logic (1x) |
| OperationMixins.js | 8 | 2 | 6 | Very High - File handling (7x), Complex store management (2x), Conditional logic (1x) |
| ParametresMixins.js | 4 | 1 | 3 | Low - Basic API operations |
| PlanInteractifMixins.js | 11 | 0 | 11 | Very High - File handling (1x), Data transformations (12x), Debug code (1x) |
| PlanMaintenanceMixins.js | 2 | 1 | 1 | Low - Basic API operations |
| pubnubMixins.js | 6 | 0 | 6 | Very High - Complex store management (5x), Data transformations (12x), Data parsing (1x) |
| ReponsesMixins.js | 6 | 1 | 5 | High - Data transformations (4x), Conditional logic (1x), Debug code (7x) |
| RolesMixins.js | 4 | 0 | 4 | Medium - Data transformations (2x), Data parsing (1x) |
| SearchDatasMixins.js | 2 | 0 | 2 | Very High - Complex store management (7x), Data transformations (4x), Debug code (2x) |
| SortieEquipementMixins.js | 2 | 1 | 1 | Low - Basic API operations |
| StatistiquesMixins.js | 6 | 0 | 6 | Very High - Complex endpoints (8x), Data transformations (10x) |
| StocksMixins.js | 6 | 1 | 5 | High - Complex store management (7x), Debug code (3x) |
| StripeMixins.js | 3 | 1 | 2 | Low - Basic API operations |
| SyntheseMaintenanceMixins.js | 2 | 1 | 1 | Low - Basic API operations |
| TachesMixins.js | 7 | 1 | 6 | Very High - File handling (7x), Complex store management (7x), Conditional logic (2x) |
| TacheUsersMixins.js | 1 | 0 | 1 | Low - Basic API operations |
| TagGridMixins.js | 15 | 0 | 15 | Very High - File handling (2x), Data transformations (111x), Conditional logic (9x) |
| TagsMixins.js | 7 | 0 | 7 | Medium - Complex store management (2x), Data transformations (2x) |
| TiersMixins.js | 5 | 2 | 3 | High - Complex store management (6x) |
| TvasMixins.js | 4 | 4 | 0 | Medium - Complex store management (4x), Debug code (2x) |
| TypologiesMaintenanceMixins.js | 5 | 3 | 2 | High - Complex store management (6x), Debug code (1x) |
| UserGuidingMixins.js | 2 | 0 | 2 | Low - Basic API operations |
| UserMixins.js | 8 | 6 | 2 | Very High - File handling (7x), Complex store management (5x), Data transformations (2x) |
| UserParametersMixins.js | 3 | 3 | 0 | Low - Basic API operations |
| ValidationsMixins.js | 1 | 0 | 1 | Low - Basic API operations |
| VerificationMixins.js | 13 | 3 | 10 | Very High - File handling (11x), Complex store management (10x), Complex endpoints (3x) |
## Summary

- **Total Files:** 62
- **Total Methods:** 455
- **Total Non-CRUD Methods:** 364
- **Average Non-CRUD per File:** 5.9

## Estimated Migration Time

Based on the analysis:
- **Low Complexity:** 1.5-2 hours per entity
- **Medium Complexity:** 2-3 hours per entity  
- **High Complexity:** 3-4 hours per entity
- **Very High Complexity:** 4-6 hours per entity

**Total Estimated Time:** 155.0 - 248.0 hours

## Detailed Analysis

### AccountMixins.js

**Total Methods:** 4

**Non-Basic CRUD Methods (4):**
- mounted
- AccountMixins_update
- AccountMixins_fetch
- AccountMixins_create

**Complexity:** Low - Basic API operations

---

### AffectationsMixins.js

**Total Methods:** 13

**Non-Basic CRUD Methods (13):**
- data
- AffectationsMixins_copieAffectationTache
- AffectationsMixins_createAffectationsUsersTaches
- AffectationsMixins_deleteAffectationsUsersTaches
- AffectationsMixins_deleteAffectation
- AffectationsMixins_saveSchedule
- AffectationsMixins_saveSchedules
- AffectationsMixin_updateSchedule
- AffectationsMixin_fetchProgrammationContratIntervention
- AffectationsMixin_createProgrammationContratIntervention
- ... and 3 more

**Complexity:** Medium - Data transformations (3x), Multiple custom methods (13)

---

### BonDeCommandeItemsMixins.js

**Total Methods:** 5

**Basic CRUD Methods (3):**
- BonDeCommandeItemsMixins_create
- BonDeCommandeItemsMixins_update
- BonDeCommandeItemsMixins_delete

**Non-Basic CRUD Methods (2):**
- BonDeCommandeItemsMixins_get
- BonDeCommandeItemsMixins_getClones

**Complexity:** High - Complex store management (5x), Data transformations (1x), Debug code (2x)

---

### BonsDeCommandeEntitesMixins.js

**Total Methods:** 4

**Basic CRUD Methods (3):**
- BonsDeCommandeEntitesMixins_create
- BonsDeCommandeEntitesMixins_update
- BonsDeCommandeEntitesMixins_delete

**Non-Basic CRUD Methods (1):**
- BonsDeCommandeEntitesMixins_getEntites

**Complexity:** Medium - Complex store management (4x), Debug code (1x)

---

### BonsDeCommandeMixins.js

**Total Methods:** 19

**Basic CRUD Methods (3):**
- BonsDeCommandeMixins_update
- BonsDeCommandeMixins_getCreateurs
- BonsDeCommandeMixins_getValidateurs

**Non-Basic CRUD Methods (16):**
- BonsDeCommandeMixins_getBonsDeCommande
- BonsDeCommandeMixins_getBonDeCommande
- BonsDeCommandeMixins_create
- BonsDeCommandeMixins_delete
- BonsDeCommandeMixins_cancel
- BonsDeCommandeMixins_skipSending
- BonsDeCommandeMixins_demandeValidation
- BonsDeCommandeMixins_envoiCommande
- BonsDeCommandeMixins_livraison
- BonsDeCommandeMixins_livraisonTotale
- ... and 6 more

**Complexity:** Very High - File handling (15x), Complex store management (19x), Conditional logic (1x)

---

### BonsDentreeMixins.js

**Total Methods:** 5

**Basic CRUD Methods (1):**
- BonsDentreeMixins_update

**Non-Basic CRUD Methods (4):**
- BonsDentreeMixins_getBonsDentree
- BonsDentreeMixins_getBonDentree
- BonsDentreeMixins_create
- BonsDentreeMixins_delete

**Complexity:** High - Complex store management (6x), Debug code (2x)

---

### BonsDeSortieMixins.js

**Total Methods:** 6

**Basic CRUD Methods (2):**
- BonsDeSortieMixins_create
- BonsDeSortieMixins_update

**Non-Basic CRUD Methods (4):**
- BonsDeSortieMixins_getBonsDeSortie
- BonsDeSortieMixins_getBonDeSortie
- BonsDeSortieMixins_delete
- BonsDeSortieMixins_getSignataires

**Complexity:** High - Complex store management (8x), Debug code (3x)

---

### CalendarMixins.js

**Total Methods:** 2

**Basic CRUD Methods (1):**
- CalendarMixins_get

**Non-Basic CRUD Methods (1):**
- CalendarMixins_formatEvents

**Complexity:** Medium - Data transformations (2x), Debug code (5x)

---

### CategorieMixins.js

**Total Methods:** 15

**Basic CRUD Methods (1):**
- CategorieMixins_getCategorie

**Non-Basic CRUD Methods (14):**
- CategorieMixins_getCategories
- CategorieMixins_create
- CategorieMixins_update
- CategorieMixins_updateCollection
- CategorieMixins_delete
- CategorieMixins_associate
- CategorieMixins_associateComposant
- CategorieMixins_desassociateComposant
- CategorieMixins_postAssociatedComposants
- CategorieMixins_getFile
- ... and 4 more

**Complexity:** Very High - File handling (7x), Complex store management (10x), Conditional logic (2x)

---

### CheckpointMixins.js

**Total Methods:** 5

**Basic CRUD Methods (1):**
- checkpointsMixins_getCheckpoint

**Non-Basic CRUD Methods (4):**
- data
- checkpointsMixins_createCheckpoints
- checkpointsMixins_updateCheckpoint
- checkpointsMixins_deleteCheckpoint

**Complexity:** Low - Basic API operations

---

### ComposantMixins.js

**Total Methods:** 15

**Basic CRUD Methods (1):**
- ComposantMixins_get

**Non-Basic CRUD Methods (14):**
- data
- ComposantMixins_create
- ComposantMixins_update
- ComposantMixins_delete
- ComposantMixins_postComposants
- ComposantMixins_putComposant
- ComposantMixins_deleteComposant
- ComposantMixins_postLibelProblem
- ComposantMixins_deleteLibelProblem
- ComposantMixins_getIcons
- ... and 4 more

**Complexity:** Very High - Complex store management (5x), Data transformations (4x), Conditional logic (1x)

---

### ConsommablesMixins.js

**Total Methods:** 35

**Basic CRUD Methods (9):**
- ConsommablesMixins_getConsommablesConditionnementsColisage
- ConsommablesMixins_getConsommablesEnStock
- ConsommablesMixins_getConsommablesNonDisponibles
- ConsommablesMixins_getConsommablesEnDemande
- ConsommablesMixins_getConsommablesACommander
- ConsommablesMixins_getEquipements
- ConsommablesMixins_create
- ConsommablesMixins_update
- ConsommablesMixins_delete

**Non-Basic CRUD Methods (26):**
- data
- ConsommablesMixins_getConsommables
- ConsommablesMixins_getConsommable
- ConsommablesMixins_getConsommablesEtiquettes
- ConsommablesMixins_updateConsommables
- ConsommablesMixins_deleteMultiple
- ConsommablesMixins_updateStock
- ConsommablesMixins_getFile
- ConsommablesMixins_getConsommablesForEquipement
- ConsommablesMixins_getEquipementConsommables
- ... and 16 more

**Complexity:** Very High - File handling (11x), Complex store management (27x), Complex endpoints (6x)

---

### ContactsMixins.js

**Total Methods:** 4

**Non-Basic CRUD Methods (4):**
- ContactsMixins_getContacts
- ContactsMixins_create
- ContactsMixins_update
- ContactsMixins_delete

**Complexity:** Medium - Complex store management (4x)

---

### ContratsEcheancierMixins.js

**Total Methods:** 4

**Basic CRUD Methods (4):**
- ContratsEcheancierMixins_getContratEcheances
- ContratsEcheancierMixins_create
- ContratsEcheancierMixins_update
- ContratsEcheancierMixins_delete

**Complexity:** Low - Basic API operations

---

### ContratsMixins.js

**Total Methods:** 10

**Basic CRUD Methods (2):**
- ContratsMixins_getContrats
- ContratsMixins_delete

**Non-Basic CRUD Methods (8):**
- data
- ContratsMixins_fetchContrats
- ContratsMixins_fetchContrat
- ContratsMixins_createContrat
- ContratsMixins_updateContrat
- ContratsMixins_archive
- ContratsMixins_attachCategoriesToContrat
- ContratsMixins_formatStatus

**Complexity:** Very High - Complex store management (6x), Complex endpoints (2x), Data transformations (2x)

---

### CorpsDetatMixins.js

**Total Methods:** 4

**Basic CRUD Methods (4):**
- CorpsDetatsMixins_getCorpsDetats
- CorpsDetatsMixins_create
- CorpsDetatsMixins_update
- CorpsDetatsMixins_delete

**Complexity:** Medium - Complex store management (4x)

---

### DashboardMixins.js

**Total Methods:** 22

**Non-Basic CRUD Methods (22):**
- DashboardMixins_getCuratifTotaux
- DashboardMixins_getCuratifUrgentes
- DashboardMixins_getCuratifRepartitionAge
- DashboardMixins_getCuratifRepartitionComposants
- DashboardMixins_getCuratifRepartitionDemandeur
- DashboardMixins_getCuratifRepartitionUserAffecte
- DashboardMixins_getCuratifRepartitionTiersAffecte
- DashboardMixins_getCuratifRepartitionCategoriesEquipements
- DashboardMixins_getCuratifRepartitionCorpsDetat
- DashboardMixins_getCuratifRepartitionEquipements
- ... and 12 more

**Complexity:** Very High - Complex store management (20x), Complex endpoints (20x), Debug code (2x)

---

### debuggerMixins.js

**Total Methods:** 0

**Complexity:** Low - Basic API operations

---

### DemandeInterventionMixins.js

**Total Methods:** 1

**Non-Basic CRUD Methods (1):**
- data

**Complexity:** Low - Basic API operations

---

### DeplacementsEquipementsMixins.js

**Total Methods:** 1

**Non-Basic CRUD Methods (1):**
- DeplacementsEquipementsMixins_createDeplacementsEquipements

**Complexity:** Low - Basic API operations

---

### DocumentsMixins.js

**Total Methods:** 5

**Basic CRUD Methods (1):**
- DocumentsMixins_getPlans

**Non-Basic CRUD Methods (4):**
- DocumentsMixins_get
- DocumentsMixins_create
- DocumentsMixins_update
- DocumentsMixins_delete

**Complexity:** Low - Basic API operations

---

### equipementsMixins.js

**Total Methods:** 18

**Basic CRUD Methods (1):**
- equipementsMixins_getEquipementsTachesActivesSites

**Non-Basic CRUD Methods (17):**
- equipementsMixins_getEquipementVerifications
- equipementsMixins_getEquipement
- equipementsMixins_getEquipementByQrCode
- equipementsMixins_getRapportAssets
- equipementsMixins_getRapportAssetsExcelFile
- equipementsMixins_getEquipements
- equipementsMixins_getExcelFileModeleIntegration
- equipementsMixins_getExcelFile
- equipementsMixins_createEquipements
- equipementsMixins_ImportModelEquipementsExcel
- ... and 7 more

**Complexity:** Very High - File handling (16x), Complex store management (14x), Complex endpoints (3x)

---

### FicheDemandeConsommablesMixins.js

**Total Methods:** 10

**Basic CRUD Methods (2):**
- FicheDemandeConsommablesMixins_update
- FicheDemandeConsommablesMixins_getSignataires

**Non-Basic CRUD Methods (8):**
- FicheDemandeConsommablesMixins_getFiches
- FicheDemandeConsommablesMixins_getFiche
- FicheDemandeConsommablesMixins_create
- FicheDemandeConsommablesMixins_close
- FicheDemandeConsommablesMixins_priseEnCompte
- FicheDemandeConsommablesMixins_enAttente
- FicheDemandeConsommablesMixins_delete
- FicheDemandeConsommablesMixins_export

**Complexity:** Very High - File handling (7x), Complex store management (10x), Conditional logic (1x)

---

### FiltersMixins.js

**Total Methods:** 8

**Non-Basic CRUD Methods (8):**
- data
- getRouterTo
- getRouterFrom
- getDefaultPagination
- getDefaultPaginationOffset
- getDefaultPaginationLimit
- getDefaultPaginationCurrentPage
- FiltersMixins_setStorage

**Complexity:** Very High - Data transformations (68x), Data parsing (3x), Conditional logic (2x)

---

### GroupeValidateursMixins.js

**Total Methods:** 4

**Basic CRUD Methods (3):**
- GroupeValidateursMixins_create
- GroupeValidateursMixins_update
- GroupeValidateursMixins_delete

**Non-Basic CRUD Methods (1):**
- GroupeValidateursMixins_getGroupeValidateurs

**Complexity:** Medium - Complex store management (4x), Debug code (2x)

---

### GroupeValidateursUsersMixins.js

**Total Methods:** 2

**Basic CRUD Methods (2):**
- GroupeValidateursUsersMixins_create
- GroupeValidateursUsersMixins_delete

**Complexity:** Medium - Complex store management (2x), Data transformations (1x)

---

### IfcMixins.js

**Total Methods:** 1

**Non-Basic CRUD Methods (1):**
- IfcMixins_readfile

**Complexity:** Low - Basic API operations

---

### IntegrationsDonneesMixins.js

**Total Methods:** 2

**Non-Basic CRUD Methods (2):**
- mounted
- IntegrationsDonneesMixins_categoriesLieux

**Complexity:** Low - Basic API operations

---

### InterventionsMixins.js

**Total Methods:** 11

**Basic CRUD Methods (1):**
- InterventionsMixins_getIntervention

**Non-Basic CRUD Methods (10):**
- InterventionsMixins_get
- InterventionsMixins_getPdfFile
- InterventionsMixins_update
- InterventionsMixins_create
- InterventionsMixins_delete
- InterventionsMixins_formatToCalendarEvents
- InterventionsMixins_getCalendarEvents
- InterventionsMixins_createInterventionsEquipements
- InterventionsMixins_deleteInterventionEquipement
- InterventionsMixins_deleteInterventionsEquipements

**Complexity:** Very High - File handling (4x), Complex store management (10x), Data transformations (4x)

---

### InventaireMixins.js

**Total Methods:** 11

**Basic CRUD Methods (2):**
- inventaireMixins_fetch
- InventaireMixins_fetchAll

**Non-Basic CRUD Methods (9):**
- InventaireMixins_fetchById
- InventaireMixins_fetchEnCoursInventory
- InventaireMixins_fetchOperationsByInventaireId
- InventaireMixins_fetchOperationsByInventaireIdOnLieu
- InventaireMixins_finalizeInventaireOnLieu
- InventaireMixins_create
- InventaireMixins_create_operation
- InventaireMixins_removeOperationInventaire
- InventaireMixins_deleteInventaire

**Complexity:** Very High - Complex store management (10x), Data transformations (4x), Conditional logic (5x)

---

### LibellesCategorieMixins.js

**Total Methods:** 3

**Basic CRUD Methods (3):**
- LibellesCategorieMixins_delete
- LibellesCategorieMixins_getLibellesCategorie
- LibellesCategorieMixins_create

**Complexity:** Low - Basic API operations

---

### LibelProblemMixins.js

**Total Methods:** 9

**Basic CRUD Methods (2):**
- LibelProblemMixins_create
- LibelProblemMixins_delete

**Non-Basic CRUD Methods (7):**
- data
- LibelProblemMixins_DI_get_composant_problem
- LibelProblemMixins_DI_get
- LibelProblemMixins_getLibellesProblemByCategorie
- LibelProblemMixins_DI_create
- LibelProblemMixins_DI_delete
- LibelProblemMixins_getLibelsEquipement

**Complexity:** High - Complex store management (7x)

---

### LibelServicesMixins.js

**Total Methods:** 3

**Basic CRUD Methods (3):**
- LibelServicesMixins_getLibelServices
- LibelServicesMixins_create
- LibelServicesMixins_delete

**Complexity:** Medium - Complex store management (3x), Conditional logic (1x)

---

### LieuMixins.js

**Total Methods:** 18

**Basic CRUD Methods (2):**
- LieuMixins_getLieux
- LieuMixins_create

**Non-Basic CRUD Methods (16):**
- LieuMixins_getInitiales
- LieuMixins_getOrganisations
- LieuMixins_getSites
- LieuMixins_getLieu
- LieuMixins_importPieces
- LieuMixins_createPiecesGeneriques
- LieuMixins_createPiecesGeneriquesFamilleSite
- LieuMixins_createPieceGenerique
- LieuMixins_update
- LieuMixins_update_lieux
- ... and 6 more

**Complexity:** Very High - File handling (7x), Complex store management (6x), Data transformations (11x)

---

### mainMixins.js

**Total Methods:** 4

**Non-Basic CRUD Methods (4):**
- created
- isSessionStillAuth
- removeSession
- redirectToLogin

**Complexity:** Medium - Date manipulations (2x), Conditional logic (3x)

---

### MaintenanceMixins.js

**Total Methods:** 32

**Basic CRUD Methods (1):**
- MaintenanceMixins_getDemandeurs

**Non-Basic CRUD Methods (31):**
- data
- MaintenanceMixins_getMaintenances
- MaintenanceMixins_getMesMaintenancesPlanifiees
- MaintenanceMixins_getMaintenance
- MaintenanceMixins_update
- MaintenanceMixins_createMaintenances
- MaintenanceMixins_demandeDevis
- MaintenanceMixins_delete
- MaintenanceMixins_deleteMultiple
- MaintenanceMixins_relancer
- ... and 21 more

**Complexity:** Very High - File handling (11x), Complex store management (19x), Data transformations (18x)

---

### MouvementsEquipementsMixins.js

**Total Methods:** 7

**Basic CRUD Methods (2):**
- MouvementsEquipementsMixins_get
- MouvementsEquipementsMixins_getMouvementsEquipementsId

**Non-Basic CRUD Methods (5):**
- MouvementsEquipementsMixins_update
- MouvementsEquipementsMixins_create
- MouvementsEquipementsMixins_delete
- MouvementsEquipementsMixins_getMouvementsSignataires
- MouvementsEquipementsMixins_export

**Complexity:** Very High - File handling (7x), Complex store management (9x), Conditional logic (1x)

---

### OperationMixins.js

**Total Methods:** 8

**Basic CRUD Methods (2):**
- OperationsMixins_get
- OperationMixins_delete

**Non-Basic CRUD Methods (6):**
- data
- created
- OperationMixins_createBIOperation
- OperationMixins_createPhotoOperation
- OperationMixins_updateOperation
- OperationMixins_getFile

**Complexity:** Very High - File handling (7x), Complex store management (2x), Conditional logic (1x)

---

### ParametresMixins.js

**Total Methods:** 4

**Basic CRUD Methods (1):**
- ParametresMixins_get

**Non-Basic CRUD Methods (3):**
- mounted
- ParametresMixins_update
- ParametresMixins_deleteDemoAccount

**Complexity:** Low - Basic API operations

---

### PlanInteractifMixins.js

**Total Methods:** 11

**Non-Basic CRUD Methods (11):**
- data
- PlanInteractif_convertDataToFeature
- PlanInteractif_updateFeaturePosition
- PlanInteractif_getPiecesACreer
- PlanInteractif_reaffectePiecesAuxMarkers
- PlanInteractif_getElementsPositionneesEtNonPositionnees
- PlanInteractif_newGeoJsonFeature
- PlanInteractif_geoJsonDeepCopy
- PlanInteractif_exportPiecesACreerExcel
- PlanInteractif_exportExcel
- ... and 1 more

**Complexity:** Very High - File handling (1x), Data transformations (12x), Debug code (1x)

---

### PlanMaintenanceMixins.js

**Total Methods:** 2

**Basic CRUD Methods (1):**
- PlanMaintenanceMixins_get

**Non-Basic CRUD Methods (1):**
- data

**Complexity:** Low - Basic API operations

---

### pubnubMixins.js

**Total Methods:** 6

**Non-Basic CRUD Methods (6):**
- data
- pubnubMixins_connect
- pubnubMixins_getCurrentFilter
- pubnubMixins_unsubscribeAll
- pushCallback
- getMyPerimeterSite

**Complexity:** Very High - Complex store management (5x), Data transformations (12x), Data parsing (1x)

---

### ReponsesMixins.js

**Total Methods:** 6

**Basic CRUD Methods (1):**
- ReponsesMixins_getReponses

**Non-Basic CRUD Methods (5):**
- data
- ReponsesMixins_updateReponse
- ReponsesMixins_setConsoJournaliere
- isPreviousRegisterResponse
- findPreviousRegisterResponse

**Complexity:** High - Data transformations (4x), Conditional logic (1x), Debug code (7x)

---

### RolesMixins.js

**Total Methods:** 4

**Non-Basic CRUD Methods (4):**
- data
- created
- getRoleRules
- can

**Complexity:** Medium - Data transformations (2x), Data parsing (1x)

---

### SearchDatasMixins.js

**Total Methods:** 2

**Non-Basic CRUD Methods (2):**
- SearchDatasMixins_get
- SearchDatasMixins_getEquipements

**Complexity:** Very High - Complex store management (7x), Data transformations (4x), Debug code (2x)

---

### SortieEquipementMixins.js

**Total Methods:** 2

**Basic CRUD Methods (1):**
- SortieEquipementMixins_getTypes

**Non-Basic CRUD Methods (1):**
- data

**Complexity:** Low - Basic API operations

---

### StatistiquesMixins.js

**Total Methods:** 6

**Non-Basic CRUD Methods (6):**
- mounted
- StatistiquesMixins_fetchStatistiquesMaintenanceEtat
- StatistiquesMixins_fetchStatistiquesMaintenanceRepartition
- StatistiquesMixins_fetchStatistiquesVerificationEtat
- StatistiquesMixins_fetchStatistiquesVerificationRepartition
- StatistiquesMixins_fetchStatistiquesVerificationTemps

**Complexity:** Very High - Complex endpoints (8x), Data transformations (10x)

---

### StocksMixins.js

**Total Methods:** 6

**Basic CRUD Methods (1):**
- StocksMixins_update

**Non-Basic CRUD Methods (5):**
- StocksMixins_getDepots
- StocksMixins_getStocks
- StocksMixins_getFiche
- StocksMixins_create
- StocksMixins_delete

**Complexity:** High - Complex store management (7x), Debug code (3x)

---

### StripeMixins.js

**Total Methods:** 3

**Basic CRUD Methods (1):**
- stripeMixins_getCustomerState

**Non-Basic CRUD Methods (2):**
- data
- stripeMixins_openCustomerPortal

**Complexity:** Low - Basic API operations

---

### SyntheseMaintenanceMixins.js

**Total Methods:** 2

**Basic CRUD Methods (1):**
- SyntheseMaintenanceMixins_get

**Non-Basic CRUD Methods (1):**
- data

**Complexity:** Low - Basic API operations

---

### TachesMixins.js

**Total Methods:** 7

**Basic CRUD Methods (1):**
- tachesMixins_getTache

**Non-Basic CRUD Methods (6):**
- data
- tachesMixins_getTaches
- tachesMixins_createTaches
- tachesMixins_updateTache
- tachesMixins_deleteTache
- tachesMixins_getExcelFile

**Complexity:** Very High - File handling (7x), Complex store management (7x), Conditional logic (2x)

---

### TacheUsersMixins.js

**Total Methods:** 1

**Non-Basic CRUD Methods (1):**
- tacheUsersMixins_create

**Complexity:** Low - Basic API operations

---

### TagGridMixins.js

**Total Methods:** 15

**Non-Basic CRUD Methods (15):**
- data
- created
- TagGridMixins_isExternalFilterPresent
- TagGridMixins_doesExternalFilterPass
- TagGridMixins_setFilters
- TagGridMixins_setQuickFilter
- TagGridMixins_exportCSV
- TagGridMixins_modalShowHideColumnsClosed
- TagGridMixins_exportXLSDone
- TagGridMixins_replaceMobileColumn
- ... and 5 more

**Complexity:** Very High - File handling (2x), Data transformations (111x), Conditional logic (9x)

---

### TagsMixins.js

**Total Methods:** 7

**Non-Basic CRUD Methods (7):**
- data
- TagsMixins_get
- TagsMixins_getTags
- TagsMixins_postTags
- TagsMixins_putTag
- TagsMixins_deleteTag
- TagsMixins_listComposantType

**Complexity:** Medium - Complex store management (2x), Data transformations (2x)

---

### TiersMixins.js

**Total Methods:** 5

**Basic CRUD Methods (2):**
- TiersMixins_get
- TiersMixins_getTiersId

**Non-Basic CRUD Methods (3):**
- TiersMixins_update
- TiersMixins_create
- TiersMixins_delete

**Complexity:** High - Complex store management (6x)

---

### TvasMixins.js

**Total Methods:** 4

**Basic CRUD Methods (4):**
- TvasMixins_getTvas
- TvasMixins_create
- TvasMixins_update
- TvasMixins_delete

**Complexity:** Medium - Complex store management (4x), Debug code (2x)

---

### TypologiesMaintenanceMixins.js

**Total Methods:** 5

**Basic CRUD Methods (3):**
- TypologiesMaintenanceMixins_get
- TypologiesMaintenanceMixins_getTypologiesMaintenanceId
- TypologiesMaintenanceMixins_delete

**Non-Basic CRUD Methods (2):**
- TypologiesMaintenanceMixins_create
- TypologiesMaintenanceMixins_update

**Complexity:** High - Complex store management (6x), Debug code (1x)

---

### UserGuidingMixins.js

**Total Methods:** 2

**Non-Basic CRUD Methods (2):**
- data
- UserGuidingMixins_identify

**Complexity:** Low - Basic API operations

---

### UserMixins.js

**Total Methods:** 8

**Basic CRUD Methods (6):**
- UserMixins_getUsers
- UserMixins_getUsersRestreints
- UserMixins_getAffectables
- UserMixins_create
- UserMixins_update
- UserMixins_delete

**Non-Basic CRUD Methods (2):**
- UserMixins_logout
- UserMixins_getFile

**Complexity:** Very High - File handling (7x), Complex store management (5x), Data transformations (2x)

---

### UserParametersMixins.js

**Total Methods:** 3

**Basic CRUD Methods (3):**
- UserParametersMixins_create
- UserParametersMixins_update
- UserParametersMixins_delete

**Complexity:** Low - Basic API operations

---

### ValidationsMixins.js

**Total Methods:** 1

**Non-Basic CRUD Methods (1):**
- ValidationsMixins_validationsBonDeCommande

**Complexity:** Low - Basic API operations

---

### VerificationMixins.js

**Total Methods:** 13

**Basic CRUD Methods (3):**
- VerificationMixins_getVerifications
- VerificationMixins_getVerificationsNotUseMetadatas
- VerificationMixins_getVerificationsReponsesNonConformes

**Non-Basic CRUD Methods (10):**
- data
- VerificationMixins_createVerifications
- VerificationMixins_startVerification
- VerificationMixins_getVerificationsReponsesById
- VerificationMixins_getProgression
- VerificationMixins_getVerificationsEquipementsTaches
- VerificationMixins_getTacheState
- VerificationMixins_getCalendarEvents
- VerificationMixins_formatToCalendarEvents
- VerificationMixins_getPdfFile

**Complexity:** Very High - File handling (11x), Complex store management (10x), Complex endpoints (3x)

---

