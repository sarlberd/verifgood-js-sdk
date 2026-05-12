import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Dashboar, DashboarCreateRequest, DashboarUpdateRequest } from "../types/Dashboard";

/**
 * Dashboard API request class
 * Service for dashboard analytics and reporting
 */
export class Dashboard extends ApiRequest {
  endpoint: string = '/api/dashboard';
  endpointSingleton: string = '/api/dashboard';

  /**
   * Private helper method for dashboard requests with common query parameters
   */
  private async getDashboardDatas(endpoint: string, metadatas: Metadatas): Promise<any> {
    const query = {
      sites: null //@TODO: Extract site restrictions from app context - this will be handled manually by devs
    };
    
    return this.get(endpoint, metadatas, query);
  }

  // ========== CURATIF (MAINTENANCE) DASHBOARD METHODS ==========

  /**
   * Get curatif totaux dashboard data
   */
  async getCuratifTotaux(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/totaux`, metadatas);
  }

  /**
   * Get curatif urgentes dashboard data
   */
  async getCuratifUrgentes(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/urgentes`, metadatas);
  }

  /**
   * Get curatif repartition age dashboard data
   */
  async getCuratifRepartitionAge(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-age`, metadatas);
  }

  /**
   * Get curatif repartition composants dashboard data
   */
  async getCuratifRepartitionComposants(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-composants`, metadatas);
  }

  /**
   * Get curatif repartition demandeur dashboard data
   */
  async getCuratifRepartitionDemandeur(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-demandeur`, metadatas);
  }

  /**
   * Get curatif repartition user affecte dashboard data
   */
  async getCuratifRepartitionUserAffecte(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-user-affecte`, metadatas);
  }

  /**
   * Get curatif repartition tiers affecte dashboard data
   */
  async getCuratifRepartitionTiersAffecte(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-tiers-affecte`, metadatas);
  }

  /**
   * Get curatif repartition categories equipements dashboard data
   */
  async getCuratifRepartitionCategoriesEquipements(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-categories-equipements`, metadatas);
  }

  /**
   * Get curatif repartition corps d'etat dashboard data
   */
  async getCuratifRepartitionCorpsDetat(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-corps-detat`, metadatas);
  }

  /**
   * Get curatif repartition equipements dashboard data
   */
  async getCuratifRepartitionEquipements(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-equipements`, metadatas);
  }

  /**
   * Get curatif repartition equipements couts dashboard data
   */
  async getCuratifRepartitionEquipementsCouts(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-equipements-couts`, metadatas);
  }

  /**
   * Get curatif repartition pieces dashboard data
   */
  async getCuratifRepartitionPieces(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-pieces`, metadatas);
  }

  /**
   * Get curatif repartition duree traitement dashboard data
   */
  async getCuratifRepartitionDureeTraitement(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/maintenances/repartition-duree-traitement`, metadatas);
  }

  // ========== PREVENTIF DASHBOARD METHODS ==========

  /**
   * Get preventif repartition non conformites dashboard data
   */
  async getPreventifRepartitionNonConformites(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/preventif/repartition-non-conformites`, metadatas);
  }

  /**
   * Get preventif relever compteur dashboard data
   */
  async getPreventifReleverCompteur(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/preventif/relever-compteur`, metadatas);
  }

  /**
   * Get preventif prochaines interventions externes dashboard data
   */
  async getPreventifProchainesInterventionsExternes(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/preventif/prochaines-interventions-externes`, metadatas);
  }

  /**
   * Get preventif progression interne dashboard data
   */
  async getPreventifProgressionInterne(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/preventif/progression-interne`, metadatas);
  }

  // ========== CONSOMMABLES DASHBOARD METHODS ==========

  /**
   * Get consommables repartition consommations maintenances dashboard data
   */
  async getConsommablesRepartitionConsommationsMaintenances(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/consommables/repartition-consommations-maintenances`, metadatas);
  }

  /**
   * Get consommables repartition consommations bons de sortie dashboard data
   */
  async getConsommablesRepartitionConsommationsBonsDeSortie(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/consommables/repartition-consommations-bons-de-sortie`, metadatas);
  }

  /**
   * Get consommables repartition en stock dashboard data
   */
  async getConsommablesRepartitionEnStock(metadatas: Metadatas): Promise<any> {
    return this.getDashboardDatas(`${this.endpoint}/consommables/repartition-en-stock`, metadatas);
  }
}
