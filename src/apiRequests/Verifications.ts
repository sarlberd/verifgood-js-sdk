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
     * Add document verification
     * @param verificationId ID of the verification
     * @param file File to upload for verification
     * @returns Promise with the response
     */
    async addDocumentVerification(verificationId: number, file: File): Promise<any> {
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
    private async apiRequestFormData(endpoint: string, method: string, formData: FormData): Promise<any> {
        try {
            const apiKey = await this.auth.getApiKey();
            
            const headers: HeadersInit = {
                'Authorization': `Bearer ${apiKey}`,
                // Don't set Content-Type for FormData - browser will set it automatically with boundary
            };

            const options: RequestInit = {
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
        } catch (error) {
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
    async exportHistoriqueTacheRecurrentes(metadatas: Metadatas, fileExtension: string = "xlsx", site: string | null = null): Promise<Blob> {
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
