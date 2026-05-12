import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Statistique, StatistiqueCreateRequest, StatistiqueUpdateRequest } from "../types/Statistiques";

/**
 * Statistiques API request class
 * Service for managing statistics (maintenance and verification)
 */
export class Statistiques extends ApiRequest {
  endpoint: string = '/api/statistiques';
  endpointSingleton: string = '/api/statistiques';

  /**
   * Statistiques Maintenance état
   * état des maintenances ouvertures & fermetures sur une année ou sur une semaine
   *
   * @param string year
   * @param string week
   * @param object metadatas default {"directives":[],"filters":[]}
   * @return Promise
   */
  fetchStatistiquesMaintenanceEtat(year: string, week: string | null = null, metadatas: Metadatas = new Metadatas()): Promise<any> {
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
  fetchStatistiquesMaintenanceRepartition(metadatas: Metadatas = new Metadatas()): Promise<any> {
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
  fetchStatistiquesVerificationEtat(year: string, week: string | null = null, metadatas: Metadatas = new Metadatas()): Promise<any> {
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
  fetchStatistiquesVerificationRepartition(metadatas: Metadatas = new Metadatas()): Promise<any> {
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
  fetchStatistiquesVerificationTemps(year: string, week: string | null = null, metadatas: Metadatas = new Metadatas()): Promise<any> {
    const endpoint = week ? `/api/statistiques/verification/temps/${year}/${week}` : `/api/statistiques/verification/temps/${year}`;
    const query = {
      userId: null,
      sites: null
    };
    return this.get(endpoint, metadatas, query);
  }
}
