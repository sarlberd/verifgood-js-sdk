/**
 * Taches Types
 * Generated API types for Taches (Tasks)
 */

/**
 * Tache entity interface
 */
export interface TacheEntity {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigned_to?: number;
  site_id?: number;
  created_at?: string;
  updated_at?: string;
  checkpoints?: any[];
  tacheSites?: any[];
}

/**
 * Request interface for creating Taches
 */
export interface TacheCreateRequest {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  assigned_to?: number;
  site_id?: number;
}

/**
 * Request interface for updating Taches
 */
export interface TacheUpdateRequest {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigned_to?: number;
  site_id?: number;
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
  userId?: number | null;
}
