import { PDFDocument } from 'pdf-lib';
/**
* @module InterventionsMixins
*/
export default {
	methods: {
        /**
        * GET interventions.
		*
        * @method InterventionsMixins_get
        * @param Metadatas metadatas
		* @param Integer idEquipement
        * @return Promise
        */
        InterventionsMixins_get: function(metadatas, idEquipement=null, siteEquipement=null){
            return new Promise((resolve, reject) => {
                let query = {
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite,
                    userId: this.$app.appID,
                    today: moment().format("YYYY-MM-DD")
                };
				if(metadatas.getFilter("materiel_id") && metadatas.getFilter("materiel_id").value) query.equipement_id = metadatas.getFilter("materiel_id").value;
				else if(idEquipement) query.equipement_id = idEquipement;
                if(siteEquipement) query.equipement_site_path = siteEquipement;
				this.$rc.get("/api/interventions", query, (datas, meta) => {
                    console.log("GET INTERVENTIONS RESPONSE", datas, meta);
                    this.$store.dispatch("InterventionsStore/set", datas);
                    this.$store.dispatch("InterventionsStore/setCounters", meta.counters);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
        /**
        * GET interventions.
		*
        * @method InterventionsMixins_export_pdf
        * @param Metadatas metadatas
		* @param Integer idEquipement
        * @return Promise
        */
        InterventionsMixins_getPdfFile: function(idIntervention, filename=null,fileExtension = "pdf"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
                var query = {};
                rc.setOptions({
                    'responseType': 'blob',
                    'Content-Type':'application/pdf'
                });

                rc.get(`/api/intervention/export/${idIntervention}/S`, query, function(response,remoteMetadatas){
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
                                link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                resolve(pdf);
                            }
                            let addLogo = function(pdf, logo){
                                if(logo.indexOf("jpeg") != -1 ){
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
                    resolve(response);
                });
            })
        },
		/**
        * GET intervention by id.
        *
        * @param Integer idIntervention identifiant de l'intervention
        */
        InterventionsMixins_getIntervention: function(idIntervention, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID
				};
                this.$rc.get("/api/intervention/"+idIntervention, query, (datas) => {
                    //this.$store.dispatch("InterventionsStore/addItem", datas);
					if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("InterventionsStore/setSelectedItem", datas);
                    resolve(datas);
                });
			});
        },
		/**
        * Update intervention.
        *
        * @param object intervention
        */
        InterventionsMixins_update: function(intervention, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				delete intervention.contrat;
				delete intervention.tiers;
				delete intervention.maintenance;
				delete intervention.documents;
				delete intervention.validateur;
				delete intervention.nbReserves;
				delete intervention.nbReservesNonLevees;
				intervention.validateur_id = this.$app.idUser;
				intervention.dateValidation = moment().format("YYYY-MM-DD HH:mm");
				delete intervention.interventionsEquipements;
                rc.put("/api/intervention/"+intervention.id+"?userId="+this.$app.appID, intervention, (datas) => {
					console.log("AFTER PUT INTERVENTION", datas);
					if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("InterventionsStore/updateItem", datas);
					// update dans le store
                    resolve(datas);
                });
			});
        },

        /**
        * Create interventions.
        *
        * @param array interventions
        */
        InterventionsMixins_create: function(interventions){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/interventions?userId="+this.$app.appID, {datas: interventions}, (datas) => {
					this.$store.dispatch("InterventionsStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * Delete intervention.
        *
        * @param object intervention
        */
        InterventionsMixins_delete: function(intervention){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.delete("/api/intervention/"+intervention.id+"?userId="+this.$app.appID, {datas: intervention}, (datas) => {
                    this.$store.dispatch("InterventionsStore/deleteItem", intervention["id"]);
                    resolve(datas);
                });
			});
        },
		/**
		* Format interventions to calendar events.
        *
        * @param Array interventions
        * @return Array calendarEvents
		*/
		InterventionsMixins_formatToCalendarEvents: function(interventions){
			let calendarEvents = [];
			interventions.forEach((intervention, index)=>{
				if(intervention.status=="intervention-prevue"){
                    if(intervention.datePrevisionnelleDebut && intervention.datePrevisionnelleFin){
                        calendarEvents.push({   // add evenement intervention prévisionnelle
                            id: index,
                            calendarId: "intervention-previsionnelle",
                            start: intervention.datePrevisionnelleDebut,
                            end: intervention.datePrevisionnelleFin,
                            isAllDay: false,
                            category: "time",
                            raw: intervention
                        });
                    }
				}else if(intervention.status=="intervention-realisee" && intervention.fichesav_id){
                    if(intervention.dateEffectiveDebut && intervention.dateEffectiveFin){
                        calendarEvents.push({   // add evenement intervention ponctuelle
                            id: index,
                            calendarId: "intervention-ponctuelle",
                            start: intervention.dateEffectiveDebut,
                            end: intervention.dateEffectiveFin,
                            isAllDay: false,
                            category: "time",
                            raw: intervention
                        });
                    }
				}else if(intervention.status=="intervention-realisee" && intervention.datePrevisionnelleDebut==intervention.dateEffectiveDebut){
                    if(intervention.dateEffectiveDebut && intervention.dateEffectiveFin){
                        calendarEvents.push({   // add evenement intervention effective
                            id: index,
                            calendarId: "intervention-effective",
                            start: intervention.dateEffectiveDebut,
                            end: intervention.dateEffectiveFin,
                            isAllDay: false,
                            category: "time",
                            raw: intervention
                        });
                    }
				}else{
                    if(intervention.dateEffectiveDebut && intervention.dateEffectiveFin){
                        calendarEvents.push({   // add evenement intervention effective
                            id: index,
                            calendarId: "intervention-effective",
                            start: intervention.dateEffectiveDebut,
                            end: intervention.dateEffectiveFin,
                            isAllDay: false,
                            category: "time",
                            raw: intervention
                        });
                    }
                    if(intervention.datePrevisionnelleDebut && intervention.datePrevisionnelleFin){
                        calendarEvents.push({   // add evenement intervention prévisionnelle
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
		},
		/**
        * GET interventions calendar events.
        *
        * @param Object Metadatas.
        * @return Promise
        */
        InterventionsMixins_getCalendarEvents: function(metadatas){
            return new Promise((resolve, reject)=>{
                this.InterventionsMixins_get(metadatas).then((interventions)=>{
                    let calendarEvents = this.InterventionsMixins_formatToCalendarEvents(interventions.datas);
                    resolve(calendarEvents);
                });
			});
        },
		/**
        * Create interventionsequipements.
        *
        * @param string idIntervention
        * @param array equipements
        */
        InterventionsMixins_createInterventionsEquipements: function(idIntervention, equipements){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/interventionsequipements/"+idIntervention+"?userId="+this.$app.appID, {datas: equipements}, (datas) => {
					this.$store.dispatch("InterventionsStore/addInterventionsEquipements", datas);
					resolve(datas);
                });
			});
        },
        /**
        * Delete intervention equipement.
        *
        * @param object interventionEquipement
        */
        InterventionsMixins_deleteInterventionEquipement: function(interventionEquipement){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.delete("/api/interventionsequipements/"+interventionEquipement.id+"?userId="+this.$app.appID, {datas: interventionEquipement}, (datas) => {
					this.$store.dispatch("InterventionsStore/deleteInterventionEquipement", interventionEquipement);
                    resolve(datas);
                });
			});
        },
        /**
        * Delete interventionsequipements.
        *
        * @param object interventionEquipement
        */
        InterventionsMixins_deleteInterventionsEquipements: function(interventionsEquipements){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.delete("/api/interventionsequipements?userId="+this.$app.appID, {datas: interventionsEquipements}, (datas) => {
					this.$store.dispatch("InterventionsStore/deleteInterventionsEquipements", interventionsEquipements);
                    resolve(datas);
                });
			});
        },
	},
};
