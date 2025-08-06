import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * Statistiques API request class
 * Service for managing statistics (maintenance and verification)
 */
export declare class Statistiques extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Statistiques Maintenance état
     * état des maintenances ouvertures & fermetures sur une année ou sur une semaine
     *
     * @param string year
     * @param string week
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesMaintenanceEtat(year: string, week?: string | null, metadatas?: Metadatas): Promise<any>;
    /**
     * Statistiques Maintenance répartition
     * maintenances réparties par lieux & équipements & composants & services
     *
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesMaintenanceRepartition(metadatas?: Metadatas): Promise<any>;
    /**
     * Statistiques Verification état
     * état des vérifications conformes & non conformes sur une année ou sur une semaine
     *
     * @param string year
     * @param string week
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesVerificationEtat(year: string, week?: string | null, metadatas?: Metadatas): Promise<any>;
    /**
     * Statistiques Verification répartition
     * vérifications réparties par lieux & équipements
     *
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesVerificationRepartition(metadatas?: Metadatas): Promise<any>;
    /**
     * Statistiques Verification temps passé par technicien
     * temps passé pour chaque technicien sur une année ou sur une semaine
     *
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesVerificationTemps(year: string, week?: string | null, metadatas?: Metadatas): Promise<any>;
}
