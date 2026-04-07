import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { CalendarEventsResponse, CalendarEventsNewResponse } from "../types/Calendar";

/**
 * Calendar API request class
 * Service for managing calendar events
 */
export class Calendar extends ApiRequest {
  endpoint: string = '/api/calendars';
  endpointSingleton: string = '/api/calendars';

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
  async getEvents(
    start?: string,
    end?: string,
    sites?: string,
    idTiers?: string,
    affectes?: string[],
    metadatas?: Metadatas,
    restrictedEventsTypes?: string[]
  ): Promise<CalendarEventsNewResponse> {
    const requestMetadatas = metadatas || new Metadatas();

    const query: { [key: string]: any } = {};
    if (start) query.start = start;
    if (end) query.end = end;
    if (sites && sites !== "") query.sites = sites;
    if (idTiers && idTiers !== "") query.idTiers = idTiers;
    if (affectes && affectes.length > 0) query.affectes = affectes;
    if (restrictedEventsTypes && restrictedEventsTypes.length > 0) query.restrictedEventsTypes = restrictedEventsTypes;

    const response = await this.get('/api/calendars/events/new', requestMetadatas, query);

    return {
      events: response.datas || {},
      taches: response.datas?.taches || null,
      metadatas: response.metadatas
    };
  }
}
