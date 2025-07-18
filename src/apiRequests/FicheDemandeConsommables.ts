import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { FicheDemandeConsommable, FicheDemandeConsommableCreateRequest, FicheDemandeConsommableUpdateRequest } from "../types/FicheDemandeConsommables";

/**
 * FicheDemandeConsommables API request class
 * Service for managing fiche demande consommables
 */
export class FicheDemandeConsommables extends ApiRequest {
  endpoint: string = '/api/fiche-demande-consommables';
  endpointSingleton: string = '/api/fiche-demande-consommables';
  appID: string = '';
  restrictionsite: string = '';

  /**
   * Get all fiches demande consommables
   * @param metadatas Metadatas for filtering
   * @returns Promise<any>
   * @deprecated Use getAll() instead - this method is provided by the parent ApiRequest class
   */
  async getFiches(metadatas: Metadatas): Promise<any> {
    const query = {
      metadatas: metadatas.get()
    };
    const response = await this.get(this.endpoint, metadatas, query);
    return { ficheDemandeConsommables: response.datas, metadatas: response.metadatas };
  }

  /**
   * Get fiche demande consommable by id
   * @param idFiche The ID of the fiche
   * @returns Promise<any>
   * @deprecated Use getById() instead - this method is provided by the parent ApiRequest class
   */
  async getFiche(idFiche: string): Promise<any> {
    const query = {};
    const response = await this.get(`${this.endpoint}/${idFiche}`, new Metadatas(), query);
    return response;
  }

  /**
   * Create fiche demande consommables
   * @param ficheDemandeConsommables Array of fiche demande consommables to create
   * @returns Promise<any>
   */
  async create(ficheDemandeConsommables: any[]): Promise<any> {
    const response = await this.post(this.endpoint, { datas: ficheDemandeConsommables });
    return response;
  }

  /**
   * Update fiche demande consommable
   * @param fiche The fiche to update
   * @returns Promise<any>
   */
  async update(fiche: any): Promise<any> {
    const response = await this.put(`${this.endpoint}/${fiche.id}`, { datas: fiche });
    return response;
  }

  /**
   * Close fiche demande consommable
   * @param fiche The fiche to close
   * @returns Promise<any>
   */
  async close(fiche: any): Promise<any> {
    // Set closure date
    const now = new Date();
    fiche.dateCloture = now.toISOString().slice(0, 19).replace('T', ' ');
    
    const response = await this.put(`${this.endpoint}/${fiche.id}/close`, { datas: fiche });
    return response;
  }

  /**
   * Mark fiche demande consommable as prise en compte
   * @param fiche The fiche to mark as prise en compte
   * @returns Promise<any>
   */
  async priseEnCompte(fiche: any): Promise<any> {
    const response = await this.put(`${this.endpoint}/${fiche.id}/prise-en-compte`, { datas: fiche });
    return response;
  }

  /**
   * Mark fiche demande consommable as en attente
   * @param fiche The fiche to mark as en attente
   * @returns Promise<any>
   */
  async enAttente(fiche: any): Promise<any> {
    const response = await this.put(`${this.endpoint}/${fiche.id}/en-attente`, { datas: fiche });
    return response;
  }

  /**
   * Delete fiche demande consommable
   * @param fiche The fiche to delete
   * @returns Promise<any>
   * @deprecated Use remove() instead - this method is provided by the parent ApiRequest class
   */
  async remove(fiche: any): Promise<any> {
    const response = await this.delete(`${this.endpoint}/${fiche.id}`);
    return response;
  }

  /**
   * Get signataires for fiche demande consommables
   * @param metadatas Metadatas for filtering
   * @returns Promise<any>
   */
  async getSignataires(metadatas: Metadatas): Promise<any> {
    const query = {
      metadatas: metadatas.get()
    };
    const response = await this.get(`${this.endpoint}/signataires`, metadatas, query);
    return { signataires: response.datas, metadatas: response.metadatas };
  }

  /**
   * Export fiche demande consommables file (CSV or Excel)
   * @param metadatas Metadatas for filtering
   * @param filename Custom filename
   * @param fileExtension File extension (xlsx or csv)
   * @returns Promise<Blob> Returns a Blob object for file download
   */
  async export(metadatas: Metadatas, filename: string | null = null, fileExtension: string = "xlsx"): Promise<Blob> {
    metadatas.setDirectives([]);
    const query = {
      sites: this.restrictionsite || '',
      metadatas: metadatas.get()
    };
    const fileType = fileExtension !== "csv" ? "excel" : "csv";
    const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";

    const response = await this.get(`${this.endpoint}/export/${fileType}`, metadatas, query);
    
    // Create blob with proper encoding
    let blob: Blob;
    if (fileExtension === "csv") {
      // Add BOM for UTF-8 encoding
      const BOM = "\uFEFF";
      blob = new Blob([BOM + response], { type: contentType });
    } else {
      blob = new Blob([response], { type: contentType });
    }
    
    return blob;
  }
}
