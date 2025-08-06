"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reponses = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Reponses API request class
 * Service for managing responses
 */
class Reponses extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/reponses';
        this.endpointSingleton = '/api/reponse';
    }
    /**
     * Set daily consumption for an array of meter readings
     * @param tableauRelevesCompteur Array of meter readings
     */
    setConsoJournaliere(tableauRelevesCompteur) {
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
    isPreviousRegisterResponse(examinedRegisterResponse, releveCompteur) {
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
    findPreviousRegisterResponse(index, releveCompteur, tableauRelevesCompteur) {
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
exports.Reponses = Reponses;
//# sourceMappingURL=Reponses.js.map