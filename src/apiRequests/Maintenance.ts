import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { AppContext } from "../core/AppContext";
import { Maintenance as MaintenanceType, MaintenanceCreateRequest } from "../types/Maintenance";

/**
 * Maintenance API request class
 * Service for managing maintenance requests and operations
 */
export class Maintenance extends ApiRequest {
  endpoint: string = '/api/maintenances';
  endpointSingleton: string = '/api/maintenance';

  /**
   * Build the userId / sites query pair the backend requires on most
   * maintenance endpoints. The legacy app encodes "no site restriction"
   * as the literal string "null", and the backend crashes if `sites` is
   * absent — so we always emit a value.
   */
  private appContextQuery(): { userId?: string; sites: string } {
    const ctx = this.auth.getAppContext();
    const query: { userId?: string; sites: string } = {
      sites: ctx.restrictionsite ?? "null",
    };
    if (ctx.appID) query.userId = ctx.appID;
    return query;
  }

  private appContext(): AppContext {
    return this.auth.getAppContext();
  }

  /**
   * GET maintenances liste with custom options
   * @param metadatas - Metadatas for filtering
   * @param options - Additional options for the request
   */
  getMaintenances(metadatas: Metadatas, options: {
    _stored?: boolean;
    idUserAffecte?: string | null;
    idTiersAffecte?: string | null;
    onlyEncours?: boolean;
    onlyNonAffectes?: boolean;
  } = { _stored: true, idUserAffecte: null, idTiersAffecte: null, onlyEncours: true, onlyNonAffectes: false }): Promise<{ datas: MaintenanceType[], metadatas: any }> {
    const query: any = {
      ...this.appContextQuery(),
      onlyEncours: options.onlyEncours,
    };

    if (options.idUserAffecte) query.user = options.idUserAffecte;
    if (options.idTiersAffecte) query.tiers_id = options.idTiersAffecte;
    if (options.onlyNonAffectes) query.onlyNonAffectes = options.onlyNonAffectes;

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
  getMesMaintenancesPlanifiees(metadatas: Metadatas): Promise<{ datas: MaintenanceType[], metadatas: any }> {
    const query: any = { ...this.appContextQuery() };

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
  getDemandeurs(metadatas: Metadatas, _options: { _stored?: boolean } = { _stored: true }): Promise<{ datas: any[], metadatas: any }> {
    const query: any = { ...this.appContextQuery() };
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
  createMaintenances(maintenances: MaintenanceCreateRequest[], _options: { _stored?: boolean } = { _stored: true }): Promise<MaintenanceType[]> {
    return this.postWithUserId(this.endpoint, maintenances);
  }

  /**
   * Demande de devis on maintenance id
   * @param maintenanceId - ID of the maintenance
   * @param payload - Request payload
   */
  demandeDevis(maintenanceId: string, payload: any): Promise<any> {
    return this.post(`${this.endpointSingleton}/${maintenanceId}/demande-devis`, payload);
  }

  /**
   * Delete multiple maintenances
   * @param maintenances - Array of maintenance objects to delete
   */
  deleteMultiple(maintenances: MaintenanceType[]): Promise<any> {
    return this.apiRequest(`${this.endpoint}/delete-multiple`, 'DELETE', maintenances);
  }

  /**
   * Relancer maintenance
   * @param maintenance - Maintenance object to relancer
   * @param commentaire - Optional comment
   */
  relancer(maintenance: MaintenanceType, commentaire?: string | null): Promise<MaintenanceType> {
    const ctx = this.appContext();
    const data: any = {
      id: maintenance.id,
      dateRelance: nowDateTime(),
      commentaire,
    };
    if (ctx.appID) data.userId = ctx.appID;
    if (ctx.idUser != null) data.idUser = ctx.idUser;
    return this.put(`${this.endpointSingleton}/${maintenance.id}/relance`, data);
  }

  /**
   * Create operation on maintenance
   * @param idMaintenance - ID of the maintenance
   * @param operations - Array of operations
   */
  postMaintenanceOperations(idMaintenance: string, operations: any[]): Promise<any> {
    return this.post(`${this.endpointSingleton}/${idMaintenance}/operations`, { datas: operations });
  }

  /**
   * Create operations
   * @param operations - Array of operations
   */
  postOperations(operations: any[]): Promise<any> {
    return this.post('/api/operations', { datas: operations });
  }

  /**
   * Update operation
   * @param operation - Operation object to update
   */
  putOperation(operation: { id: string; [key: string]: any }): Promise<any> {
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
  deleteOperation(idOperation: string, operation: { uid: string }): Promise<any> {
    const url = this.appendUserId(`/api/operation/${idOperation}`);
    return this.apiRequest(url, "DELETE", { datas: { id: idOperation, uid: operation.uid } });
  }

  /**
   * Get calendar events (deprecated)
   * @deprecated
   * @param metadatas - Metadatas for filtering
   */
  getCalendarEvents(metadatas: Metadatas): Promise<any[]> {
    return this.getMaintenances(metadatas, { _stored: false }).then(
      (response) => this.formatToCalendarEvents(response.datas),
    );
  }

  /**
   * Format maintenances to calendar events (deprecated)
   * @deprecated
   * @param maintenances - Array of maintenance objects
   */
  formatToCalendarEvents(maintenances: MaintenanceType[]): any[] {
    const events: any[] = [];
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
      const aff: any = (m as any).affectation;
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
  prendreEnCompteMaintenances(maintenances: MaintenanceType[]): Promise<any> {
    const data = { datas: maintenances, dateOperation: nowDateTime() };
    return this.put(this.appendUserId(`${this.endpoint}/prendre-en-compte`), data);
  }

  /**
   * Prendre en compte maintenance
   * @param maintenance - Maintenance object
   */
  prendreEnCompteMaintenance(maintenance: MaintenanceType): Promise<any> {
    const data = { datas: maintenance, dateOperation: nowDateTime() };
    return this.put(this.appendUserId(`${this.endpointSingleton}/${maintenance.id}/prendre-en-compte`), data);
  }

  /**
   * Mettre en attente maintenances
   * @param maintenances - Array of maintenance objects
   */
  mettreEnAttenteMaintenances(maintenances: MaintenanceType[]): Promise<any> {
    const data = { datas: maintenances, dateOperation: nowDateTime() };
    return this.put(this.appendUserId(`${this.endpoint}/mettre-en-attente`), data);
  }

  /**
   * Mettre en attente maintenance
   * @param maintenance - Maintenance object
   */
  mettreEnAttenteMaintenance(maintenance: MaintenanceType): Promise<any> {
    const data = { datas: maintenance, dateOperation: nowDateTime() };
    return this.put(this.appendUserId(`${this.endpointSingleton}/${maintenance.id}/mettre-en-attente`), data);
  }

  /**
   * Cloture maintenances
   * @param maintenances - Array of maintenance objects
   * @param rapportCloture - Optional rapport de cloture
   */
  resolveMaintenances(maintenances: MaintenanceType[], rapportCloture?: string | null): Promise<any> {
    const ctx = this.appContext();
    const now = nowDateTime();
    const normalized = maintenances.map((m) => ({
      id: m.id,
      dateFermetureSAV: now,
      rapportCloture: rapportCloture ?? (m as any).operation,
      ...(ctx.idUser != null ? { idUser: ctx.idUser } : {}),
    }));
    return this.put(this.appendUserId(`${this.endpoint}/resolve`), normalized);
  }

  /**
   * Cloture maintenance
   * @param maintenance - Maintenance object
   * @param files - Optional files array
   */
  resolveMaintenance(maintenance: MaintenanceType, files?: any[] | null): Promise<any> {
    const ctx = this.appContext();
    const underSupervisor = (ctx as any).underSupervisor === true;
    const normalized = {
      ...maintenance,
      dateFermetureSAV: nowDateTime(),
      statut: underSupervisor ? "Supervisor" : "Resolue",
      ...(ctx.appID ? { userId: ctx.appID } : {}),
      ...(ctx.idUser != null ? { idUser: ctx.idUser } : {}),
    };
    return this.put(
      this.appendUserId(`${this.endpointSingleton}/${maintenance.id}/resolve`),
      { maintenance: normalized, files },
    );
  }

  /**
   * Reopen maintenances
   * @param maintenanceId - ID of the maintenance
   */
  reopenMaintenances(maintenanceId: string): Promise<any> {
    const ctx = this.appContext();
    const body: any = { id: maintenanceId, date: nowDateTime() };
    if (ctx.idUser != null) body.idUser = ctx.idUser;
    return this.put(this.appendUserId(`${this.endpointSingleton}/${maintenanceId}/reopen`), body);
  }

  /**
   * Set status maintenances
   * @param maintenances - Array of maintenance objects
   * @param status - New status
   */
  setStatusMaintenances(maintenances: MaintenanceType[], status: string): Promise<any> {
    const ctx = this.appContext();
    const now = nowDateTime();
    const normalized = maintenances.map((m) => ({
      id: m.id,
      date: now,
      ...(ctx.idUser != null ? { idUser: ctx.idUser } : {}),
    }));
    return this.put(
      this.appendUserId(`${this.endpoint}/status/${status}`),
      normalized,
    );
  }

  /**
   * Download file (CSV or Excel)
   * @param metadatas - Metadatas for filtering
   * @param filename - Optional filename
   * @param fileExtension - File extension (csv or xlsx)
   */
  getFile(metadatas: Metadatas, _filename?: string | null, fileExtension: string = "xlsx"): Promise<void> {
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
  getPdfFile(idMaintenance: string, _filename?: string | null, _fileExtension: string = "pdf"): Promise<any> {
    return this.apiRequest(`${this.endpointSingleton}/${idMaintenance}/export/pdf/S`, 'GET', null);
  }

  /**
   * Calculate internal cost (uses tauxHoraire from app context).
   * @param workingTime - Working time in minutes
   */
  coutInterne(workingTime: string): number {
    const ctx = this.appContext();
    const rate = typeof ctx.tauxHoraire === "number" ? ctx.tauxHoraire : 0;
    const hours = parseInt(workingTime, 10) / 60;
    return Number.parseFloat((rate * hours).toFixed(2));
  }

  /**
   * Calculate duration mise en attente
   * @param maintenance - Maintenance object
   */
  dureeMiseEnAttente(_maintenance: MaintenanceType): number {
    // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
    return 0;
  }

  /**
   * Calculate duration fermeture temporaire hors weekend
   * @param maintenance - Maintenance object
   */
  dureeFermetureTemporaireHorsWeekend(_maintenance: MaintenanceType): number {
    // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
    return 0;
  }

  /**
   * Calculate duration nette traitement
   * @param maintenance - Maintenance object
   */
  dureeNetteTraitement(_maintenance: MaintenanceType): number {
    // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
    return 0;
  }

  /**
   * Update multiple typologies
   * @param maintenanceIds - Array of maintenance IDs
   * @param typologyName - Typology name
   */
  updateMultipleTypologies(maintenanceIds: string[], typologyName: string): Promise<any> {
    const ctx = this.appContext();
    const data: any = { ids: maintenanceIds, typologie: typologyName };
    if (ctx.appID) data.userId = ctx.appID;
    return this.put(`${this.endpoint}/update-typologies`, data);
  }

  // --- internal helpers -------------------------------------------------

  /** Append `?userId=<appID>` (or `&userId=…`) to a URL when known. */
  private appendUserId(url: string): string {
    const ctx = this.appContext();
    if (!ctx.appID) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}userId=${encodeURIComponent(ctx.appID)}`;
  }

  /** POST with the userId query param appended (legacy createMaintenances shape). */
  private postWithUserId(endpoint: string, body: any): Promise<any> {
    return this.post(this.appendUserId(endpoint), body);
  }
}

/** YYYY-MM-DD HH:mm:ss in local time, mirroring the legacy `moment().format(…)`. */
function nowDateTime(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
