import { PDFDocument } from 'pdf-lib';
import DateUtilities from "src/utilities/DateUtilities.js";
export default {
    data: function(){
        return {

        };
    },
    methods:{
        /**
        * GET maintenances liste.
        *
        * @param Object Metadatas.
        */
        MaintenanceMixins_getMaintenances: function(metadatas, _options = {_stored: true, idUserAffecte: null, idTiersAffecte: null, onlyEncours: true, onlyNonAffectes: false}){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    onlyEncours: _options.onlyEncours
				};
                if(_options.idUserAffecte) query.user = _options.idUserAffecte;
                if(_options.idTiersAffecte) query.tiers_id = _options.idTiersAffecte;
                if(_options.onlyNonAffectes) query.onlyNonAffectes = _options.onlyNonAffectes;
                // il faut supprimer le filtrage par tiers_id et le passé en query
                if(metadatas.filterExist("tiers_id")){
                    query["tiers_id"] = metadatas.getFilterValue("tiers_id");
                    metadatas.deleteFilter("tiers_id");
                }
                // il faut supprimer le filtrage par affectation user et le passé en query
                if(metadatas.filterExist("mesAffectations")){
                    let mesAffectations = metadatas.getFilterValue("mesAffectations");
                    if(mesAffectations){
                        query["user"] = mesAffectations;
                        metadatas.deleteFilter("mesAffectations");
                    }
                }
                if(this.$app.role=="ROLE_SOUS_TRAITANT"){
                    query["tiers_id"] = this.$app.tiers_id;
                }
                query["metadatas"] = metadatas.get();
                this.$rc.get("/api/maintenances", query, (datas, meta) => {
                    if(_options._stored){
                        this.$store.dispatch("MaintenancesStore/setMaintenances", datas);
                        for (const [key, value] of Object.entries(meta.counters)) {
                          meta.counters[key] = value * 1;
                        }
                        this.$store.dispatch("MaintenancesStore/addMaintenanceCounters", meta.counters);
                    }
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET maintenances qui me sont planifiés.
        *
        * @param Object Metadatas.
        */
        MaintenanceMixins_getMesMaintenancesPlanifiees: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite
				};
                // il faut supprimer le filtrage par tiers_id et le passé en query
                if(metadatas.filterExist("tiers_id")){
                    query["tiers_id"] = metadatas.getFilterValue("tiers_id");
                    metadatas.deleteFilter("tiers_id");
                }
                // il faut supprimer le filtrage par affectation user et le passé en query
                if(metadatas.filterExist("mesAffectations")){
                    let mesAffectations = metadatas.getFilterValue("mesAffectations");
                    if(mesAffectations){
                        query["user"] = mesAffectations;
                        metadatas.deleteFilter("mesAffectations");
                    }
                }
                if(this.$app.role=="ROLE_SOUS_TRAITANT"){
                    query["tiers_id"] = this.$app.tiers_id;
                }
                query["metadatas"] = metadatas.get();
                rc.get("/api/maintenances/mes-planifiees", query, (datas, meta) => {
                    this.$store.dispatch("MaintenancesStore/setMaintenances", datas);
                    for (const [key, value] of Object.entries(meta.counters)) {
                      meta.counters[key] = value * 1;
                    }
                    this.$store.dispatch("MaintenancesStore/setMaintenanceCounters", {mesAffectationsPlanifiees: meta.counters.mesAffectationsPlanifiees});
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET maintenance by id.
        *
        * @param Integer idMaintenance identifiant de la maintenance
        */
        MaintenanceMixins_getMaintenance: function(idMaintenance){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID
				};

                rc.get("/api/maintenance/"+idMaintenance, query, (datas) => {
                    this.$store.dispatch("MaintenancesStore/setMaintenance", datas);
                    this.$store.dispatch("OperationsStore/set", datas.operations);
                    resolve(datas);
                });
			});
        },
        /**
        * GET demandeurs liste.
        *
        * @param Object Metadatas.
        */
        MaintenanceMixins_getDemandeurs: function(metadatas, _options = {_stored: true}){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite
				};
                if(this.$app.role=="ROLE_SOUS_TRAITANT") query["tiers_id"] = this.$app.tiers_id;
                query["metadatas"] = metadatas.get();
                this.$rc.get("/api/maintenances/demandeurs", query, (datas, meta) => {
                    if(_options._stored) this.$store.dispatch("MaintenancesStore/setDemandeurs", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * update maintenance.
        *
        * @param array maintenance
        */
        MaintenanceMixins_update: function(maintenance){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID
				};
                rc.put("/api/maintenances", maintenance, (datas) => {
                    try {
                        this.$store.dispatch("MaintenancesStore/updateMaintenance", maintenance[0]);
                        resolve(datas);
                    } catch (e) {
                        //console.log(e)
                    }

                });
			});
        },

        /**
        * create maintenances.
        *
        * @param array maintenances
        */
        MaintenanceMixins_createMaintenances: function(maintenances, _options={_stored: true}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/maintenances?userId="+this.$app.appID, maintenances, (datas) => {
                    // doit récupérer la valeur des dernières maintenances créer
                    // tel que défini dans le getMaintenances
                    // this.$store.dispatch("MaintenancesStore/addMaintenance", maintenances[0]);
                    if(_options._stored){ 
                        this.$store.dispatch("MaintenancesStore/addMaintenances", datas);
                    }
                    resolve(datas);
                });
			});
        },
        /**
        * demande de devis on maintenance id.
        *
        * @param integer maintenanceId
        * @param array payload
        */
        MaintenanceMixins_demandeDevis: function(maintenanceId,payload){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/maintenance/"+maintenanceId+"/demande-devis", payload, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * delete maintenance.
        *
        * @param object maintenance
        */
        MaintenanceMixins_delete: function(maintenance){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.delete("/api/maintenance/"+maintenance["id"]+"?userId="+this.$app.appID, maintenance, (datas) => {
                    this.$store.dispatch("MaintenancesStore/deleteMaintenance", maintenance["id"]);
                    resolve(datas);
                });
			});
        },
        // TODO add delete multiple maintenances
        MaintenanceMixins_deleteMultiple: function(maintenances){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                console.log(maintenances);
                rc.deleteMultiple("/api/maintenances", maintenances, (datas) => {
                    maintenances.forEach((maintenance)=>{
                        this.$store.dispatch("MaintenancesStore/deleteMaintenance", maintenance["id"]);
                    });
                    resolve(datas);
                });
            });
        },  
        /**
        * relancer maintenance.
        *
        * @param array maintenance
        */
        MaintenanceMixins_relancer: function(maintenance, commentaire=null){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    id: maintenance.id,
                    dateRelance: moment().format("YYYY-MM-DD HH:mm:ss"),
                    idUser: this.$app.idUser,
                    commentaire: commentaire
				};
                this.$rc.put("/api/maintenance/"+maintenance.id+"/relance", query, (datas) => {
                    this.$store.dispatch("MaintenancesStore/updateMaintenance", datas);
                    this.$store.dispatch("OperationsStore/set", datas.operations);
                    resolve(datas);
                }, null, {rule: "ACTIVITE_MAINTENANCE.CREATE_MAINTENANCE_RELANCE"});
			});
        },

        /**
        * Create operation on maintenance :id.
        *
        * @param integer idMaintenance
        * @param array operations
        * @return Promise
        */
        MaintenanceMixins_postMaintenanceOperations: function(idMaintenance, operations){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					datas: operations
				};
                rc.post("/api/maintenance/"+idMaintenance+"/operations", query, (datas) => resolve(datas));
			});
        },
        /**
        * Create operations.
        *
        * @param array operations
        * @return Promise
        */
        MaintenanceMixins_postOperations: function(operations){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					datas: operations
				};
                rc.post("/api/operations", query, (datas) => resolve(datas));
			});
        },
        /**
        * Update operation.
        *
        * @param object operation ie {id: ..., operation: ...}
        * @return Promise
        */
        MaintenanceMixins_putOperation: function(operation){
            return new Promise((resolve, reject)=>{
				var query = {
					datas: Object.assign(operation, {
                        userId: this.$app.appID
                    })
				};
                this.$rc.put("/api/operation/"+operation.id, query, (datas) => {
                    this.$store.dispatch("MaintenancesStore/updateOperation", datas);
                    this.$store.dispatch("OperationsStore/updateItem", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * Delete operation.
        *
        * @param String idOperation
        * @param String operation ie operation.operation
        */
        MaintenanceMixins_deleteOperation: function(idOperation, operation){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    "datas": {
                	   "id":idOperation,
                	   "uid":operation.uid
                	}
                };
                rc.delete("/api/operation/"+idOperation+"?userId="+this.$app.appID, null, (datas) => resolve(datas));
			});
        },
        /**
        * GET maintenance calendar events.
        * @deprecated
        *
        * @param Object Metadatas.
        * @return Promise
        */
        MaintenanceMixins_getCalendarEvents: function(metadatas){
            return new Promise((resolve, reject)=>{
                // GET maintenances pour event dateOuvertureSAV & event dateFermetureSAV & event affectations
                this.MaintenanceMixins_getMaintenances(metadatas, {_stored: false}).then((maintenances)=>{
                    let calendarEvents = this.MaintenanceMixins_formatToCalendarEvents(maintenances.datas);
                    resolve(calendarEvents);
                });
			});
        },
        /**
        * Format maintenances to calendar events.
        * @deprecated
        *
        * @param Array maintenances
        * @return Array calendarEvents
        */
        MaintenanceMixins_formatToCalendarEvents: function(maintenances){
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
            return calendarEvents;
        },
        /**
        * Prendre en compte maintenances.
        *
        * @param Array maintenances
        * @return Promise
        */
        MaintenanceMixins_prendreEnCompteMaintenances: function(maintenances){
            return new Promise((resolve, reject)=>{
                var query = {
                    datas: maintenances,
                    dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
                };
                this.$rc.put("/api/maintenances/prendre-en-compte?userId="+this.$app.appID, query, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * Prendre en compte maintenance.
        *
        * @param Object maintenance
        * @return Promise
        */
        MaintenanceMixins_prendreEnCompteMaintenance: function(maintenance){
            return new Promise((resolve, reject)=>{
                var query = {
                    datas: maintenance,
                    dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
                };
                this.$rc.put("/api/maintenance/"+maintenance.id+"/prendre-en-compte?userId="+this.$app.appID, query, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * Mettre en attente maintenances.
        *
        * @param Array maintenances
        * @return Promise
        */
        MaintenanceMixins_mettreEnAttenteMaintenances: function(maintenances){
            return new Promise((resolve, reject)=>{
                var query = {
                    datas: maintenances,
                    dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
                };
                this.$rc.put("/api/maintenances/mettre-en-attente?userId="+this.$app.appID, query, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * Mettre en attente maintenance.
        *
        * @param Object maintenance
        * @return Promise
        */
        MaintenanceMixins_mettreEnAttenteMaintenance: function(maintenance){
            return new Promise((resolve, reject)=>{
                var query = {
                    datas: maintenance,
                    dateOperation: moment().format("YYYY-MM-DD HH:mm:ss")
                };
                this.$rc.put("/api/maintenance/"+maintenance.id+"/mettre-en-attente?userId="+this.$app.appID, query, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * Cloture maintenances.
        *
        * @param Array maintenances
        * @return Promise
        */
        MaintenanceMixins_resolveMaintenances: function(maintenances, rapportCloture=null){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                let now = moment().format("YYYY-MM-DD HH:mm:ss");
                let maintenancesNormalized = maintenances.map((maintenance)=>{
                    return {
                        "id":maintenance.id,
                        "dateFermetureSAV":now,
                        "rapportCloture":rapportCloture?rapportCloture:maintenance.operation,
                        "idUser": this.$app.idUser
                    }
                });
                var query =  maintenancesNormalized;
                rc.put("/api/maintenances/resolve?userId="+this.$app.appID, query, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * Cloture maintenance.
        *
        * @param Object maintenance
        * @param Array files
        * @return Promise
        */
        MaintenanceMixins_resolveMaintenance: function(maintenance, files=null){
            return new Promise((resolve, reject)=>{
                let normalizedMaintenance =  Object.assign({}, maintenance, {
                    dateFermetureSAV: moment().format("YYYY-MM-DD HH:mm:ss"),
                    statut: this.$app.underSupervisor ? "Supervisor" : "Resolue",
                    userId: this.$app.appID,
                    idUser: this.$app.idUser
                });
                this.$rc.put("/api/maintenance/"+maintenance.id+"/resolve?userId="+this.$app.appID, {maintenance: normalizedMaintenance, files: files}, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * Reopen maintenances.
        *
        * @param integer maintenanceId
        * @return Promise
        */
        MaintenanceMixins_reopenMaintenances: function(maintenanceId){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                let now = moment().format("YYYY-MM-DD HH:mm:ss");
                let maintenancesNormalized = {"id":maintenanceId,"date":now,"idUser":this.$app.idUser};
                rc.put("/api/maintenance/"+maintenancesNormalized.id+"/reopen?userId="+this.$app.appID, maintenancesNormalized, (datas) => {
                    resolve(datas);
                });
			});
        },

        /**
        * set status maintenances.
        *
        * @param Array maintenances
        * @param string status
        * @return Promise
        */
        MaintenanceMixins_setStatusMaintenances: function(maintenances, status){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                let now = moment().format("YYYY-MM-DD HH:mm:ss");
                let maintenancesNormalized = maintenances.map((maintenance)=>{
                    return {"id":maintenance.id,"date":now,"idUser":this.$app.idUser};
                });
                rc.put("/api/maintenances/status/"+status+"?userId="+this.$app.appID, maintenancesNormalized, (datas) => {
                    this.$store.dispatch("MaintenancesStore/updateMaintenance", Object.assign({}, maintenances[0], {statut: status}));
                    resolve(datas);
                });
			});
        },
        /**
        * Open a new tab to download file csv or excel.
        *
        * @param Metadatas metadatas
        * @param string filetype csv|excel
        * @return Promise
        */
		MaintenanceMixins_getFile: function(metadatas, filename=null, fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
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
                    link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
                });
            });
		},
        /**
        * Open a new tab to download file csv or excel.
        * @todo à refactorer duplique aussi avec Verification mixins
        * @param Metadatas metadatas
        * @param string filetype csv|excel
        * @return Promise
        */
		MaintenanceMixins_getPdfFile: function(idMaintenance, filename=null,fileExtension = "pdf"){
            return new Promise((resolve,reject)=>{
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

                        // res = UintArray8
                        let displayPdf = function(res){
                            let blob = new Blob([res],{type:"application/pdf"});
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.target = "_blank";
                            link.setAttribute('download', filename+'.'+fileExtension); //or any other extension
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            resolve(pdf);
                        }
                        let addLogo = function(pdf, logo){
                            if(logo.indexOf("jpeg")  != -1){
                                pdf.embedJpg(logo).then((logo)=>{
                                    let pngDims = logo.scale(1);
                                    
                                    let maxHeight = 70;
                                    let maxWidth = 250;
                                    let ratio = Math.min(maxWidth / pngDims.width, maxHeight / pngDims.height);
                                    page.drawImage(logo, {
                                        x: 10,
                                        y: (pageHeight - 10 )-pngDims.height*ratio,
                                        width: pngDims.width*ratio,
                                        height: pngDims.height*ratio
                                    });
                                    pdf.save().then(displayPdf);
        
                                });
                            }else{
                                pdf.embedPng(logo).then((logo)=>{
                                    let pngDims = logo.scale(1);
                                    
                                    let maxHeight = 70;
                                    let maxWidth = 250;
                                    let ratio = Math.min(maxWidth / pngDims.width, maxHeight / pngDims.height);
                                    page.drawImage(logo, {
                                        x: 10,
                                        y: pageHeight-pngDims.height*ratio,
                                        width: pngDims.width*ratio,
                                        height: pngDims.height*ratio
                                    });
                                    pdf.save().then(displayPdf);
        
                                });
                            }

                        }
                        if(logo){
                            addLogo(pdf, logo);
                        }else{
                            pdf.save().then(displayPdf);
                        }

                    });

                    }






    			});
            });

		},
        /**
        * Calcul le coût interne. ie: workingTime*tauxHoraire
        *
        * @param String workingTime working time en minute
        * @return coutInterne
        */
        MaintenanceMixins_coutInterne: function(workingTime){
            let workingTimeConvertIntoHours = parseInt(workingTime)/60;
            let coutInterne = parseInt(this.$app.tauxHoraire) * workingTimeConvertIntoHours;
            return Number.parseFloat(coutInterne).toFixed(2);
        },
        /**
         * Calcul la duree de mise en attente pour une fiche
         * 
         * @param {Object} maintenance
         * @return Number
         **/
        MaintenanceMixins_dureeMiseEnAttente: function(maintenance){
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
        },
        /**
         * Calcul la duree fermeture temporaire hors weekend pour une fiche
         * 
         * @param {Object} maintenance
         * @return Number
         **/
        MaintenanceMixins_dureeFermetureTemporaireHorsWeekend: function(maintenance){
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
        },
        /**
         * Calcul la duree nette traitement pour une fiche
         * 
         * @param {Object} maintenance
         * @return Number
         **/
        MaintenanceMixins_dureeNetteTraitement: function(maintenance){
            if(maintenance.statut=="Resolue" || maintenance.statut=="Supervisor"){
                let dureeOuvertureHorsWeekend = DateUtilities.getMinutesBetweenDatesExcludingWeekends(maintenance.dateOuvertureSAV, maintenance.dateFermetureSAV);
                return dureeOuvertureHorsWeekend - this.MaintenanceMixins_dureeMiseEnAttente(maintenance) - this.MaintenanceMixins_dureeFermetureTemporaireHorsWeekend(maintenance);
            }else return null;
        },
        /**
        * Update typology for multiple maintenances.
        *
        * @param {Array<Number>} maintenanceIds - Array of maintenance IDs.
        * @param {String} typologyName - The new typology name to set.
        * @return Promise
        */
        MaintenanceMixins_updateMultipleTypologies: function(maintenanceIds, typologyName){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc; // Use existing RestClient instance if available via this.$rc
                var query = {
                    userId: this.$app.appID,
                    ids: maintenanceIds,
                    typologie: typologyName // Send the name as selected in the component
                };
                // IMPORTANT: Ensure the backend endpoint '/api/maintenances/update-typologies' exists and handles PUT requests
                rc.put("/api/maintenances/update-typologies", query, (datas) => {
                    // Optional: Update store based on response if needed
                    // Example: Dispatch action to update items in the store
                    // this.$store.dispatch("MaintenancesStore/updateMultipleMaintenancesTypology", { ids: maintenanceIds, typology: typologyName });
                    resolve(datas);
                }, (error) => {
                    console.error("API Error in MaintenanceMixins_updateMultipleTypologies:", error);
                    reject(error); // Reject the promise on API error
                });
            });
        },
    },
    computed:{

    }
};
