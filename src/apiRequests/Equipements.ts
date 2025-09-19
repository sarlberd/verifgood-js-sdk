import {Metadatas} from "../core/Metadatas";
import {ApiRequest} from "../core/ApiRequest";

export class Equipements extends ApiRequest {
  endpoint: string = '/api/equipements';
  endpointSingleton: string = '/api/equipement';
  appID: string = '';
  restrictionsite: string = '';
  /**
   * 
   * @param equipement_id 
   * @returns 
   */
  async getEquipementTimeline(equipement_id: number): Promise<any> {
    const query = {};
    const response = await this.apiRequest(`${this.endpointSingleton}/${equipement_id}/timeline`, 'GET', query);
    return { datas: response };
  }
  
  /**
   * 
   * @param equipement_id 
   * @param metadatas 
   * @returns 
   */
  async getEquipementVerifications(equipement_id: number, metadatas: Metadatas = new Metadatas('{"directives":[],"filters":[]}')): Promise<any> {
    const query = {
      metadatas: metadatas.get()
    };
    const response = await this.apiRequest(`${this.endpointSingleton}/${equipement_id}/verifications`, 'GET', query);
    return { datas: response };
  }
  /**
   * 
   * @example 
     vgsdk.equipements.getById(1).then().catch();
   */
  async getById(idEquipement: number): Promise<any> {
    let query = null;
    const response = await this.apiRequest(`${this.endpointSingleton}/${idEquipement}`, 'GET', query);
    response[0] = this.calculDepreciation(response[0]);
    return response[0];
  }
  /**
   * 
   * @example 
     vgsdk.equipements.getByCode("VLGE1234").then().catch();
   */
  async getByCode(code: string): Promise<any> {
    let query = null;
    const response = await this.apiRequest(`${this.endpointSingleton}/code/${code}`, 'GET', query);
    response[0] = this.calculDepreciation(response[0]);
    return response[0];
  }

  async getRapportAssets(metadatas: Metadatas): Promise<any> {
    const query = {
      metadatas: metadatas.get(),
      sites: this.restrictionsite
    };
    const response = await this.apiRequest(`${this.endpoint}/valeurs-financieres`, 'GET', query);
    return response.equipements;
  }

