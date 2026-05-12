import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * Dashboard API request class
 * Service for dashboard analytics and reporting
 */
export declare class Dashboard extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Private helper method for dashboard requests with common query parameters
     */
    private getDashboardDatas;
    /**
     * Get curatif totaux dashboard data
     */
    getCuratifTotaux(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif urgentes dashboard data
     */
    getCuratifUrgentes(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition age dashboard data
     */
    getCuratifRepartitionAge(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition composants dashboard data
     */
    getCuratifRepartitionComposants(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition demandeur dashboard data
     */
    getCuratifRepartitionDemandeur(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition user affecte dashboard data
     */
    getCuratifRepartitionUserAffecte(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition tiers affecte dashboard data
     */
    getCuratifRepartitionTiersAffecte(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition categories equipements dashboard data
     */
    getCuratifRepartitionCategoriesEquipements(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition corps d'etat dashboard data
     */
    getCuratifRepartitionCorpsDetat(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition equipements dashboard data
     */
    getCuratifRepartitionEquipements(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition equipements couts dashboard data
     */
    getCuratifRepartitionEquipementsCouts(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition pieces dashboard data
     */
    getCuratifRepartitionPieces(metadatas: Metadatas): Promise<any>;
    /**
     * Get curatif repartition duree traitement dashboard data
     */
    getCuratifRepartitionDureeTraitement(metadatas: Metadatas): Promise<any>;
    /**
     * Get preventif repartition non conformites dashboard data
     */
    getPreventifRepartitionNonConformites(metadatas: Metadatas): Promise<any>;
    /**
     * Get preventif relever compteur dashboard data
     */
    getPreventifReleverCompteur(metadatas: Metadatas): Promise<any>;
    /**
     * Get preventif prochaines interventions externes dashboard data
     */
    getPreventifProchainesInterventionsExternes(metadatas: Metadatas): Promise<any>;
    /**
     * Get preventif progression interne dashboard data
     */
    getPreventifProgressionInterne(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables repartition consommations maintenances dashboard data
     */
    getConsommablesRepartitionConsommationsMaintenances(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables repartition consommations bons de sortie dashboard data
     */
    getConsommablesRepartitionConsommationsBonsDeSortie(metadatas: Metadatas): Promise<any>;
    /**
     * Get consommables repartition en stock dashboard data
     */
    getConsommablesRepartitionEnStock(metadatas: Metadatas): Promise<any>;
}
