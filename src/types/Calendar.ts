/**
 * Service for managing calendar events - Type definitions
 */
export interface Calenda {
    start?: string;
    end?: string;
    sites?: string;
    idTiers?: string;
    affectes?: string[];
}

/**
 * Request interface for creating Calenda
 */
export interface CalendaCreateRequest {
    start?: string;
    end?: string;
    sites?: string;
    idTiers?: string;
    affectes?: string[];
}

/**
 * Request interface for updating Calenda
 */
export interface CalendaUpdateRequest {
    start?: string;
    end?: string;
    sites?: string;
    idTiers?: string;
    affectes?: string[];
}

/**
 * Calendar event interface
 */
export interface CalendarEvent {
    calendarId: string;
    category: string;
    start: string;
    end: string;
    id: number;
    isAllDay: boolean;
    raw: any;
}

/**
 * Raw event data from API
 */
export interface RawEventData {
    type: string;
    start: string;
    end: string;
    data: {
        id: number;
        [key: string]: any;
    };
}

/**
 * Calendar events response
 */
export interface CalendarEventsResponse {
    events: CalendarEvent[];
    metadatas: any;
}
