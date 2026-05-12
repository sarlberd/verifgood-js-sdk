import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { CalendarEventsNewResponse } from "../types/Calendar";
/**
 * Calendar API request class
 * Service for managing calendar events
 */
export declare class Calendar extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get calendar events with filtering options.
     * Uses the /calendars/events/new endpoint which returns taches raw data
     * for client-side session generation, fiches curatives, and interventions.
     *
     * @param start Start date (YYYY-MM-DD)
     * @param end End date (YYYY-MM-DD)
     * @param sites Sites filter (pipe-separated paths, e.g. "Site-A|Site-B")
     * @param idTiers Tiers ID filter
     * @param affectes Affectes filter (array of user IDs)
     * @param metadatas Metadatas for the request
     * @param restrictedEventsTypes Filter by event types (e.g. ["maintenance-affectation","intervention-programmee","taches"])
     * @returns Promise with calendar events and taches data
     */
    getEvents(start?: string, end?: string, sites?: string, idTiers?: string, affectes?: string[], metadatas?: Metadatas, restrictedEventsTypes?: string[]): Promise<CalendarEventsNewResponse>;
}
