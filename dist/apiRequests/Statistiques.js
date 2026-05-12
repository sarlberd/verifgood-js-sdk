"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistiques = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Statistiques API request class
 * Service for managing statistics (maintenance and verification)
 */
class Statistiques extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/statistiques';
        this.endpointSingleton = '/api/statistiques';
    }
    /**
     * Statistiques Maintenance état
     * état des maintenances ouvertures & fermetures sur une année ou sur une semaine
     *
     * @param string year
     * @param string week
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesMaintenanceEtat(year, week = null, metadatas = new Metadatas_1.Metadatas()) {
        const endpoint = week ? `/api/statistiques/maintenance/etat/${year}/${week}` : `/api/statistiques/maintenance/etat/${year}`;
        const query = {
            userId: null,
            sites: null
        };
        return this.get(endpoint, metadatas, query);
    }
    /**
     * Statistiques Maintenance répartition
     * maintenances réparties par lieux & équipements & composants & services
     *
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesMaintenanceRepartition(metadatas = new Metadatas_1.Metadatas()) {
        const query = {
            userId: null,
            sites: null
        };
        return this.get('/api/statistiques/maintenance/repartition', metadatas, query);
    }
    /**
     * Statistiques Verification état
     * état des vérifications conformes & non conformes sur une année ou sur une semaine
     *
     * @param string year
     * @param string week
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesVerificationEtat(year, week = null, metadatas = new Metadatas_1.Metadatas()) {
        const endpoint = week ? `/api/statistiques/verification/etat/${year}/${week}` : `/api/statistiques/verification/etat/${year}`;
        const query = {
            userId: null,
            sites: null
        };
        return this.get(endpoint, metadatas, query);
    }
    /**
     * Statistiques Verification répartition
     * vérifications réparties par lieux & équipements
     *
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesVerificationRepartition(metadatas = new Metadatas_1.Metadatas()) {
        const query = {
            userId: null,
            sites: null
        };
        return this.get('/api/statistiques/verification/repartition', metadatas, query);
    }
    /**
     * Statistiques Verification temps passé par technicien
     * temps passé pour chaque technicien sur une année ou sur une semaine
     *
     * @param object metadatas default {"directives":[],"filters":[]}
     * @return Promise
     */
    fetchStatistiquesVerificationTemps(year, week = null, metadatas = new Metadatas_1.Metadatas()) {
        const endpoint = week ? `/api/statistiques/verification/temps/${year}/${week}` : `/api/statistiques/verification/temps/${year}`;
        const query = {
            userId: null,
            sites: null
        };
        return this.get(endpoint, metadatas, query);
    }
}
exports.Statistiques = Statistiques;
//# sourceMappingURL=Statistiques.js.map