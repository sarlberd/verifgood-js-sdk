import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { LibelProble, LibelProbleCreateRequest, LibelProbleUpdateRequest } from "../types/LibelProblem";

/**
 * LibelProblem API request class
 * Service for managing libel problems
 */
export class LibelProblem extends ApiRequest {
  endpoint: string = '/api/libelles-probleme';
  endpointSingleton: string = '/api/libelle-probleme';

  /**
   * Override getAll method for libelles probleme
   * @param metadatas Metadatas object
   * @returns Promise with libelles probleme data
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    const query = {
      userId: null, // this.$app.appID equivalent
      metadatas: metadatas.get()
    };
    return this.get(this.endpoint, metadatas, query);
  }

  /**
   * Override create method for libelles probleme
   * @param libellesProblem Array of libelles problem to create
   * @returns Promise with created libelles problem
   */
  async create(libellesProblem: any[]): Promise<any> {
    //@TODO: need review - takes array instead of single object
    return this.post(this.endpoint, { datas: libellesProblem });
  }

  /**
   * Override remove method for libelles probleme
   * @param id Libelle problem ID
   * @returns Promise with deletion result
   */
  async remove(id: number): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${id}`);
  }

  /**
   * Create problems for a specific component
   * @param idComposant Component ID
   * @param problems Array of problems to create
   * @returns Promise with created problems
   */
  async createComposantProblems(idComposant: string, problems: any[]): Promise<any> {
    //@TODO: need review - component-specific problem creation
    return this.post(`/api/composant/${idComposant}/libels-problems`, { datas: problems });
  }

  /**
   * Delete a specific component problem
   * @param problem Problem object with id and composant properties
   * @returns Promise with deletion result
   */
  async deleteComposantProblem(problem: any): Promise<any> {
    //@TODO: need review - requires problem object with specific structure
    return this.delete(`${this.endpointSingleton}/${problem.id}`);
  }

  /**
   * Get problems for a specific component
   * @param composantId Component ID
   * @returns Promise with component problems
   */
  async getComposantProblems(composantId: string): Promise<any> {
    const query = {
      userId: null // this.$app.appID equivalent
    };
    return this.get(`/api/composant/${composantId}/libelles-probleme`, new Metadatas(), query);
  }

  /**
   * Get libelles problem by category (generic and category-specific)
   * @param metadatas Metadatas object
   * @param idCategorie Category ID
   * @returns Promise with category-specific libelles problem
   */
  async getLibellesProblemByCategorie(metadatas: Metadatas, idCategorie: string): Promise<any> {
    const query = {
      userId: null, // this.$app.appID equivalent
      metadatas: metadatas.get()
    };
    return this.get(`/api/libelles-probleme/categorie/${idCategorie}/all`, metadatas, query);
  }

  /**
   * Get libels for equipment (placeholder method)
   * @returns Promise with equipment libels
   */
  async getLibelsEquipement(): Promise<any> {
    //@TODO: need review - method was empty in original mixin, needs implementation
    return Promise.resolve([]);
  }
}
