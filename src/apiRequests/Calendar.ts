import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Calenda, CalendaCreateRequest, CalendaUpdateRequest, CalendarEvent, CalendarEventsResponse, RawEventData } from "../types/Calendar";

/**
 * Calendar API request class
 * Service for managing calendar events
 */
export class Calendar extends ApiRequest {
  endpoint: string = '/api/calendars';
  endpointSingleton: string = '/api/calendars';

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
  async getEvents(
    start?: string, 
    end?: string, 
    sites?: string, 
    idTiers?: string, 
    affectes?: string[], 
    metadatas?: Metadatas
  ): Promise<CalendarEventsResponse> {
    const requestMetadatas = metadatas || new Metadatas();
    
    if (start) requestMetadatas.setFilter('start', start);
    if (end) requestMetadatas.setFilter('end', end);
    if (sites && sites !== "") requestMetadatas.setFilter('sites', sites);
    if (idTiers && idTiers !== "") requestMetadatas.setFilter('idTiers', idTiers);
    if (affectes && affectes.length > 0) requestMetadatas.setFilter('affectes', affectes.join(','));

    const response = await this.get('/api/calendars/events', requestMetadatas, {});
    
    return {
      events: this.formatEvents(response),
      metadatas: response.metadatas
    };
  }

  /**
   * Format events data for calendar display
   * @param events Raw events data from API
   * @returns Formatted events array
   */
  formatEvents(events: any): CalendarEvent[] {
    let formatedEvents: CalendarEvent[] = [];
    let typesEvents = Object.keys(events);
    
    typesEvents.forEach((type) => {
      events[type].forEach((event: RawEventData) => {
        formatedEvents.push({
          calendarId: event.type,
          category: "time",
          start: event.start,
          end: event.end,
          id: event.data.id,
          isAllDay: false,
          raw: event.data
        });
      });
    });
    
    return formatedEvents;
  }
}
