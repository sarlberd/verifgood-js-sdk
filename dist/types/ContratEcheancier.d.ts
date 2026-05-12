/**
 * Service for managing contract payment schedules (echeances) - Type definitions
 */
export interface ContratEcheancie {
    id?: string;
    contratId?: string;
    dateEcheance?: string;
    montant?: number;
    statut?: string;
    userId?: string;
}
/**
 * Request interface for creating ContratEcheancie
 */
export interface ContratEcheancieCreateRequest {
    contratId?: string;
    dateEcheance?: string;
    montant?: number;
    statut?: string;
    userId?: string;
}
/**
 * Request interface for updating ContratEcheancie
 */
export interface ContratEcheancieUpdateRequest {
    contratId?: string;
    dateEcheance?: string;
    montant?: number;
    statut?: string;
    userId?: string;
}
