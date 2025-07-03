import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { CalendarEvent, CalendarEventsResponse } from "../types/Calendar";
/**
 * Calendar API request class
 * Service for managing calendar events
 */
export declare class Calendar extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get calendar events with filtering options
     * @param start Start date
     * @param end End date
     * @param sites Sites filter
     * @param idTiers Tiers ID filter
     * @param affectes Affectes filter
     * @param metadatas Metadatas for the request
     * @returns Promise with formatted events and metadatas
     */
    getEvents(start?: string, end?: string, sites?: string, idTiers?: string, affectes?: string[], metadatas?: Metadatas): Promise<CalendarEventsResponse>;
    /**
     * Format events data for calendar display
     * @param events Raw events data from API
     * @returns Formatted events array
     */
    formatEvents(events: any): CalendarEvent[];
}
