"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verifications = void 0;
const Metadatas_1 = require("../core/Metadatas");
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Verifications API request class
 * Provides methods for interacting with verification-related endpoints
 */
class Verifications extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/verifications';
        this.endpointSingleton = '/api/verification';
    }
    /**
     * Create new verifications
     * @param verifications Array of verification data to create
     * @returns Promise with the created verifications
     */
    createVerifications(verifications) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(this.endpoint, { datas: verifications });
        });
    }
    /**
     * Start a verification process for an equipment
     * @param equipementId ID of the equipment to verify
     * @param tacheId Optional task ID
     * @param uniquementMesTachesAffectes Whether to only include tasks assigned to the current user
     * @returns Promise with verification data
     */
    startVerification(equipementId_1, tacheId_1) {
        return __awaiter(this, arguments, void 0, function* (equipementId, tacheId, uniquementMesTachesAffectes = false) {
            let ressource = uniquementMesTachesAffectes ? "mes-taches" : "taches";
            let endpoint = `/api/verifier/equipement/${equipementId}/${ressource}`;
            if (tacheId) {
                endpoint += `/${tacheId}`;
            }
            return this.apiRequest(endpoint, 'GET', null);
        });
    }
    /**
     * Get verifications with metadata filtering
     * @param metadatas Metadata for filtering
     * @returns Promise with verification data
     */
    getVerifications(metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(this.endpoint, metadatas, {});
        });
    }
    /**
     * Get non-conforming verification responses
     * @param metadatas Metadata for filtering
     * @returns Promise with non-conforming responses
     */
    getVerificationsReponsesNonConformes(metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                isNonConforme: true
            };
            return this.get(`${this.endpoint}/reponses`, metadatas, query);
        });
    }
    /**
     * Get verification responses by verification ID
     * @param idVerification ID of the verification
     * @returns Promise with verification responses
     */
    getVerificationsReponsesById(idVerification) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiRequest(`${this.endpointSingleton}/${idVerification}/reponses`, 'GET', null);
        });
    }
    /**
     * Get verification progression data
     * @param site Optional site filter
     * @param metadatas Metadata for filtering
     * @returns Promise with progression data
     */
    getProgression(site, metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                sites: site
            };
            return this.get(`${this.endpoint}/taches/overview`, metadatas, query);
        });
    }
    /**
     * Get verification equipment tasks
     * @param metadatas Metadata for filtering
     * @returns Promise with equipment tasks data
     */
    getVerificationsEquipementsTaches(metadatas) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                typeTache: metadatas.filterExist("type_tache") ? metadatas.getFilterValue("type_tache") : null
            };
            return this.get(`${this.endpoint}/equipements/taches/state`, metadatas, query);
        });
    }
    /**
     * Get task state for unchecked items
     * @param tacheId Task ID
     * @param site Optional site filter
     * @param metadatas Metadata for filtering
     * @returns Promise with task state data
     */
    getTacheState(tacheId_1) {
        return __awaiter(this, arguments, void 0, function* (tacheId, site = null, metadatas = new Metadatas_1.Metadatas()) {
            const query = {
                sites: site
            };
            return this.get(`${this.endpoint}/tache/${tacheId}/unchecked`, metadatas, query);
        });
    }
    /**
     * Get verification calendar events
     * @param metadatas Metadata for filtering
     * @returns Promise with calendar events
     */
    getCalendarEvents() {
        return __awaiter(this, arguments, void 0, function* (metadatas = new Metadatas_1.Metadatas()) {
            const verifications = yield this.getVerifications(metadatas);
            return this.formatToCalendarEvents(verifications.datas || []);
        });
    }
    /**
     * Format verifications to calendar events
     * @param verifications Array of verifications to format
     * @returns Array of calendar events
     */
    formatToCalendarEvents(verifications) {
        return verifications.map((verification, index) => ({
            id: index,
            calendarId: "verification-interne",
            start: verification.dateVerif || '',
            end: verification.dateVerif || '',
            isAllDay: false,
            category: "time",
            raw: verification
        }));
    }
    /**
     * Get PDF file for a verification
     * @param idVerification ID of the verification
     * @returns Promise with PDF data
     */
    getPdfFile(idVerification) {
        return __awaiter(this, void 0, void 0, function* () {
            // Note: In a real implementation, we would need to handle the PDF processing
            // that's done in the Vue mixin, but for this SDK we'll just return the raw response
            // Since we can't directly set response type options in the current implementation,
            // we'll just make the request and let the client handle the blob conversion
            return this.apiRequest(`${this.endpointSingleton}/export/${idVerification}/S`, 'GET', null);
        });
    }
    /**
     * Export recurring task history
     * @param metadatas Metadata for filtering
     * @param fileExtension File extension (xlsx or csv)
     * @param site Optional site filter
     * @returns Promise with export data
     */
    exportHistoriqueTacheRecurrentes(metadatas_1) {
        return __awaiter(this, arguments, void 0, function* (metadatas, fileExtension = "xlsx", site = null) {
            const fileType = fileExtension !== "csv" ? "excel" : "csv";
            // Create query parameters
            const query = {
                sites: site,
                fileType: fileType
            };
            // Since we can't directly set response type options in the current implementation,
            // we'll just make the request and let the client handle the blob conversion
            return this.get(`${this.endpoint}/export/historique-taches-recurrente/${fileType}`, metadatas, query);
        });
    }
}
exports.Verifications = Verifications;
