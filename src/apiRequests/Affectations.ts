import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Affectation, AffectationCreateRequest, AffectationUpdateRequest } from "../types/Affectations";

/**
 * Affectations API request class
 * Service for managing task assignments and scheduling
 */
export class Affectations extends ApiRequest {
  endpoint: string = '/api/affectation';
  endpointSingleton: string = '/api/affectation';

  /**
   * Copy affectation tache
   * @param affectation - The affectation object
   * @param start - Start date/time
   * @param end - End date/time
   * @param affectes - Array of affected users (optional)
   * @returns Promise<any>
   */
  async copieAffectationTache(affectation: any, start: string, end: string, affectes: any[] = []): Promise<any> {
    const payload = {
      affectation: affectation,
      affectes: affectes,
      start: start,
      end: end,
      dateAffectation: new Date().toISOString().slice(0, 19).replace('T', ' '), // YYYY-MM-DD HH:mm format
      idAffectant: null // @TODO: need user context
    };
    return this.post(`/api/affectation/tache/${affectation.id}/copie`, payload);
  }

  /**
   * Create affectations users taches
   * @param affectes - Array of affected users
   * @returns Promise<any>
   */
  async createAffectationsUsersTaches(affectes: any[]): Promise<any> {
    return this.post('/api/affectationsuserstaches', { datas: affectes });
  }

  /**
   * Delete affectations users taches
   * @param affecte - The affected user object
   * @returns Promise<any>
   */
  async deleteAffectationsUsersTaches(affecte: any): Promise<any> {
    const affectationusertache = {
      id: affecte.affectationusertache_id,
      user_id: affecte.affectationusertache_user_id,
      affectation_id: affecte.affectationusertache_affectation_id,
      tache_id: affecte.affectationusertache_tache_id,
      userId: null // @TODO: need user context
    };
    return this.delete(`/api/affectationsuserstaches/${affecte.affectationusertache_id}`);
  }

  /**
   * Delete affectation
   * @param idAffectation - The affectation ID
   * @returns Promise<any>
   */
  async deleteAffectation(idAffectation: string): Promise<any> {
    const affectation = {
      id: idAffectation,
      userId: null // @TODO: need user context
    };
    return this.delete(`/api/affectation/${idAffectation}`);
  }

  /**
   * Save schedule
   * @param schedule - The schedule object
   * @param maintenance - The maintenance object
   * @param emailDatas - Email data (optional)
   * @returns Promise<any>
   */
  async saveSchedule(schedule: any, maintenance: any, emailDatas?: any): Promise<any> {
    const email = Object.assign({}, emailDatas, {
      demandeur: {
        id: null, // @TODO: need user context
        email: null, // @TODO: need user context
        nom: null, // @TODO: need user context
        prenom: null // @TODO: need user context
      }
    });
    
    const query = {
      datas: schedule,
      maintenance: maintenance,
      email: email,
      userId: null // @TODO: need user context
    };
    
    return this.post(`/api/affectation/maintenance/${maintenance.id}`, query);
  }

  /**
   * Save schedules for multiple maintenances
   * @param schedule - The schedule object
   * @param maintenances - Array of maintenance objects
   * @returns Promise<any>
   */
  async saveSchedules(schedule: any, maintenances: any[]): Promise<any> {
    const email = {
      demandeur: {
        id: null, // @TODO: need user context
        email: null, // @TODO: need user context
        nom: null, // @TODO: need user context
        prenom: null // @TODO: need user context
      }
    };
    
    const query = {
      datas: schedule,
      email: email,
      maintenances: maintenances
    };
    
    return this.post('/api/affectation/maintenances', query);
  }

  /**
   * Update schedule
   * @param schedule - The schedule object
   * @returns Promise<any>
   */
  async updateSchedule(schedule: any): Promise<any> {
    return this.post('/api/update/affectation', schedule);
  }

  /**
   * Fetch programmation contrat intervention
   * @param contratId - The contract ID
   * @returns Promise<any>
   */
  async fetchProgrammationContratIntervention(contratId: string): Promise<any> {
    const metadatas = new Metadatas();
    return this.get(`/api/affectation/contrat/${contratId}/programmation/interventions`, metadatas, {});
  }

  /**
   * Create programmation contrat intervention
   * @param programmation - The programmation object
   * @param contratId - The contract ID
   * @returns Promise<any>
   */
  async createProgrammationContratIntervention(programmation: any, contratId: string): Promise<any> {
    return this.post(`/api/affectation/contrat/${contratId}/programmation/interventions`, programmation);
  }

  /**
   * Update programmation contrat intervention
   * @param programmation - The programmation object
   * @param contratId - The contract ID
   * @returns Promise<any>
   */
  async updateProgrammationContratIntervention(programmation: any, contratId: string): Promise<any> {
    return this.put(`/api/affectation/contrat/${contratId}/programmation/interventions`, programmation);
  }

  /**
   * Convert item to calendar format
   * @param item - The item object
   * @param type - The type (user or tiers)
   * @param color - The color
   * @returns Calendar object
   */
  toCalendar(item: any, type: string, color: string): any {
    //@TODO: utility method - consider moving to utils
    return {
      id: item.uid,
      type: type,
      name: type === "user" ? `${item.nom} ${item.prenom}` : item.name,
      checked: true,
      color: "#fff",
      bgColor: color,
      dragBgColor: color,
      borderColor: color,
      datas: item
    };
  }

  /**
   * Format calendars from affectables
   * @param affectables - Object with users and tiers arrays
   * @returns Array of calendar objects
   */
  formatCalendars(affectables: any): any[] {
    //@TODO: utility method - consider moving to utils
    const calendarsColors = [
      "#D4E6F1", "#F5B7B1", "#D7BDE2",
      "#A3E4D7", "#FAD7A0", "#ABEBC6",
      "#EDBB99", "#85C1E9", "#F2D7D5",
      "#AEB6BF"
    ];
    
    let indexcolors = 0;
    let calendars: any[] = [];
    
    affectables.users.forEach((user: any) => {
      calendars.push(this.toCalendar(user, "user", calendarsColors[indexcolors]));
      indexcolors++;
    });
    
    affectables.tiers.forEach((tier: any) => {
      calendars.push(this.toCalendar(tier, "tiers", calendarsColors[indexcolors]));
      indexcolors++;
    });
    
    return calendars;
  }
}
