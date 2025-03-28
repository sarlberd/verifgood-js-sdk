import { Metadatas } from "../core/Metadatas";
import { ApiRequest } from "../core/ApiRequest";
/**
 * Interface for verification data
 */
export interface Verification {
    id?: number;
    dateVerif?: string;
    [key: string]: any;
}
/**
 * Interface for verification response data
 */
export interface VerificationResponse {
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
export declare class Verifications extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Create new verifications
     * @param verifications Array of verification data to create
     * @returns Promise with the created verifications
     */
    createVerifications(verifications: any[]): Promise<any>;
    /**
     * Start a verification process for an equipment
     * @param equipementId ID of the equipment to verify
     * @param tacheId Optional task ID
     * @param uniquementMesTachesAffectes Whether to only include tasks assigned to the current user
     * @returns Promise with verification data
     */
    startVerification(equipementId: number, tacheId?: number, uniquementMesTachesAffectes?: boolean): Promise<any>;
    /**
     * Get verifications with metadata filtering
     * @param metadatas Metadata for filtering
     * @returns Promise with verification data
     */
    getVerifications(metadatas: Metadatas): Promise<any>;
    /**
     * Get non-conforming verification responses
     * @param metadatas Metadata for filtering
     * @returns Promise with non-conforming responses
     */
    getVerificationsReponsesNonConformes(metadatas: Metadatas): Promise<any>;
    /**
     * Get verification responses by verification ID
     * @param idVerification ID of the verification
     * @returns Promise with verification responses
     */
    getVerificationsReponsesById(idVerification: number): Promise<any>;
    /**
     * Get verification progression data
     * @param site Optional site filter
     * @param metadatas Metadata for filtering
     * @returns Promise with progression data
     */
    getProgression(site: string | null, metadatas: Metadatas): Promise<any>;
    /**
     * Get verification equipment tasks
     * @param metadatas Metadata for filtering
     * @returns Promise with equipment tasks data
     */
    getVerificationsEquipementsTaches(metadatas: Metadatas): Promise<any>;
    /**
     * Get task state for unchecked items
     * @param tacheId Task ID
     * @param site Optional site filter
     * @param metadatas Metadata for filtering
     * @returns Promise with task state data
     */
    getTacheState(tacheId: number, site?: string | null, metadatas?: Metadatas): Promise<any>;
    /**
     * Get verification calendar events
     * @param metadatas Metadata for filtering
     * @returns Promise with calendar events
     */
    getCalendarEvents(metadatas?: Metadatas): Promise<CalendarEvent[]>;
    /**
     * Format verifications to calendar events
     * @param verifications Array of verifications to format
     * @returns Array of calendar events
     */
    private formatToCalendarEvents;
    /**
     * Get PDF file for a verification
     * @param idVerification ID of the verification
     * @returns Promise with PDF data
     */
    getPdfFile(idVerification: number): Promise<any>;
    /**
     * Export recurring task history
     * @param metadatas Metadata for filtering
     * @param fileExtension File extension (xlsx or csv)
     * @param site Optional site filter
     * @returns Promise with export data
     */
    exportHistoriqueTacheRecurrentes(metadatas: Metadatas, fileExtension?: string, site?: string | null): Promise<any>;
}
