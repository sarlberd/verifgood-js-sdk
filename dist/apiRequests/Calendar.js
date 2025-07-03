"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Calendar API request class
 * Service for managing calendar events
 */
class Calendar extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/calendars';
        this.endpointSingleton = '/api/calendars';
    }
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
    async getEvents(start, end, sites, idTiers, affectes, metadatas) {
        const requestMetadatas = metadatas || new Metadatas_1.Metadatas();
        if (start)
            requestMetadatas.setFilter('start', start);
        if (end)
            requestMetadatas.setFilter('end', end);
        if (sites && sites !== "")
            requestMetadatas.setFilter('sites', sites);
        if (idTiers && idTiers !== "")
            requestMetadatas.setFilter('idTiers', idTiers);
        if (affectes && affectes.length > 0)
            requestMetadatas.setFilter('affectes', affectes.join(','));
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
    formatEvents(events) {
        let formatedEvents = [];
        let typesEvents = Object.keys(events);
        typesEvents.forEach((type) => {
            events[type].forEach((event) => {
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
exports.Calendar = Calendar;
//# sourceMappingURL=Calendar.js.map