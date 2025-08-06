"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interventions = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Interventions API request class
 * Service for managing interventions
 */
class Interventions extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/interventions';
        this.endpointSingleton = '/api/intervention';
    }
    /**
     * Override getAll method to include custom query parameters
     * @param metadatas Metadatas object
     * @param idEquipement Optional equipment ID
     * @param siteEquipement Optional site equipment
     * @returns Promise with interventions data
     */
    async getAll(metadatas, idEquipement = null, siteEquipement = null) {
        //@TODO: need review - custom parameters not in base interface
        const query = {
            sites: null, // this.$app.restrictionsite equivalent
            userId: null, // this.$app.appID equivalent
            today: new Date().toISOString().split('T')[0] // moment().format("YYYY-MM-DD") equivalent
        };
        if (metadatas.getFilter("materiel_id") && metadatas.getFilter("materiel_id").value) {
            query.equipement_id = metadatas.getFilter("materiel_id").value;
        }
        else if (idEquipement) {
            query.equipement_id = idEquipement;
        }
        if (siteEquipement) {
            query.equipement_site_path = siteEquipement;
        }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Override getById method with custom userId parameter
     * @param id Intervention ID
     * @param options Optional parameters
     * @returns Promise with intervention data
     */
    async getById(id, options = { skipVueXStorage: false }) {
        //@TODO: need review - custom options parameter not in base interface
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.get(`${this.endpointSingleton}/${id}`, new Metadatas_1.Metadatas(), query);
    }
    /**
     * Override update method with custom data cleaning
     * @param id Intervention ID
     * @param intervention Intervention data
     * @param options Optional parameters
     * @returns Promise with updated intervention
     */
    async update(id, intervention, options = { skipVueXStorage: false }) {
        //@TODO: need review - custom data cleaning logic
        const cleanedIntervention = { ...intervention };
        // Remove specific properties as in original mixin
        delete cleanedIntervention.contrat;
        delete cleanedIntervention.tiers;
        delete cleanedIntervention.maintenance;
        delete cleanedIntervention.documents;
        delete cleanedIntervention.validateur;
        delete cleanedIntervention.nbReserves;
        delete cleanedIntervention.nbReservesNonLevees;
        delete cleanedIntervention.interventionsEquipements;
        // Add validation info
        cleanedIntervention.validateur_id = null; // this.$app.idUser equivalent
        cleanedIntervention.dateValidation = new Date().toISOString();
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.put(`${this.endpointSingleton}/${id}?userId=${query.userId}`, { datas: cleanedIntervention });
    }
    /**
     * Override create method with custom userId parameter
     * @param interventions Array of interventions to create
     * @returns Promise with created interventions
     */
    async create(interventions) {
        //@TODO: need review - takes array instead of single object
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.post(`${this.endpoint}?userId=${query.userId}`, { datas: interventions });
    }
    /**
     * Override remove method with custom userId parameter
     * @param id Intervention ID
     * @returns Promise with deletion result
     */
    async remove(id) {
        //@TODO: need review - original required intervention object, simplified to match interface
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.delete(`${this.endpointSingleton}/${id}?userId=${query.userId}`);
    }
    /**
     * Get PDF file for intervention
     * @param idIntervention Intervention ID
     * @param filename Optional filename
     * @param fileExtension File extension (default: pdf)
     * @returns Promise with PDF data
     */
    async getPdfFile(idIntervention, filename = null, fileExtension = "pdf") {
        //@TODO: need review - complex PDF processing logic with blob handling
        const query = {};
        // Note: Original method has complex PDF processing with FileReader and PDFDocument
        // This would need to be handled differently in a framework-agnostic way
        return this.get(`/api/intervention/export/${idIntervention}/S`, new Metadatas_1.Metadatas(), query);
    }
    /**
     * Format interventions to calendar events
     * @param interventions Array of interventions
     * @returns Array of calendar events
     */
    formatToCalendarEvents(interventions) {
        const calendarEvents = [];
        interventions.forEach((intervention, index) => {
            if (intervention.status === "intervention-prevue") {
                if (intervention.datePrevisionnelleDebut && intervention.datePrevisionnelleFin) {
                    calendarEvents.push({
                        id: index,
                        calendarId: "intervention-previsionnelle",
                        start: intervention.datePrevisionnelleDebut,
                        end: intervention.datePrevisionnelleFin,
                        isAllDay: false,
                        category: "time",
                        raw: intervention
                    });
                }
            }
            else if (intervention.status === "intervention-realisee" && intervention.fichesav_id) {
                if (intervention.dateEffectiveDebut && intervention.dateEffectiveFin) {
                    calendarEvents.push({
                        id: index,
                        calendarId: "intervention-ponctuelle",
                        start: intervention.dateEffectiveDebut,
                        end: intervention.dateEffectiveFin,
                        isAllDay: false,
                        category: "time",
                        raw: intervention
                    });
                }
            }
            else if (intervention.status === "intervention-realisee" && intervention.datePrevisionnelleDebut === intervention.dateEffectiveDebut) {
                if (intervention.dateEffectiveDebut && intervention.dateEffectiveFin) {
                    calendarEvents.push({
                        id: index,
                        calendarId: "intervention-effective",
                        start: intervention.dateEffectiveDebut,
                        end: intervention.dateEffectiveFin,
                        isAllDay: false,
                        category: "time",
                        raw: intervention
                    });
                }
            }
            else {
                if (intervention.dateEffectiveDebut && intervention.dateEffectiveFin) {
                    calendarEvents.push({
                        id: index,
                        calendarId: "intervention-effective",
                        start: intervention.dateEffectiveDebut,
                        end: intervention.dateEffectiveFin,
                        isAllDay: false,
                        category: "time",
                        raw: intervention
                    });
                }
                if (intervention.datePrevisionnelleDebut && intervention.datePrevisionnelleFin) {
                    calendarEvents.push({
                        id: index,
                        calendarId: "intervention-previsionnelle",
                        start: intervention.datePrevisionnelleDebut,
                        end: intervention.datePrevisionnelleFin,
                        isAllDay: false,
                        category: "time",
                        raw: intervention
                    });
                }
            }
        });
        return calendarEvents;
    }
    /**
     * Get interventions calendar events
     * @param metadatas Metadatas object
     * @returns Promise with calendar events
     */
    async getCalendarEvents(metadatas) {
        const interventions = await this.getAll(metadatas);
        const calendarEvents = this.formatToCalendarEvents(interventions.datas);
        return calendarEvents;
    }
    /**
     * Create interventions equipements
     * @param idIntervention Intervention ID
     * @param equipements Array of equipements
     * @returns Promise with created equipements
     */
    async createInterventionsEquipements(idIntervention, equipements) {
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.post(`/api/interventionsequipements/${idIntervention}?userId=${query.userId}`, { datas: equipements });
    }
    /**
     * Delete intervention equipement
     * @param interventionEquipement Intervention equipement object
     * @returns Promise with deletion result
     */
    async deleteInterventionEquipement(interventionEquipement) {
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.delete(`/api/interventionsequipements/${interventionEquipement.id}?userId=${query.userId}`);
    }
    /**
     * Delete interventions equipements
     * @param interventionsEquipements Array of interventions equipements
     * @returns Promise with deletion result
     */
    async deleteInterventionsEquipements(interventionsEquipements) {
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.delete(`/api/interventionsequipements?userId=${query.userId}`);
    }
}
exports.Interventions = Interventions;
//# sourceMappingURL=Interventions.js.map