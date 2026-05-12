import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Reponse, ReponseCreateRequest, ReponseUpdateRequest } from "../types/Reponses";

/**
 * Reponses API request class
 * Service for managing responses
 */
export class Reponses extends ApiRequest {
  endpoint: string = '/api/reponses';
  endpointSingleton: string = '/api/reponse';

  /**
   * Set daily consumption for an array of meter readings
   * @param tableauRelevesCompteur Array of meter readings
   */
  setConsoJournaliere(tableauRelevesCompteur: any[]): void {
    const tableauRelevesCompteurLen = tableauRelevesCompteur.length;
    for (let index = 0; index < tableauRelevesCompteurLen; ++index) {
      const releveCompteur = tableauRelevesCompteur[index];
      this.findPreviousRegisterResponse(index, releveCompteur, tableauRelevesCompteur);
    }
  }

  /**
   * Check if examined register response is previous to current meter reading
   * @param examinedRegisterResponse Register response to examine
   * @param releveCompteur Current meter reading
   * @returns Boolean indicating if it's a previous response
   */
  isPreviousRegisterResponse(examinedRegisterResponse: any, releveCompteur: any): boolean {
    return examinedRegisterResponse.id === releveCompteur.id && 
           examinedRegisterResponse.etid === releveCompteur.etid && 
           examinedRegisterResponse.idCheckpoint === releveCompteur.idCheckpoint;
  }

  /**
   * Find previous register response and calculate daily consumption
   * @param index Current index in the array
   * @param releveCompteur Current meter reading
   * @param tableauRelevesCompteur Array of all meter readings
   */
  findPreviousRegisterResponse(index: number, releveCompteur: any, tableauRelevesCompteur: any[]): void {
    for (let position = index + 1; position < tableauRelevesCompteur.length; position++) {
      const examinedRegisterResponse = tableauRelevesCompteur[position];
      if (this.isPreviousRegisterResponse(examinedRegisterResponse, releveCompteur)) {
        //@TODO : getOutput method needs to be implemented - missing from original mixin
        // const consoJournaliere = this.getOutput(examinedRegisterResponse, releveCompteur, 'days');
        // releveCompteur.consoJournaliere = consoJournaliere;
        break;
      }
    }
  }
}
