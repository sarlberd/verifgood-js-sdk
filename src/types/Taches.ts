/**
 * Taches Types
 * API types for Taches (preventive maintenance tasks)
 */

/**
 * Checkpoint associated with a tache
 */
export interface Checkpoint {
  id?: number;
  question: string;
  typeReponse: string;
  orderOfAppearance?: number;
  consigne?: string;
  section?: string;
  photos?: any[];
}

/**
 * Tache site association
 */
export interface TacheSite {
  id?: number;
  site_id: number;
  libel_lieu?: string;
  path?: string;
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
  affectes?: any[];
}

/**
 * Tache entity interface matching backend response
 */
export interface TacheEntity {
  id?: number;
  libelTache?: string;
  typeTache?: string;
  periodicite?: number;
  dateprochaineVerif?: string;
  tagTache?: string;
  isActive?: number;
  idCategorie_id?: number;
  checkpoints?: Checkpoint[];
  tacheSites?: TacheSite[];
  tacheEquipements?: number[];
  affectation?: TacheAffectation;
  sites?: any[];
}

/**
 * Request interface for creating Taches
 */
export interface TacheCreateRequest {
  libelTache: string;
  typeTache: string;
  periodicite: number;
  dateprochaineVerif: string;
  tagTache?: string;
  idCategorie_id?: number;
  checkpoints?: Checkpoint[];
  tacheSites?: TacheSite[];
  tacheEquipements?: number[];
}

/**
 * Request interface for updating Taches
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
  checkpoints?: Checkpoint[];
  tacheSites?: TacheSite[];
  tacheEquipements?: number[];
  affectation?: TacheAffectation;
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
