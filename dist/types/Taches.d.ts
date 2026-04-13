/**
 * Taches Types
 * API types for Taches (preventive maintenance tasks)
 * Source: TachesNormalizer.php, CheckpointNormalizer.php, ProgressionTacheNormalizer.php
 */
/**
 * Composant associated with a checkpoint
 */
export interface CheckpointComposant {
    userId?: string;
    libelComposant?: string;
    typeComposant?: string;
    icon?: string;
    uidComposant?: string;
}
/**
 * Consommable associated with a checkpoint
 */
export interface CheckpointConsommable {
    id?: number;
    name?: string;
    refExterne?: string;
    marque?: string;
    numSerie?: string;
    commentaire?: string;
    coutUnitaire?: number | string;
    fournisseurDefault_id?: number | null;
    statut?: string;
    unite?: string;
    tva_id?: number | null;
    code?: string;
    nature?: string;
    category?: string;
    services?: string | any[];
}
/**
 * Checkpoint associated with a tache
 * Input: question, typeReponse, orderOfAppearance are required for creation
 * Output: all fields populated by backend
 */
export interface Checkpoint {
    id?: number;
    question: string;
    typeReponse: string;
    type_reponse?: string;
    orderOfAppearance?: number;
    consigne?: string;
    section?: string;
    rubrique?: string;
    maxVal?: string | number | null;
    minVal?: string | number | null;
    messageOnVerifError?: string;
    idTache_id?: number;
    composant_id?: number | null;
    consommable_id?: number | null;
    seuils?: string | any[] | null;
    isUpdatable?: boolean;
    unite?: string | null;
    defaultValue?: string | null;
    stepValue?: string | null;
    userId?: string;
    photos?: any[];
    composant?: CheckpointComposant | any[];
    consommable?: CheckpointConsommable;
}
/**
 * Site location info nested in TacheSite
 */
export interface TacheSiteLieu {
    id?: number;
    libel_lieu?: string;
    path?: string;
}
/**
 * Progression data for a tache on a specific site
 */
export interface TacheSiteProgression {
    id?: number;
    dateDebut?: string;
    dateFin?: string;
    total?: number;
    verified?: number;
}
/**
 * Tache site association
 * Input: site_id required for creation
 * Output: includes nested site and progressionTache objects
 */
export interface TacheSite {
    id?: number;
    site_id: number;
    libel_lieu?: string;
    path?: string;
    site?: TacheSiteLieu;
    progressionTache?: TacheSiteProgression;
}
/**
 * Affectation (scheduling) for a tache
 */
export interface TacheAffectation {
    id?: number;
    start?: string;
    end?: string;
    recurrence?: number;
    dayOfWeek?: number;
    durationMinutes?: number;
    excludeDates?: string;
    excludeSaturday?: boolean;
    excludeSunday?: boolean;
    dateDebut?: string;
    dateFin?: string;
    affectes?: any[];
}
/**
 * Categorie nested in tache response
 */
export interface TacheCategorie {
    id?: number;
    libelleCatgorie?: string;
    uid?: string;
    icon?: string;
    tags?: string | any[];
    isGe?: boolean | string;
    codeCouleur?: string;
    typeCategorie?: string;
    isInventoriable?: boolean | string;
    openMaintenanceOnError?: boolean | string;
}
/**
 * Global progression across all sites for a tache
 */
export interface ProgressionGlobale {
    dateDebut?: string;
    dateFin?: string;
    total?: number;
    verified?: number;
}
/**
 * Tache entity — full response from GET /taches and GET /tache/{id}
 */
export interface TacheEntity {
    id?: number;
    libel_tache?: string;
    type_tache?: string;
    commentaire_tache?: string;
    consigne?: string;
    intex?: string;
    periodicite?: number | string;
    isEquipementsDisplayed?: boolean | string;
    dateprochaineVerif?: string;
    norme?: string;
    userId?: string;
    tags?: string | any[];
    prisePhotoAfterVerification?: boolean | string;
    uploadDocumentAfterVerification?: boolean | string;
    isDocumentRequired?: boolean;
    affectationMaintenancesAfterVerification?: boolean | string;
    notifOnOubli?: boolean | string;
    isActive?: number | string;
    created_at?: string;
    updated_at?: string;
    isScanRequired?: boolean | string;
    idCategorie_id?: number | null;
    averageTime?: number | string;
    expectUserToReportOnVerification?: boolean;
    canBeValidatedWithoutZooming?: boolean;
    nbCheckpoints?: number | null;
    uid?: string;
    orderOfApparition?: number | string;
    assignation?: number[];
    tacheSites?: TacheSite[];
    tacheEquipements?: number[];
    affectation?: TacheAffectation;
    categorie?: TacheCategorie;
    progressionGlobale?: ProgressionGlobale;
    checkpoints?: Checkpoint[];
}
/**
 * Request interface for creating Taches (POST /taches)
 *
 * Two creation schemas:
 * - Schema A (category-based): requires idCategorie_id, applies to all equipment of that category
 * - Schema B (equipment-restricted): requires tacheEquipements array, no category
 */
export interface TacheCreateRequest {
    /** Task label (required) */
    libelTache: string;
    /** Task type: "Verification_equipement", "Ronde", etc. (required) */
    typeTache: string;
    /** Recurrence in days (required) */
    periodicite: number;
    /** Next verification date ISO string (required) */
    dateprochaineVerif: string;
    /** Tag for grouping */
    tagTache?: string;
    /** Category ID — required for Schema A (category-based task) */
    idCategorie_id?: number;
    /** Checkpoints to create with the task (required, at least 1) */
    checkpoints?: Checkpoint[];
    /** Sites to assign the task to */
    tacheSites?: TacheSite[];
    /** Equipment IDs — required for Schema B (equipment-restricted task) */
    tacheEquipements?: number[];
}
/**
 * Request interface for updating Taches (PUT /tache/{id})
 * All fields optional (partial update)
 */
export interface TacheUpdateRequest {
    id: number;
    libelTache?: string;
    typeTache?: string;
    periodicite?: number;
    dateprochaineVerif?: string;
    tagTache?: string;
    isActive?: number;
    idCategorie_id?: number;
    /** Checkpoints: include id for update, omit id for create new */
    checkpoints?: Checkpoint[];
    /** Sites: include id for update, omit id for create new */
    tacheSites?: TacheSite[];
    tacheEquipements?: number[];
    /** Affectation: include id for update, omit id for create new */
    affectation?: TacheAffectation;
}
/**
 * Response from GET /taches/overview
 */
export interface TacheOverview {
    total: number;
    completed: number;
    pending: number;
}
/**
 * ProgressionTache — response from GET /progressionstaches
 */
export interface ProgressionTache {
    id?: number;
    dateDebut?: string;
    dateFin?: string;
    total?: number;
    verified?: number;
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
    uid?: string;
    site?: {
        id?: number;
        libel_lieu?: string;
        path?: string;
    };
    tache?: {
        id?: number;
        libel?: string;
        type?: string;
        categorie?: {
            id?: number;
            libelleCatgorie?: string;
            isGe?: boolean | string;
            icon?: string;
        };
    };
}
/**
 * Options for getTaches method
 */
export interface GetTachesOptions {
    restrictionSites?: string | null;
}
/**
 * Export file options
 */
export interface ExportFileOptions {
    filename?: string | null;
    fileExtension?: 'xlsx' | 'csv';
}
