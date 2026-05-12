"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Maintenance API request class
 * Service for managing maintenance requests and operations
 */
class Maintenance extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/maintenances';
        this.endpointSingleton = '/api/maintenance';
    }
    /**
     * Build the userId / sites query pair the backend requires on most
     * maintenance endpoints. The legacy app encodes "no site restriction"
     * as the literal string "null", and the backend crashes if `sites` is
     * absent — so we always emit a value.
     */
    appContextQuery() {
        var _a;
        const ctx = this.auth.getAppContext();
        const query = {
            sites: (_a = ctx.restrictionsite) !== null && _a !== void 0 ? _a : "null",
        };
        if (ctx.appID)
            query.userId = ctx.appID;
        return query;
    }
    appContext() {
        return this.auth.getAppContext();
    }
    /**
     * GET maintenances liste with custom options
     * @param metadatas - Metadatas for filtering
     * @param options - Additional options for the request
     */
    getMaintenances(metadatas, options = { _stored: true, idUserAffecte: null, idTiersAffecte: null, onlyEncours: true, onlyNonAffectes: false }) {
        const query = {
            ...this.appContextQuery(),
            onlyEncours: options.onlyEncours,
        };
        if (options.idUserAffecte)
            query.user = options.idUserAffecte;
        if (options.idTiersAffecte)
            query.tiers_id = options.idTiersAffecte;
        if (options.onlyNonAffectes)
            query.onlyNonAffectes = options.onlyNonAffectes;
        // Metadata-driven query overrides — these used to live in the mixin.
        if (metadatas.filterExist("tiers_id")) {
            query.tiers_id = metadatas.getFilterValue("tiers_id");
            metadatas.deleteFilter("tiers_id");
        }
        if (metadatas.filterExist("mesAffectations")) {
            const mesAffectations = metadatas.getFilterValue("mesAffectations");
            if (mesAffectations) {
                query.user = mesAffectations;
                metadatas.deleteFilter("mesAffectations");
            }
        }
        // Sous-traitants are scoped to their tiers_id regardless of caller.
        const ctx = this.appContext();
        if (ctx.role === "ROLE_SOUS_TRAITANT" && ctx.tiers_id != null) {
            query.tiers_id = ctx.tiers_id;
        }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * GET maintenances qui me sont planifiées
     * @param metadatas - Metadatas for filtering
     */
    getMesMaintenancesPlanifiees(metadatas) {
        const query = { ...this.appContextQuery() };
        if (metadatas.filterExist("tiers_id")) {
            query.tiers_id = metadatas.getFilterValue("tiers_id");
            metadatas.deleteFilter("tiers_id");
        }
        if (metadatas.filterExist("mesAffectations")) {
            const mesAffectations = metadatas.getFilterValue("mesAffectations");
            if (mesAffectations) {
                query.user = mesAffectations;
                metadatas.deleteFilter("mesAffectations");
            }
        }
        const ctx = this.appContext();
        if (ctx.role === "ROLE_SOUS_TRAITANT" && ctx.tiers_id != null) {
            query.tiers_id = ctx.tiers_id;
        }
        return this.get(`${this.endpoint}/mes-planifiees`, metadatas, query);
    }
    /**
     * GET demandeurs liste
     * @param metadatas - Metadatas for filtering
     * @param options - Additional options
     */
    getDemandeurs(metadatas, _options = { _stored: true }) {
        const query = { ...this.appContextQuery() };
        const ctx = this.appContext();
        if (ctx.role === "ROLE_SOUS_TRAITANT" && ctx.tiers_id != null) {
            query.tiers_id = ctx.tiers_id;
        }
        return this.get(`${this.endpoint}/demandeurs`, metadatas, query);
    }
    /**
     * Create multiple maintenances
     * @param maintenances - Array of maintenance objects to create
     * @param options - Additional options
     */
    createMaintenances(maintenances, _options = { _stored: true }) {
        return this.postWithUserId(this.endpoint, maintenances);
    }
    /**
     * Demande de devis on maintenance id
     * @param maintenanceId - ID of the maintenance
     * @param payload - Request payload
     */
    demandeDevis(maintenanceId, payload) {
        return this.post(`${this.endpointSingleton}/${maintenanceId}/demande-devis`, payload);
    }
    /**
     * Delete multiple maintenances
     * @param maintenances - Array of maintenance objects to delete
     */
    deleteMultiple(maintenances) {
        return this.apiRequest(`${this.endpoint}/delete-multiple`, 'DELETE', maintenances);
    }
    /**
     * Relancer maintenance
     * @param maintenance - Maintenance object to relancer
     * @param commentaire - Optional comment
     */
    relancer(maintenance, commentaire) {
        const ctx = this.appContext();
        const data = {
            id: maintenance.id,
            dateRelance: nowDateTime(),
            commentaire,
        };
        if (ctx.appID)
            data.userId = ctx.appID;
        if (ctx.idUser != null)
            data.idUser = ctx.idUser;
        return this.put(`${this.endpointSingleton}/${maintenance.id}/relance`, data);
    }
    /**
     * Create operation on maintenance
     * @param idMaintenance - ID of the maintenance
     * @param operations - Array of operations
     */
    postMaintenanceOperations(idMaintenance, operations) {
        return this.post(`${this.endpointSingleton}/${idMaintenance}/operations`, { datas: operations });
    }
    /**
     * Create operations
     * @param operations - Array of operations
     */
    postOperations(operations) {
        return this.post('/api/operations', { datas: operations });
    }
    /**
     * Update operation
     * @param operation - Operation object to update
     */
    putOperation(operation) {
        const ctx = this.appContext();
        const data = {
            datas: {
                ...operation,
                ...(ctx.appID ? { userId: ctx.appID } : {}),
            },
        };
        return this.put(`/api/operation/${operation.id}`, data);
    }
    /**
     * Delete operation
     * @param idOperation - ID of the operation
     * @param operation - Operation object for uid
     */
    deleteOperation(idOperation, operation) {
        const url = this.appendUserId(`/api/operation/${idOperation}`);
        return this.apiRequest(url, "DELETE", { datas: { id: idOperation, uid: operation.uid } });
    }
    /**
     * Get calendar events (deprecated)
     * @deprecated
     * @param metadatas - Metadatas for filtering
     */
    getCalendarEvents(metadatas) {
        return this.getMaintenances(metadatas, { _stored: false }).then((response) => this.formatToCalendarEvents(response.datas));
    }
    /**
     * Format maintenances to calendar events (deprecated)
     * @deprecated
     * @param maintenances - Array of maintenance objects
     */
    formatToCalendarEvents(maintenances) {
        const events = [];
        maintenances.forEach((m, index) => {
            events.push({
                id: index,
                calendarId: "ouverture",
                start: m.dateOuvertureSAV,
                end: m.dateOuvertureSAV,
                isAllDay: false,
                category: "time",
                raw: m,
            });
            if (m.statut === "Resolue") {
                events.push({
                    id: index,
                    calendarId: "fermeture",
                    start: m.dateFermetureSAV,
                    end: m.dateFermetureSAV,
                    isAllDay: false,
                    category: "time",
                    raw: m,
                });
            }
            const aff = m.affectation;
            if (aff && aff.id && aff.start && aff.end) {
                events.push({
                    id: index,
                    calendarId: "affectation",
                    start: aff.start,
                    end: aff.end,
                    isAllDay: false,
                    category: "time",
                    raw: m,
                });
            }
        });
        return events;
    }
    /**
     * Prendre en compte maintenances
     * @param maintenances - Array of maintenance objects
     */
    prendreEnCompteMaintenances(maintenances) {
        const data = { datas: maintenances, dateOperation: nowDateTime() };
        return this.put(this.appendUserId(`${this.endpoint}/prendre-en-compte`), data);
    }
    /**
     * Prendre en compte maintenance
     * @param maintenance - Maintenance object
     */
    prendreEnCompteMaintenance(maintenance) {
        const data = { datas: maintenance, dateOperation: nowDateTime() };
        return this.put(this.appendUserId(`${this.endpointSingleton}/${maintenance.id}/prendre-en-compte`), data);
    }
    /**
     * Mettre en attente maintenances
     * @param maintenances - Array of maintenance objects
     */
    mettreEnAttenteMaintenances(maintenances) {
        const data = { datas: maintenances, dateOperation: nowDateTime() };
        return this.put(this.appendUserId(`${this.endpoint}/mettre-en-attente`), data);
    }
    /**
     * Mettre en attente maintenance
     * @param maintenance - Maintenance object
     */
    mettreEnAttenteMaintenance(maintenance) {
        const data = { datas: maintenance, dateOperation: nowDateTime() };
        return this.put(this.appendUserId(`${this.endpointSingleton}/${maintenance.id}/mettre-en-attente`), data);
    }
    /**
     * Cloture maintenances
     * @param maintenances - Array of maintenance objects
     * @param rapportCloture - Optional rapport de cloture
     */
    resolveMaintenances(maintenances, rapportCloture) {
        const ctx = this.appContext();
        const now = nowDateTime();
        const normalized = maintenances.map((m) => ({
            id: m.id,
            dateFermetureSAV: now,
            rapportCloture: rapportCloture !== null && rapportCloture !== void 0 ? rapportCloture : m.operation,
            ...(ctx.idUser != null ? { idUser: ctx.idUser } : {}),
        }));
        return this.put(this.appendUserId(`${this.endpoint}/resolve`), normalized);
    }
    /**
     * Cloture maintenance
     * @param maintenance - Maintenance object
     * @param files - Optional files array
     */
    resolveMaintenance(maintenance, files) {
        const ctx = this.appContext();
        const underSupervisor = ctx.underSupervisor === true;
        const normalized = {
            ...maintenance,
            dateFermetureSAV: nowDateTime(),
            statut: underSupervisor ? "Supervisor" : "Resolue",
            ...(ctx.appID ? { userId: ctx.appID } : {}),
            ...(ctx.idUser != null ? { idUser: ctx.idUser } : {}),
        };
        return this.put(this.appendUserId(`${this.endpointSingleton}/${maintenance.id}/resolve`), { maintenance: normalized, files });
    }
    /**
     * Reopen maintenances
     * @param maintenanceId - ID of the maintenance
     */
    reopenMaintenances(maintenanceId) {
        const ctx = this.appContext();
        const body = { id: maintenanceId, date: nowDateTime() };
        if (ctx.idUser != null)
            body.idUser = ctx.idUser;
        return this.put(this.appendUserId(`${this.endpointSingleton}/${maintenanceId}/reopen`), body);
    }
    /**
     * Set status maintenances
     * @param maintenances - Array of maintenance objects
     * @param status - New status
     */
    setStatusMaintenances(maintenances, status) {
        const ctx = this.appContext();
        const now = nowDateTime();
        const normalized = maintenances.map((m) => ({
            id: m.id,
            date: now,
            ...(ctx.idUser != null ? { idUser: ctx.idUser } : {}),
        }));
        return this.put(this.appendUserId(`${this.endpoint}/status/${status}`), normalized);
    }
    /**
     * Download file (CSV or Excel)
     * @param metadatas - Metadatas for filtering
     * @param filename - Optional filename
     * @param fileExtension - File extension (csv or xlsx)
     */
    getFile(metadatas, _filename, fileExtension = "xlsx") {
        metadatas.setDirectives([]);
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        const query = { ...this.appContextQuery() };
        return this.get(`${this.endpoint}/export/${fileType}`, metadatas, query);
    }
    /**
     * Download PDF file
     * @param idMaintenance - ID of the maintenance
     * @param filename - Optional filename
     * @param fileExtension - File extension
     */
    getPdfFile(idMaintenance, _filename, _fileExtension = "pdf") {
        return this.apiRequest(`${this.endpointSingleton}/${idMaintenance}/export/pdf/S`, 'GET', null);
    }
    /**
     * Calculate internal cost (uses tauxHoraire from app context).
     * @param workingTime - Working time in minutes
     */
    coutInterne(workingTime) {
        const ctx = this.appContext();
        const rate = typeof ctx.tauxHoraire === "number" ? ctx.tauxHoraire : 0;
        const hours = parseInt(workingTime, 10) / 60;
        return Number.parseFloat((rate * hours).toFixed(2));
    }
    /**
     * Calculate duration mise en attente
     * @param maintenance - Maintenance object
     */
    dureeMiseEnAttente(_maintenance) {
        // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
        return 0;
    }
    /**
     * Calculate duration fermeture temporaire hors weekend
     * @param maintenance - Maintenance object
     */
    dureeFermetureTemporaireHorsWeekend(_maintenance) {
        // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
        return 0;
    }
    /**
     * Calculate duration nette traitement
     * @param maintenance - Maintenance object
     */
    dureeNetteTraitement(_maintenance) {
        // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
        return 0;
    }
    /**
     * Update multiple typologies
     * @param maintenanceIds - Array of maintenance IDs
     * @param typologyName - Typology name
     */
    updateMultipleTypologies(maintenanceIds, typologyName) {
        const ctx = this.appContext();
        const data = { ids: maintenanceIds, typologie: typologyName };
        if (ctx.appID)
            data.userId = ctx.appID;
        return this.put(`${this.endpoint}/update-typologies`, data);
    }
    // --- internal helpers -------------------------------------------------
    /** Append `?userId=<appID>` (or `&userId=…`) to a URL when known. */
    appendUserId(url) {
        const ctx = this.appContext();
        if (!ctx.appID)
            return url;
        const sep = url.includes("?") ? "&" : "?";
        return `${url}${sep}userId=${encodeURIComponent(ctx.appID)}`;
    }
    /** POST with the userId query param appended (legacy createMaintenances shape). */
    postWithUserId(endpoint, body) {
        return this.post(this.appendUserId(endpoint), body);
    }
}
exports.Maintenance = Maintenance;
/** YYYY-MM-DD HH:mm:ss in local time, mirroring the legacy `moment().format(…)`. */
function nowDateTime() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
//# sourceMappingURL=Maintenance.js.map