  /**
   * Export rapport assets file (CSV or Excel)
   * @param metadatas Metadatas for filtering
   * @param fileExtension File extension (xlsx or csv)
   * @returns Promise<Blob> Returns a Blob object for file download
   */
  async getRapportAssetsExcelFile(metadatas: Metadatas, fileExtension: string = "xlsx"): Promise<Blob> {
    metadatas.setDirectives([]);
    const query = {
      metadatas: metadatas.get()
    };
    const fileType = fileExtension !== "csv" ? "excel" : "csv";
    const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";

    const response = await this.apiRequest(`${this.endpoint}/valeurs-financieres/export/${fileType}`, 'GET', query);
    
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
  
  /**
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    const query = {
      sites: this.restrictionsite
    };
    const response = await this.get(this.endpoint, metadatas, query);
    response.datas.forEach((equipement: any, i: number) => {
      response.datas[i] = this.calculDepreciation(equipement);
    });
    return response;
  }

  async getEquipementsTachesActivesSites(site: string, metadatas: Metadatas): Promise<any> {
    const query = {
      site: site,
      metadatas: metadatas.get()
    };
    const response = await this.apiRequest(`${this.endpoint}/taches/active/site`, 'GET', query);
    return { datas: response.equipements, metadatas: response.meta };
  }

  /**
   * Get Excel file model for integration
   * @param filename Custom filename
   * @returns Promise<Blob> Returns a Blob object for Excel file download
   */
  async getExcelFileModeleIntegration(filename: string = "VG_modèle_importation_equipements"): Promise<Blob> {
    const contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    
    // Get raw response data
    const response = await this.get(`${this.endpoint}/integration/model`, new Metadatas(), {});
    
    // Create blob for Excel file
    const blob = new Blob([response], { type: contentType });
    
    return blob;
  }

  /**
   * Export equipements file (CSV or Excel)
   * @param metadatas Metadatas for filtering
   * @param filename Custom filename
   * @param fileExtension File extension
   * @returns Promise<Blob> Returns a Blob object for file download
   */
  async getExcelFile(metadatas: Metadatas, filename: string | null = null, fileExtension: string = "xlsx"): Promise<Blob> {
    const fileType = fileExtension !== "csv" ? "excel" : "csv";
    const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";

    // Get raw response data
    const response = await this.get(`${this.endpoint}/export/${fileType}`, metadatas, {});
    
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

  /**
   * @deprecated Use create() from parent ApiRequest class instead
   */
  async create(equipements: any[]): Promise<any> {
    equipements.forEach((equipement: any) => {
      if (!equipement.marker && equipement.marker == null) delete equipement.marker;
      if (navigator.geolocation) {
        try {
          navigator.geolocation.getCurrentPosition((position) => {
            equipement.posY = position.coords.latitude;
            equipement.posX = position.coords.longitude;
          });
        } catch (err) {
          console.warn("Cannot get position xy");
        }
      }
    });
    const response = await this.apiRequest(this.endpointSingleton, 'POST', equipements);
    return response;
  }

  async importModelEquipementsExcel(equipements: any[]): Promise<any> {
    const response = await this.apiRequest(`${this.endpoint}/integration/model`, 'POST', equipements);
    return response;
  }

  async sortirEquipement(equipement: any, callback: Function): Promise<void> {
    await this.apiRequest(`${this.endpointSingleton}/sortie`, 'POST', equipement);
    callback && callback();
  }

  async remplacerEquipement(sortie: any, maintenance: any): Promise<any> {
    const response = await this.apiRequest(`/maintenance/${maintenance.id}/equipement/remplacement`, 'POST', sortie);
    return response;
  }

  /**
   */
  async update(equipement: any, _options: { skipVueXStorage?: boolean } = { skipVueXStorage: false }): Promise<any> {
    const response = await this.apiRequest(`${this.endpointSingleton}/${equipement.id}`, 'PUT', equipement);
    return response;
  }

  async updateEquipements(equipements: any[]): Promise<any> {
    const response = await this.apiRequest(this.endpoint, 'PUT', equipements);
    response.forEach((equipement: any) => {
    });
    return response;
  }

  /**
   */
  async remove(equipementId: number): Promise<any> {
    const response = await this.delete(`${this.endpointSingleton}/${equipementId}`);
    return response;
  }

  async createEquipementsGlobauxFamilleSite(famille: string, equipements: any[]): Promise<any> {
    const response = await this.apiRequest(`/sites/${famille}/equipements/globaux`, 'POST', equipements);
    return response;
  }

  calculDepreciation(equipement: any): any {
    equipement.depreciationAnnuelle = 0;
    equipement.depreciationMensuelle = 0;
    equipement.depreciationCumulee = 0;
    equipement.depreciationRestante = 0;
    equipement.dateFin = null;
    equipement.moisUtilisation = "-";
    if (!equipement.miseEnService) {
      return equipement;
    }
    const tauxDepreciationAnnuel = Number(equipement.tauxDepreciationAnnuel);
    const tauxDepreciationEnPourcent = Number.isNaN(tauxDepreciationAnnuel) ? 0 : tauxDepreciationAnnuel;

    let valeurAchat = Number(equipement.valeurAchat);
    valeurAchat = Number.isNaN(valeurAchat) || valeurAchat === 0 ? 0 : valeurAchat;
    equipement.valeurAchat = valeurAchat;

    const dateDebut = equipement.miseEnService ? new Date(equipement.miseEnService) : new Date(equipement.created_at);
    if (!equipement.miseEnService || equipement.miseEnService.length === 0) equipement.miseEnService = equipement.created_at;

    equipement.depreciationRestante = valeurAchat;
    equipement.dateFin = new Date(dateDebut);
    equipement.dateFin.setFullYear(equipement.dateFin.getFullYear() + (100 / tauxDepreciationEnPourcent));
    equipement.moisUtilisation = this.diffMonths(new Date(), dateDebut);
    equipement.depreciationAnnuelle = Number(tauxDepreciationEnPourcent) / 100 * valeurAchat;
    equipement.depreciationMensuelle = (Number(tauxDepreciationEnPourcent) / 100 * valeurAchat) / 12;

    if (equipement.moisUtilisation !== 0) {
      const decote = equipement.depreciationMensuelle * equipement.moisUtilisation;
      equipement.depreciationCumulee = decote;
      if (decote > valeurAchat) {
        equipement.depreciationCumulee = valeurAchat;
      }
      if (decote < valeurAchat) {
        const depreciationRestante = equipement.depreciationMensuelle * (this.diffMonths(equipement.dateFin, dateDebut) - equipement.moisUtilisation);
        equipement.depreciationRestante = depreciationRestante;
      }
    }

    return equipement;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private diffMonths(date1: Date, date2: Date): number {
    const years = date1.getFullYear() - date2.getFullYear();
    const months = date1.getMonth() - date2.getMonth();
    return years * 12 + months;
  }
}

//export default Equipements;