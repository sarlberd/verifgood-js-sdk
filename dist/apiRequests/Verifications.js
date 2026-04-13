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
     * Get a single verification by ID with responses, account context, and logs
     * @param id Verification ID
     * @returns Promise with verification details, reponses, account, and logs
     */
    async getVerification(id) {
        return this.apiRequest(`${this.endpointSingleton}/${id}`, 'GET', null);
    }
    /**
     * Update a verification record
     * @param id Verification ID
     * @param data Verification update payload (dateVerif, commentaire, nbNonConformites, spentTime, username, documents, reponses)
     * @returns Promise with updated verification
     */
    async updateVerification(id, data) {
        return this.put(`${this.endpointSingleton}/${id}`, { datas: data });
    }
    /**
     * Get equipments that must be verified with their tasks and latest verifications
     * @param metadatas Metadatas for filtering
     * @param options Optional filters: sites, typeTache, qrCode
     * @returns Promise with equipements, taches, verifications, and counters
     */
    async getCheckDatas(metadatas, options = {}) {
        const query = {};
        if (options.sites)
            query.sites = options.sites;
        if (options.typeTache)
            query.typeTache = options.typeTache;
        if (options.qrCode)
            query.qrCode = options.qrCode;
        return this.get('/api/check-datas', metadatas, query);
    }
    async getTimeline(verificationId) {
        const metadatas = new Metadatas_1.Metadatas();
        const response = await this.get(`${this.endpointSingleton}/${verificationId}/timeline`, metadatas, {});
        return response;
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
     * Get progressions of taches (task completion tracking)
     * @param metadatas Metadatas for filtering
     * @param sites Optional sites filter
     * @returns Promise with progressions data and metadatas
     */
    async getProgressionsTaches(metadatas, sites = null) {
        const query = {};
        if (sites)
            query.sites = sites;
        return this.get('/api/progressionstaches', metadatas, query);
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