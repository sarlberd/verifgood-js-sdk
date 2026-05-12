export default {
    data:function(){
        return {
            ConsommablesMixins:{
                newConsommable: {
					name: null,	// required
					nature: null,
					refExterne: null,
					marque: null,
					coutUnitaire: null,
					quantite: null,	// required
					quantiteMin: 5, // required
					numSerie: null,
					commentaire: null
				}
            }
        };
    },
    methods:{
        /**
        * Get consommables.
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getConsommables: function(metadatas, _options={_stored: true}){
			return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommables', query, (datas, meta) => {
                    if(_options._stored){
                        this.$store.dispatch("ConsommablesStore/set", datas);
                        if(meta && meta.counters) this.$store.dispatch("ConsommablesStore/setCounters", meta.counters);
                    }
                    resolve({"consommables":datas,"metadatas":meta});
                });
			});
		},
        /**
        * Get Consommable by id.
        *
        * @param string idConsommable
        */
        ConsommablesMixins_getConsommable: function(idConsommable){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
                rc.get('/api/consommable/'+idConsommable, query, (datas) => {
                    console.log("CONSOMMABLE", datas);
                    this.$store.dispatch("ConsommablesStore/setSelectedItem", datas);
                    resolve(datas)
                });
			});
        },
        /**
        * Get consommables étiquettes.
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getConsommablesEtiquettes: function(metadatas, _options={_stored: true}){
			return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommables/etiquettes', query, (datas, meta) => {
                    console.log("CONSOS TAGS", datas);
                    /*if(_options._stored){
                        this.$store.dispatch("ConsommablesStore/set", datas);
                        if(meta && meta.counters) this.$store.dispatch("ConsommablesStore/setCounters", meta.counters);
                    }*/
                    resolve({"etiquettes":datas,"metadatas":meta});
                });
			});
		},
        /**
        * Get consommables conditionnements colisage.
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getConsommablesConditionnementsColisage: function(metadatas){
			return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommables/conditionnements-colisage', query, (datas, meta) => {
                    console.log("CONDITIONNEMENTS", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
		},
        /**
        * Get consommables en stock.
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getConsommablesEnStock: function(metadatas){
			return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommables/en-stock', query, (datas, meta) => {
                    this.$store.dispatch("ConsommablesStore/set", datas);
                    if(meta && meta.counters) this.$store.dispatch("ConsommablesStore/setCounters", meta.counters);
                    resolve({"consommables":datas,"metadatas":meta});
                });
			});
		},
        /**
        * Get consommables non disponibles.
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getConsommablesNonDisponibles: function(metadatas){
			return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommables/non-disponibles', query, (datas, meta) => {
                    this.$store.dispatch("ConsommablesStore/set", datas);
                    if(meta && meta.counters) this.$store.dispatch("ConsommablesStore/setCounters", meta.counters);
                    resolve({"consommables":datas,"metadatas":meta});
                });
			});
		},
        /**
        * Get consommables en demande.
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getConsommablesEnDemande: function(metadatas){
			return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommables/en-demande', query, (datas, meta) => {
                    this.$store.dispatch("ConsommablesStore/set", datas);
                    if(meta && meta.counters) this.$store.dispatch("ConsommablesStore/setCounters", meta.counters);
                    resolve({"consommables":datas,"metadatas":meta});
                });
			});
		},
        /**
        * Get consommables à commander.
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getConsommablesACommander: function(metadatas){
			return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommables/a-commander', query, (datas, meta) => {
                    this.$store.dispatch("ConsommablesStore/set", datas);
                    if(meta && meta.counters) this.$store.dispatch("ConsommablesStore/setCounters", meta.counters);
                    resolve({"consommables":datas,"metadatas":meta});
                });
			});
		},
        /**
        * Get equipements du consommable.
        * @param Object consommable
        * @param Metadatas metadatas
        */
        ConsommablesMixins_getEquipements: function(consommable, metadatas){
			return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommable/'+consommable.id+'/equipements', query, (datas, meta) => {
                    this.$store.dispatch("EquipementsStore/set", datas);
                    if(meta && meta.counters) this.$store.dispatch("EquipementsStore/setCounters", meta.counters);
                    resolve({"equipements":datas,"metadatas":meta});
                });
			});
		},
        /**
        * POST consommables
        *
        * @method ConsommablesMixins_create
        * @param Object consommables
        * @return Promise
        */
        ConsommablesMixins_create: function(consommables){
            return new Promise((resolve, reject)=>{
				this.$rc.post('/api/consommables', consommables, (datas) => {
                    this.$store.dispatch("ConsommablesStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT consommable
        *
        * @method ConsommablesMixins_update
        * @param Object consommable
        * @return Promise
        */
        ConsommablesMixins_update: function(consommable){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/consommable/'+consommable.id, {datas: consommable}, (data) => {
                    this.$store.dispatch("ConsommablesStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * PUT consommables
        *
        * @method ConsommablesMixins_updateConsommables
        * @param Array consommables
        * @return Promise
        */
        ConsommablesMixins_updateConsommables: function(consommables){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/consommables', {datas: consommables}, (datas) => {
                    datas.forEach((consommable, i) => {
                        this.$store.dispatch("ConsommablesStore/updateItem", consommable);
                    });
                    resolve(datas);
                });
			});
        },
        /**
        * PUT consommable
        *
        * @method ConsommablesMixins_update
        * @param Object consommable
        * @return Promise
        */
        ConsommablesMixins_delete: function(consommable){
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/'+this.$app.appID+'/consommable/'+consommable.id, {datas: consommable}, (data) => {
                    this.$store.dispatch("ConsommablesStore/deleteItem", consommable);
                    resolve(data);
                });
			});
        },
        
        /**
        * DELETE consommables
        *
        * @method ConsommablesMixins_deleteMultiple
        * @param Object consommable
        * @return Promise
        */
        ConsommablesMixins_deleteMultiple: function(consommables){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/delete/consommables', {datas: consommables}, (data) => {
                    consommables.forEach((consommable)=>this.$store.dispatch("ConsommablesStore/deleteItem", consommable));
                    resolve(data);
                });
			});
        },
        /**
        * PUT consommable stock
        *
        * @method ConsommablesMixins_updateStock
        * @param Object consommable
        * @param Object stock
        * @return Promise
        */
        ConsommablesMixins_updateStock: function(consommable, stock){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/consommable/'+consommable.id+'/stock/'+stock.id, {datas: stock}, (data) => {
                    this.$store.dispatch("ConsommablesStore/updateItem", data.consommable);
                    this.$store.dispatch("ConsommableMouvementsStore/addItem", data.consommation);
                    resolve(data);
                });
			});
        },
        /**
        * Open a new tab to download excel file.
        *
        * @param Metadatas
        * @return Promise
        */
		ConsommablesMixins_getFile: function(metadatas,fileExtension="csv"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
    			var that = this;
                metadatas.setDirectives([]);
    			var query = {
                    metadatas: metadatas.get()
                };
                let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
    			rc.get("/api/consommables/export/"+fileType, query, function(response,remoteMetadatas){
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
                    link.setAttribute('download', 'Verifgood_consommables_'+moment().format("DD-MM-YYYY")+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
    			});
            });

		},
        /**
         * @deprecated utiliser dans equipement et lieu .vue
         * @param {*} idEquipement 
         * @returns 
         */
        ConsommablesMixins_getConsommablesForEquipement: function(idEquipement){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc; 
				var query = {};
				rc.get('/api/consommables/equipement/'+idEquipement, query, (data) => resolve(data));
			});
		},
        ConsommablesMixins_getEquipementConsommables: function(idEquipement){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					"userId": this.$app.appID,
                    "metadatas":{"directives":[],"filters":[]}
				};
				rc.get('/api/equipement/'+idEquipement+'/consommables', query, (data) => resolve(data));
			});
		},
        /**
         * @param {*} idTiers 
         * @returns 
         */
        ConsommablesMixins_getConsommablesForTiers: function(idTiers){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
				rc.get('/api/consommables/equipement/tiers/'+idTiers, query, (data) => resolve(data));
			});
		},
        ConsommablesMixins_createConsommableFournisseurs: function(consommableId, fournisseurs){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.post('/api/'+this.$app.appID+'/consommable/'+consommableId+'/fournisseurs', fournisseurs, (datas) => resolve(datas));
			});
		},
        ConsommablesMixins_removeConsommableFournisseurs: function(consommableId, fournisseur){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete("/api/"+this.$app.appID+"/consommable/"+consommableId+"/fournisseur/"+fournisseur.id, null, (datas) => resolve(datas));
			});
		},
		ConsommablesMixins_createConsommations: function(consommations, idMaintenance=null){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.post('/api/maintenance/'+idMaintenance+'/consommations', consommations, (datas) => resolve(datas));
			});
		},
        /**
         * @deprecated
         * @param {*} consommablesEquipements 
         * @returns 
         */
        ConsommablesMixins_createConsommablesEquipements: function(consommablesEquipements){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.post('/api/consommables/equipements', consommablesEquipements, (datas) => resolve(datas));
			});
		},
        /**
         * @param intger consommableId 
         * @param integer equipementId 
         * @returns Promise<>
         */
        ConsommablesMixins_removeConsommablesEquipements: function(consommableId, equipementId){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete(`/api/consommable/${consommableId}/equipement/${equipementId}`, null, (datas) => resolve(datas));
			});
		},
        ConsommablesMixins_removeConsommable: function(idconsommable){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/'+this.$app.appID+'/consommable/'+idconsommable, null, (datas) => resolve(datas));
			});
		},
        ConsommablesMixins_deleteConsommableMouvement: function(idConsommableMouvement){
			return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/consommable/mouvement/'+idConsommableMouvement+'?userId='+this.$app.appID, null, (datas) => resolve(datas));
			});
		},
		ConsommablesMixins_createConsommableMouvement: function(mouvement, idConsommable){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				mouvement.consommable_id = idConsommable;
				mouvement.userId = this.$app.appID;
				mouvement.user_id = this.$app.idUser;
				if(!mouvement.dateMouvement) mouvement.dateMouvement = moment().format("YYYY-MM-DD HH:mm:ss");
				rc.post('/api/consommables/mouvement?userId='+this.$app.appID, [mouvement], (data) => resolve(data));
			});
		},
		ConsommablesMixins_createOperationsConsommations: function(consommations, idfm){
			return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var operations = consommations.map( (consommation) => {
					return {
						dateOperation: consommation.date_mouvement? consommation.date_mouvement: consommation.dateMouvement,
						ficheSav_id: idfm,
						operation: "Consommation",
						flag: "consommation",
						consommableMouvement_id: consommation.id,
						idUser: this.$app.idUser
					};
				});
				// //console.log("OPERATIONS", operations);
				rc.post('/api/maintenance/'+idfm+'/operations', {"datas":operations}, (datas) => resolve(datas));
			});
		},
        /**
        * @param Metadatas metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
		ConsommablesMixins_getConsommations: function(metadatas, _options={_stored: true}){
			return new Promise((resolve, reject)=>{
				var query = {
                    "userId": this.$app.appID,
                    "metadatas":metadatas.get(),
                    "sites":this.$app.restrictionsite
				};
				this.$rc.get('/api/consommable/mouvements', query, (mouvements, metas) => {
                    if(_options._stored){
                        this.$store.dispatch("ConsommableMouvementsStore/set", mouvements);
                        if(metas && metas.counters) this.$store.dispatch("ConsommableMouvementsStore/setCounters", metas.counters);
                    }
                    resolve({"datas":mouvements,"metadatas":metas});
                });
			}).catch((reason) => {
                console.log("ConsommablesMixins_getConsommations", reason);
                reject(reason);
            });
		},
        /**
        * Open a new tab to download excel file.
        * @param Metadatas
        * @return Promise
        */
		ConsommablesMixins_getExcelFileModeleIntegration: function(filename="VG_modèle_importation_consommables"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
                // si je reinit a [] la pagination ne fonctionne plus
    			var query = {
                    userId:this.$app.appID,
                    sites: this.$app.restrictionsite || ''
                };
                rc.setOptions({
                    'responseType': 'blob',
                    'Content-Type':'application/vnd.ms-excel'
                });
    			rc.get("/api/consommables/integration/model", query, function(response,remoteMetadatas){
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
    			});
            });

		},
        /**
         * 
         */
        ConsommablesMixins_ImportModelConsommablesExcel:function(consommables){
            return new Promise((resolve, reject) => {
                this.$rc.post('/api/consommables/integration/model', consommables, (datas) => {
                    this.$store.dispatch("ConsommablesStore/addItems", datas);
                    resolve(datas);
                });
			})
            .catch(function(error) {
                console.log({error})
            });
        },
        ConsommablesMixins_ExportConsommables:function(metadatas,filename=null,fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite || ''
				};
                let fileType = fileExtension != "csv" ? "excel":"csv";
                rc.setOptions({
                    'responseType': 'blob',
                    'Content-Type':'application/vnd.ms-excel'
                });
    			rc.get("/api/consommable/mouvements/export/"+fileType, query, (response,remoteMetadatas)=>{
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
    			});
            });
        },
        ConsommablesMixins_getRepartitionQuantites: function(metadatas, _options={_stored: true}){
			return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/consommable/mouvements/repartition-quantites', query, (datas) => {
                    console.log("REPARTITION QUANTITES+++++++++++++++", datas);
                    if(_options._stored) this.$store.dispatch("ConsommableMouvementsStore/setRepartitionQuantites", datas);
                    resolve(datas);
                });
			});
		},
        /**
        * @param Metadatas metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
		ConsommablesMixins_getConsommableMouvementsDemandeurs: function(metadatas, _options={_stored: true}){
			return new Promise((resolve, reject)=>{
				var query = {
                    "userId": this.$app.appID,
                    "metadatas":metadatas.get(),
                    "sites":this.$app.restrictionsite
				};
				this.$rc.get('/api/consommable/mouvements/demandeurs', query, (demandeurs, metas) => {
                    if(_options._stored){
                        this.$store.dispatch("ConsommableMouvementsStore/setDemandeurs", demandeurs);
                    }
                    resolve({"datas":demandeurs,"metadatas":metas});
                });
			}).catch((reason) => {
                reject(reason);
            });
		},
    },
    computed: {

    }
};
