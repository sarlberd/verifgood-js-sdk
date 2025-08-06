"use strict";
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
    async createVerifications(verifications) {
        return this.post(this.endpoint, { datas: verifications });
    }
    /**
     * Start a verification process for an equipment
     * @param equipementId ID of the equipment to verify
     * @param tacheId Optional task ID
     * @param uniquementMesTachesAffectes Whether to only include tasks assigned to the current user
     * @returns Promise with verification data
     */
    async startVerification(equipementId, tacheId, uniquementMesTachesAffectes = false) {
        let ressource = uniquementMesTachesAffectes ? "mes-taches" : "taches";
        let endpoint = `/api/verifier/equipement/${equipementId}/${ressource}`;
        if (tacheId) {
            endpoint += `/${tacheId}`;
        }
        return this.apiRequest(endpoint, 'GET', null);
    }
    /**
     * Get verifications with metadata filtering
     * @param metadatas Metadata for filtering
     * @returns Promise with verification data
     */
    async getVerifications(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    /**
     * Get non-conforming verification responses
     * @param metadatas Metadata for filtering
     * @returns Promise with non-conforming responses
     */
    async getVerificationsReponsesNonConformes(metadatas) {
        const query = {
            isNonConforme: true
        };
        return this.get(`${this.endpoint}/reponses`, metadatas, query);
    }
    /**
     * Get verification responses by verification ID
     * @param idVerification ID of the verification
     * @returns Promise with verification responses
     */
    async getVerificationsReponsesById(idVerification) {
        return this.apiRequest(`${this.endpointSingleton}/${idVerification}/reponses`, 'GET', null);
    }
    /**
     * Get verification progression data
     * @param site Optional site filter
     * @param metadatas Metadata for filtering
     * @returns Promise with progression data
     */
    async getProgression(site, metadatas) {
        const query = {
            sites: site
        };
        return this.get(`${this.endpoint}/taches/overview`, metadatas, query);
    }
    /**
     * Get verification equipment tasks
     * @param metadatas Metadata for filtering
     * @returns Promise with equipment tasks data
     */
    async getVerificationsEquipementsTaches(metadatas) {
        const query = {
            typeTache: metadatas.filterExist("type_tache") ? metadatas.getFilterValue("type_tache") : null
        };
        return this.get(`${this.endpoint}/equipements/taches/state`, metadatas, query);
    }
    /**
     * Get task state for unchecked items
     * @param tacheId Task ID
     * @param site Optional site filter
     * @param metadatas Metadata for filtering
     * @returns Promise with task state data
     */
    async getTacheState(tacheId, site = null, metadatas = new Metadatas_1.Metadatas()) {
        const query = {
            sites: site
        };
        return this.get(`${this.endpoint}/tache/${tacheId}/unchecked`, metadatas, query);
    }
    /**
     * Get verification calendar events
     * @param metadatas Metadata for filtering
     * @returns Promise with calendar events
     */
    async getCalendarEvents(metadatas = new Metadatas_1.Metadatas()) {
        const verifications = await this.getVerifications(metadatas);
        return this.formatToCalendarEvents(verifications.datas || []);
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
    async getPdfFile(idVerification) {
        // Note: In a real implementation, we would need to handle the PDF processing
        // that's done in the Vue mixin, but for this SDK we'll just return the raw response
        // Since we can't directly set response type options in the current implementation,
        // we'll just make the request and let the client handle the blob conversion
        return this.apiRequest(`${this.endpointSingleton}/export/${idVerification}/S`, 'GET', null);
    }
    /**
     * Add document verification
     * @param verificationId ID of the verification
     * @param file File to upload for verification
     * @returns Promise with the response
     */
    async addDocumentVerification(verificationId, file) {
        const formData = new FormData();
        formData.append('datas', file);
        return this.apiRequestFormData(`${this.endpointSingleton}/${verificationId}/document/new`, 'POST', formData);
    }
    /**
     * API request with form data support
     * @param endpoint API endpoint
     * @param method HTTP method
     * @param formData Form data to send
     * @returns Promise with response data
     */
    async apiRequestFormData(endpoint, method, formData) {
        try {
            const apiKey = await this.auth.getApiKey();
            const headers = {
                'Authorization': `Bearer ${apiKey}`,
                // Don't set Content-Type for FormData - browser will set it automatically with boundary
            };
            const options = {
                method,
                headers,
                body: formData
            };
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, options);
            const responseText = await response.text();
            if (!response.ok) {
                const error = {
                    status: response.status,
                    statusText: response.statusText,
                    message: responseText
                };
                throw error;
            }
            const responseData = responseText ? JSON.parse(responseText) : {};
            return responseData;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Export recurring task history
     * @param metadatas Metadata for filtering
     * @param fileExtension File extension (xlsx or csv)
     * @param site Optional site filter
     * @returns Promise<Blob> Returns a Blob object for file download
     */
    async exportHistoriqueTacheRecurrentes(metadatas, fileExtension = "xlsx", site = null) {
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        const contentType = fileExtension !== "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";
        // Create query parameters
        const query = {
            sites: site,
            fileType: fileType
        };
        // Get raw response data
        const response = await this.get(`${this.endpoint}/export/historique-taches-recurrente/${fileType}`, metadatas, query);
        // Create blob with proper encoding
        let blob;
        if (fileExtension === "csv") {
            // Add BOM for UTF-8 encoding
            const BOM = "\uFEFF";
            blob = new Blob([BOM + response], { type: contentType });
        }
        else {
            blob = new Blob([response], { type: contentType });
        }
        return blob;
    }
}
exports.Verifications = Verifications;
//# sourceMappingURL=Verifications.js.map