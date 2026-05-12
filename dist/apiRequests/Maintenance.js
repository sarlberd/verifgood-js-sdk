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
     * GET maintenances liste with custom options
     * @param metadatas - Metadatas for filtering
     * @param options - Additional options for the request
     */
    getMaintenances(metadatas, options = { _stored: true, idUserAffecte: null, idTiersAffecte: null, onlyEncours: true, onlyNonAffectes: false }) {
        // TODO: Implement app context access - needs manual review
        // Original implementation requires: this.$app.appID, this.$app.restrictionsite, this.$app.role, this.$app.tiers_id
        const query = {
            // userId: this.$app.appID,
            // sites: this.$app.restrictionsite,
            onlyEncours: options.onlyEncours
        };
        // TODO: Implement option handling - needs manual review
        if (options.idUserAffecte)
            query.user = options.idUserAffecte;
        if (options.idTiersAffecte)
            query.tiers_id = options.idTiersAffecte;
        if (options.onlyNonAffectes)
            query.onlyNonAffectes = options.onlyNonAffectes;
        // TODO: Implement metadata filter handling - needs manual review
        // Original: if(metadatas.filterExist("tiers_id")) { query["tiers_id"] = metadatas.getFilterValue("tiers_id"); metadatas.deleteFilter("tiers_id"); }
        // Original: if(metadatas.filterExist("mesAffectations")) { let mesAffectations = metadatas.getFilterValue("mesAffectations"); if(mesAffectations) { query["user"] = mesAffectations; metadatas.deleteFilter("mesAffectations"); }}
        // TODO: Implement role-based filtering - needs manual review
        // Original: if(this.$app.role=="ROLE_SOUS_TRAITANT") { query["tiers_id"] = this.$app.tiers_id; }
        // TODO: Implement store dispatch - needs manual review
        // Original: if(_options._stored) { this.$store.dispatch("MaintenancesStore/setMaintenances", datas); for (const [key, value] of Object.entries(meta.counters)) { meta.counters[key] = value * 1; } this.$store.dispatch("MaintenancesStore/addMaintenanceCounters", meta.counters); }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * GET maintenances qui me sont planifiées
     * @param metadatas - Metadatas for filtering
     */
    getMesMaintenancesPlanifiees(metadatas) {
        // TODO: Implement app context access - needs manual review
        // Original implementation requires: this.$app.appID, this.$app.restrictionsite, this.$app.role, this.$app.tiers_id
        const query = {
        // userId: this.$app.appID,
        // sites: this.$app.restrictionsite
        };
        // TODO: Implement metadata filter handling - needs manual review
        // Original: if(metadatas.filterExist("tiers_id")) { query["tiers_id"] = metadatas.getFilterValue("tiers_id"); metadatas.deleteFilter("tiers_id"); }
        // Original: if(metadatas.filterExist("mesAffectations")) { let mesAffectations = metadatas.getFilterValue("mesAffectations"); if(mesAffectations) { query["user"] = mesAffectations; metadatas.deleteFilter("mesAffectations"); }}
        // TODO: Implement role-based filtering - needs manual review
        // Original: if(this.$app.role=="ROLE_SOUS_TRAITANT") { query["tiers_id"] = this.$app.tiers_id; }
        // TODO: Implement store dispatch - needs manual review
        // Original: this.$store.dispatch("MaintenancesStore/setMaintenances", datas); for (const [key, value] of Object.entries(meta.counters)) { meta.counters[key] = value * 1; } this.$store.dispatch("MaintenancesStore/setMaintenanceCounters", {mesAffectationsPlanifiees: meta.counters.mesAffectationsPlanifiees});
        return this.get(`${this.endpoint}/mes-planifiees`, metadatas, query);
    }
    /**
     * GET demandeurs liste
     * @param metadatas - Metadatas for filtering
     * @param options - Additional options
     */
    getDemandeurs(metadatas, options = { _stored: true }) {
        // TODO: Implement app context access - needs manual review
        // Original implementation requires: this.$app.appID, this.$app.restrictionsite, this.$app.role, this.$app.tiers_id
        const query = {
        // userId: this.$app.appID,
        // sites: this.$app.restrictionsite
        };
        // TODO: Implement role-based filtering - needs manual review
        // Original: if(this.$app.role=="ROLE_SOUS_TRAITANT") query["tiers_id"] = this.$app.tiers_id;
        // TODO: Implement store dispatch - needs manual review
        // Original: if(_options._stored) this.$store.dispatch("MaintenancesStore/setDemandeurs", datas);
        return this.get(`${this.endpoint}/demandeurs`, metadatas, query);
    }
    /**
     * Create multiple maintenances
     * @param maintenances - Array of maintenance objects to create
     * @param options - Additional options
     */
    createMaintenances(maintenances, options = { _stored: true }) {
        // TODO: Implement app context access - needs manual review
        // Original implementation requires: this.$app.appID
        // Original URL: "/api/maintenances?userId="+this.$app.appID
        // TODO: Implement store dispatch - needs manual review
        // Original: if(_options._stored) { this.$store.dispatch("MaintenancesStore/addMaintenances", datas); }
        return this.post(this.endpoint, maintenances);
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
        // TODO: Implement store dispatch for each deleted maintenance - needs manual review
        // Original: maintenances.forEach((maintenance)=>{ this.$store.dispatch("MaintenancesStore/deleteMaintenance", maintenance["id"]); });
        // Note: Original used rc.deleteMultiple method, using apiRequest with DELETE instead
        return this.apiRequest(`${this.endpoint}/delete-multiple`, 'DELETE', maintenances);
    }
    /**
     * Relancer maintenance
     * @param maintenance - Maintenance object to relancer
     * @param commentaire - Optional comment
     */
    relancer(maintenance, commentaire) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.appID, this.$app.idUser
        const data = {
            // userId: this.$app.appID,
            id: maintenance.id,
            // dateRelance: moment().format("YYYY-MM-DD HH:mm:ss"),
            // idUser: this.$app.idUser,
            commentaire: commentaire
        };
        // TODO: Implement store dispatch - needs manual review
        // Original: this.$store.dispatch("MaintenancesStore/updateMaintenance", datas); this.$store.dispatch("OperationsStore/set", datas.operations);
        // TODO: Implement rule-based authorization - needs manual review
        // Original: {rule: "ACTIVITE_MAINTENANCE.CREATE_MAINTENANCE_RELANCE"}
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
        // TODO: Implement app context access and store dispatch - needs manual review
        // Original implementation requires: this.$app.appID
        const data = {
            datas: {
                ...operation,
                // userId: this.$app.appID
            }
        };
        // TODO: Implement store dispatch - needs manual review
        // Original: this.$store.dispatch("MaintenancesStore/updateOperation", datas); this.$store.dispatch("OperationsStore/updateItem", datas);
        return this.put(`/api/operation/${operation.id}`, data);
    }
    /**
     * Delete operation
     * @param idOperation - ID of the operation
     * @param operation - Operation object for uid
     */
    deleteOperation(idOperation, operation) {
        // TODO: Implement app context access for userId parameter - needs manual review
        // Original implementation requires: this.$app.appID
        // Original URL: "/api/operation/"+idOperation+"?userId="+this.$app.appID
        // Original query: { "datas": { "id":idOperation, "uid":operation.uid } }
        return this.delete(`/api/operation/${idOperation}`);
    }
    /**
     * Get calendar events (deprecated)
     * @deprecated
     * @param metadatas - Metadatas for filtering
     */
    getCalendarEvents(metadatas) {
        // TODO: Implement complete calendar events logic - needs manual review
        // Original: this.MaintenanceMixins_getMaintenances(metadatas, {_stored: false}).then((maintenances)=>{ let calendarEvents = this.MaintenanceMixins_formatToCalendarEvents(maintenances.datas); resolve(calendarEvents); });
        return Promise.resolve([]);
    }
    /**
     * Format maintenances to calendar events (deprecated)
     * @deprecated
     * @param maintenances - Array of maintenance objects
     */
    formatToCalendarEvents(maintenances) {
        // TODO: Implement complete calendar formatting logic - needs manual review
        /* Original implementation:
        let calendarEvents = [];
        maintenances.forEach((maintenance, index)=>{
            calendarEvents.push({   // add evenement ouverture maintenance
                id: index,
                calendarId: "ouverture",
                start: maintenance.dateOuvertureSAV,
                end: maintenance.dateOuvertureSAV,
                isAllDay: false,
                category: "time",
                raw: maintenance
            });
            if(maintenance.statut=="Resolue"){
                calendarEvents.push({   // add evenement fermeture maintenance
                    id: index,
                    calendarId: "fermeture",
                    start: maintenance.dateFermetureSAV,
                    end: maintenance.dateFermetureSAV,
                    isAllDay: false,
                    category: "time",
                    raw: maintenance
                });
            }
            if(maintenance.affectation && maintenance.affectation.id){
                if(maintenance.affectation.start && maintenance.affectation.end){   // ne tient pas compte des fms affectées sans plage horaire définie
                    calendarEvents.push({   // add evenement affectation maintenance
                        id: index,
                        calendarId: "affectation",
                        start: maintenance.affectation.start,
                        end: maintenance.affectation.end,
                        isAllDay: false,
                        category: "time",
                        raw: maintenance
                    });
                }
            }
        });
        return calendarEvents; */
        return [];
    }
    /**
     * Prendre en compte maintenances
     * @param maintenances - Array of maintenance objects
     */
    prendreEnCompteMaintenances(maintenances) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.appID
        const data = {
            datas: maintenances,
            // dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        // Original URL: "/api/maintenances/prendre-en-compte?userId="+this.$app.appID
        return this.put(`${this.endpoint}/prendre-en-compte`, data);
    }
    /**
     * Prendre en compte maintenance
     * @param maintenance - Maintenance object
     */
    prendreEnCompteMaintenance(maintenance) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.appID
        const data = {
            datas: maintenance,
            // dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        // Original URL: "/api/maintenance/"+maintenance.id+"/prendre-en-compte?userId="+this.$app.appID
        return this.put(`${this.endpointSingleton}/${maintenance.id}/prendre-en-compte`, data);
    }
    /**
     * Mettre en attente maintenances
     * @param maintenances - Array of maintenance objects
     */
    mettreEnAttenteMaintenances(maintenances) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.appID
        const data = {
            datas: maintenances,
            // dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        // Original URL: "/api/maintenances/mettre-en-attente?userId="+this.$app.appID
        return this.put(`${this.endpoint}/mettre-en-attente`, data);
    }
    /**
     * Mettre en attente maintenance
     * @param maintenance - Maintenance object
     */
    mettreEnAttenteMaintenance(maintenance) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.appID
        const data = {
            datas: maintenance,
            // dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        // Original URL: "/api/maintenance/"+maintenance.id+"/mettre-en-attente?userId="+this.$app.appID
        return this.put(`${this.endpointSingleton}/${maintenance.id}/mettre-en-attente`, data);
    }
    /**
     * Cloture maintenances
     * @param maintenances - Array of maintenance objects
     * @param rapportCloture - Optional rapport de cloture
     */
    resolveMaintenances(maintenances, rapportCloture) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.idUser, this.$app.appID
        /* Original complex normalization logic:
        let now = moment().format("YYYY-MM-DD HH:mm:ss");
        let maintenancesNormalized = maintenances.map((maintenance)=>{
            return {
                "id":maintenance.id,
                "dateFermetureSAV":now,
                "rapportCloture":rapportCloture?rapportCloture:maintenance.operation,
                "idUser": this.$app.idUser
            }
        });
        var query = maintenancesNormalized;
        Original URL: "/api/maintenances/resolve?userId="+this.$app.appID
        */
        return this.put(`${this.endpoint}/resolve`, maintenances);
    }
    /**
     * Cloture maintenance
     * @param maintenance - Maintenance object
     * @param files - Optional files array
     */
    resolveMaintenance(maintenance, files) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.underSupervisor, this.$app.appID, this.$app.idUser
        /* Original complex normalization logic:
        let normalizedMaintenance = Object.assign({}, maintenance, {
            dateFermetureSAV: moment().format("YYYY-MM-DD HH:mm:ss"),
            statut: this.$app.underSupervisor ? "Supervisor" : "Resolue",
            userId: this.$app.appID,
            idUser: this.$app.idUser
        });
        Original URL: "/api/maintenance/"+maintenance.id+"/resolve?userId="+this.$app.appID
        */
        return this.put(`${this.endpointSingleton}/${maintenance.id}/resolve`, { maintenance, files });
    }
    /**
     * Reopen maintenances
     * @param maintenanceId - ID of the maintenance
     */
    reopenMaintenances(maintenanceId) {
        // TODO: Implement moment.js for date formatting and app context access - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.idUser, this.$app.appID
        /* Original normalization logic:
        let now = moment().format("YYYY-MM-DD HH:mm:ss");
        let maintenancesNormalized = {"id":maintenanceId,"date":now,"idUser":this.$app.idUser};
        Original URL: "/api/maintenance/"+maintenancesNormalized.id+"/reopen?userId="+this.$app.appID
        */
        return this.put(`${this.endpointSingleton}/${maintenanceId}/reopen`, {});
    }
    /**
     * Set status maintenances
     * @param maintenances - Array of maintenance objects
     * @param status - New status
     */
    setStatusMaintenances(maintenances, status) {
        // TODO: Implement moment.js for date formatting, app context access and store dispatch - needs manual review
        // Original implementation requires: moment().format("YYYY-MM-DD HH:mm:ss"), this.$app.idUser, this.$app.appID
        /* Original normalization logic:
        let now = moment().format("YYYY-MM-DD HH:mm:ss");
        let maintenancesNormalized = maintenances.map((maintenance)=>{
            return {"id":maintenance.id,"date":now,"idUser":this.$app.idUser};
        });
        Original URL: "/api/maintenances/status/"+status+"?userId="+this.$app.appID
        Original store dispatch: this.$store.dispatch("MaintenancesStore/updateMaintenance", Object.assign({}, maintenances[0], {statut: status}));
        */
        return this.put(`${this.endpoint}/status/${status}`, maintenances);
    }
    /**
     * Download file (CSV or Excel)
     * @param metadatas - Metadatas for filtering
     * @param filename - Optional filename
     * @param fileExtension - File extension (csv or xlsx)
     */
    getFile(metadatas, filename, fileExtension = "xlsx") {
        // TODO: Implement complete file download logic with blob handling - needs manual review
        /* Original complex implementation:
        metadatas.setDirectives([]);
        var query = {
            userId: this.$app.appID,
            sites: this.$app.restrictionsite || '',
            metadatas: metadatas.get()
        };
        let fileType = fileExtension != "csv" ? "excel":"csv";
        let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
        let responseType = fileExtension != "csv" ? "blob":"text";
        this.$rc.setOptions({
            'responseType': responseType,
            'Content-Type': contentType
        });
        
        this.$rc.get("/api/maintenances/export/"+fileType, query, (response, remoteMetadatas)=>{
            let blob;
            if (fileExtension === "csv") {
                // Add BOM for UTF-8 encoding
                const BOM = "\uFEFF";
                blob = new Blob([BOM + response], { type: contentType });
            } else {
                blob = new Blob([response], { type: contentType });
            }
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            metadatas.setLimit(0,25);
            link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve();
        });
        */
        const fileType = fileExtension !== "csv" ? "excel" : "csv";
        return this.get(`${this.endpoint}/export/${fileType}`, metadatas, {});
    }
    /**
     * Download PDF file
     * @param idMaintenance - ID of the maintenance
     * @param filename - Optional filename
     * @param fileExtension - File extension
     */
    getPdfFile(idMaintenance, filename, fileExtension = "pdf") {
        // TODO: Implement complete PDF handling with logo insertion - needs manual review
        /* Original complex implementation with PDFDocument and logo handling:
        var rc = this.$rc;
        var query = {};
        rc.setOptions({
            'responseType': 'blob',
            'Content-Type':'application/pdf'
        });
    
        rc.get("/api/maintenance/"+idMaintenance+"/export/pdf/S", query, function(response,remoteMetadatas){
            var reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = function() {
              var pdf64 = reader.result;
              PDFDocument.load(pdf64).then((datas)=>{
                let logo = window.sessionStorage.getItem('account_logo');
                let pdf = datas;
                let page = pdf.getPage(0);
                const pageHeight = page.getHeight();
    
                // Complex logo insertion logic for JPEG and PNG
                // Blob creation and download logic
              });
            }
        });
        */
        return this.apiRequest(`${this.endpointSingleton}/${idMaintenance}/export/pdf/S`, 'GET', null);
    }
    /**
     * Calculate internal cost
     * @param workingTime - Working time in minutes
     */
    coutInterne(workingTime) {
        // TODO: Implement app context access for tauxHoraire - needs manual review
        // Original implementation requires: this.$app.tauxHoraire
        /* Original implementation:
        let workingTimeConvertIntoHours = parseInt(workingTime)/60;
        let coutInterne = parseInt(this.$app.tauxHoraire) * workingTimeConvertIntoHours;
        return Number.parseFloat(coutInterne).toFixed(2);
        */
        const workingTimeConvertIntoHours = parseInt(workingTime) / 60;
        // Note: tauxHoraire should be passed as parameter or retrieved from configuration
        const tauxHoraire = 0; // placeholder - TODO: implement app context access
        const coutInterne = tauxHoraire * workingTimeConvertIntoHours;
        return Number.parseFloat(coutInterne.toString()).toFixed(2);
    }
    /**
     * Calculate duration mise en attente
     * @param maintenance - Maintenance object
     */
    dureeMiseEnAttente(maintenance) {
        // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
        /* Original implementation:
        if(maintenance.operations){
            let operationsStatut = maintenance.operations.filter((op)=>op.flag in ["fermeture","en_attente", "prise_en_compte"]);
            let dureeMiseEnAttente = 0;
            let currentOperationEnAttente = null;
            for(let index=0;index<operationsStatut.length;index++){
                let operation = operationsStatut[index];
                if(!currentOperationEnAttente){
                    if(operation.flag=="en_attente") currentOperationEnAttente = Object.assign({},{}, operation);
                    else if(operation.flag=="fermeture" || operation.flag=="prise_en_compte"){
                        dureeMiseEnAttente += DateUtilities.getMinutesBetweenDatesExcludingWeekends(currentOperationEnAttente.dateOperation, operation.dateOperation)
                        currentOperationEnAttente = null;
                    }
                }
            }
            return dureeMiseEnAttente;
        }else return 0;
        */
        return 0;
    }
    /**
     * Calculate duration fermeture temporaire hors weekend
     * @param maintenance - Maintenance object
     */
    dureeFermetureTemporaireHorsWeekend(maintenance) {
        // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
        /* Original implementation:
        if(maintenance.operations){
            let dureeFermetureTemporaireHorsWeekend = 0;
            let operationsStatut = maintenance.operations.filter((op)=>op.flag in ["fermeture", "reouverture"]);
            let dateReouverture = null;
            for(let index=0;index<operationsStatut.length;index++){
                let operation = operationsStatut[index];
                if(operation.flag=="reouverture"){
                    dateReouverture = operation.dateOperation;
                }else if(dateReouverture && operation.flag=="fermeture"){
                    dureeFermetureTemporaireHorsWeekend = DateUtilities.getMinutesBetweenDatesExcludingWeekends(dateReouverture, operation.dateOperation);
                    dateReouverture = null;
                }
            }
            return dureeFermetureTemporaireHorsWeekend;
        }else return 0;
        */
        return 0;
    }
    /**
     * Calculate duration nette traitement
     * @param maintenance - Maintenance object
     */
    dureeNetteTraitement(maintenance) {
        // TODO: Implement DateUtilities and complex duration calculation logic - needs manual review
        /* Original implementation:
        if(maintenance.statut=="Resolue" || maintenance.statut=="Supervisor"){
            let dureeOuvertureHorsWeekend = DateUtilities.getMinutesBetweenDatesExcludingWeekends(maintenance.dateOuvertureSAV, maintenance.dateFermetureSAV);
            return dureeOuvertureHorsWeekend - this.MaintenanceMixins_dureeMiseEnAttente(maintenance) - this.MaintenanceMixins_dureeFermetureTemporaireHorsWeekend(maintenance);
        }else return null;
        */
        return 0;
    }
    /**
     * Update multiple typologies
     * @param maintenanceIds - Array of maintenance IDs
     * @param typologyName - Typology name
     */
    updateMultipleTypologies(maintenanceIds, typologyName) {
        // TODO: Implement app context access and store dispatch - needs manual review
        // Original implementation requires: this.$app.appID
        /* Original implementation:
        var query = {
            userId: this.$app.appID,
            ids: maintenanceIds,
            typologie: typologyName
        };
        rc.put("/api/maintenances/update-typologies", query, (datas) => {
            // Optional: Update store based on response if needed
            // this.$store.dispatch("MaintenancesStore/updateMultipleMaintenancesTypology", { ids: maintenanceIds, typology: typologyName });
            resolve(datas);
        }, (error) => {
            console.error("API Error in MaintenanceMixins_updateMultipleTypologies:", error);
            reject(error);
        });
        */
        return Promise.resolve({});
    }
}
exports.Maintenance = Maintenance;
//# sourceMappingURL=Maintenance.js.map