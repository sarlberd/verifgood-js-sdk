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
    async getEvents(start, end, sites, idTiers, affectes, metadatas, restrictedEventsTypes) {
        var _a;
        const requestMetadatas = metadatas || new Metadatas_1.Metadatas();
        const query = {};
        if (start)
            query.start = start;
        if (end)
            query.end = end;
        if (sites && sites !== "")
            query.sites = sites;
        if (idTiers && idTiers !== "")
            query.idTiers = idTiers;
        if (affectes && affectes.length > 0)
            query.affectes = affectes;
        if (restrictedEventsTypes && restrictedEventsTypes.length > 0)
            query.restrictedEventsTypes = restrictedEventsTypes;
        const response = await this.get('/api/calendars/events/new', requestMetadatas, query);
        return {
            events: response.datas || {},
            taches: ((_a = response.datas) === null || _a === void 0 ? void 0 : _a.taches) || null,
            metadatas: response.metadatas
        };
    }
}
exports.Calendar = Calendar;
//# sourceMappingURL=Calendar.js.map