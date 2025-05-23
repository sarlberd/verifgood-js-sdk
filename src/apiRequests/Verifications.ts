import { Metadatas } from "../core/Metadatas";
import { ApiRequest } from "../core/ApiRequest";

/**
 * Interface for verification data
 */
export interface Verification {
    id?: number;
    dateVerif?: string;
    // Add other verification properties as needed
    [key: string]: any;
}

/**
 * Interface for verification response data
 */
export interface VerificationResponse {
    // Add verification response properties as needed
    [key: string]: any;
}

/**
 * Interface for calendar event data
 */
export interface CalendarEvent {
    id: number;
    calendarId: string;
    start: string;
    end: string;
    isAllDay: boolean;
    category: string;
    raw: Verification;
}

/**
 * Interface for progression data
 */
export interface ProgressionData {
    datas: any[];
    metadatas: any;
}

/**
 * Verifications API request class
 * Provides methods for interacting with verification-related endpoints
 */
export class Verifications extends ApiRequest {
    endpoint: string = '/api/verifications';
    endpointSingleton: string = '/api/verification';

    /**
     * Create new verifications
     * @param verifications Array of verification data to create
     * @returns Promise with the created verifications
     */
    async createVerifications(verifications: any[]): Promise<any> {
        return this.post(this.endpoint, { datas: verifications });
    }

    /**
     * Start a verification process for an equipment
     * @param equipementId ID of the equipment to verify
     * @param tacheId Optional task ID
     * @param uniquementMesTachesAffectes Whether to only include tasks assigned to the current user
     * @returns Promise with verification data
     */
    async startVerification(equipementId: number, tacheId?: number, uniquementMesTachesAffectes: boolean = false): Promise<any> {
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
    async getVerifications(metadatas: Metadatas): Promise<any> {
        return this.get(this.endpoint, metadatas, {});
    }

    /**
     * Get non-conforming verification responses
     * @param metadatas Metadata for filtering
     * @returns Promise with non-conforming responses
     */
    async getVerificationsReponsesNonConformes(metadatas: Metadatas): Promise<any> {
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
    async getVerificationsReponsesById(idVerification: number): Promise<any> {
        return this.apiRequest(`${this.endpointSingleton}/${idVerification}/reponses`, 'GET', null);
    }

    /**
     * Get verification progression data
     * @param site Optional site filter
     * @param metadatas Metadata for filtering
     * @returns Promise with progression data
     */
    async getProgression(site: string | null, metadatas: Metadatas): Promise<any> {
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
    async getVerificationsEquipementsTaches(metadatas: Metadatas): Promise<any> {
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
    async getTacheState(tacheId: number, site: string | null = null, metadatas: Metadatas = new Metadatas()): Promise<any> {
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
    async getCalendarEvents(metadatas: Metadatas = new Metadatas()): Promise<CalendarEvent[]> {
        const verifications = await this.getVerifications(metadatas);
        return this.formatToCalendarEvents(verifications.datas || []);
    }

    /**
     * Format verifications to calendar events
     * @param verifications Array of verifications to format
     * @returns Array of calendar events
     */
    private formatToCalendarEvents(verifications: Verification[]): CalendarEvent[] {
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
    async getPdfFile(idVerification: number): Promise<any> {
        // Note: In a real implementation, we would need to handle the PDF processing
        // that's done in the Vue mixin, but for this SDK we'll just return the raw response
        // Since we can't directly set response type options in the current implementation,
        // we'll just make the request and let the client handle the blob conversion
        return this.apiRequest(`${this.endpointSingleton}/export/${idVerification}/S`, 'GET', null);
    }

    /**
     * Export recurring task history
     * @param metadatas Metadata for filtering
     * @param fileExtension File extension (xlsx or csv)
     * @param site Optional site filter
     * @returns Promise with export data
     */
    async exportHistoriqueTacheRecurrentes(metadatas: Metadatas, fileExtension: string = "xlsx", site: string | null = null): Promise<any> {
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        
        // Create query parameters
        const query = {
            sites: site,
            fileType: fileType
        };
        
        // Since we can't directly set response type options in the current implementation,
        // we'll just make the request and let the client handle the blob conversion
        return this.get(`${this.endpoint}/export/historique-taches-recurrente/${fileType}`, metadatas, query);
    }
}
