import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { DeplacementsEquipement, DeplacementsEquipementCreateRequest, DeplacementsEquipementUpdateRequest } from "../types/DeplacementsEquipements";

/**
 * DeplacementsEquipements API request class
 * Service for managing equipment displacements
 */
export class DeplacementsEquipements extends ApiRequest {
  endpoint: string = '/api/deplacements/equipements';
  endpointSingleton: string = '/api/deplacements/equipements';

  /**
   * Create multiple deplacements for equipements
   * @param deplacements Array of deplacements to create
   * @returns Promise<any>
   */
  createDeplacementsEquipements(deplacements: any[]): Promise<any> {
    return this.post(this.endpoint, deplacements);
  }
}
