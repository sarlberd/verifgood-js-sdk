
export default {
    methods:{
        /**
        * @deprecated
        */
        equipementsMixins_getEquipementVerifications: function(equipement_id, metadatas='{"directives":[],"filters":[]}'){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
                var query = {
                    "userId": this.$app.appID,
                    "metadatas": metadatas
                };
                rc.get('/api/equipement/'+equipement_id+'/verifications', query, function(reponses){
                    resolve({"datas":reponses});
                });
            });
        },
        /**
        * Get equipement by id.
        *
        * @param integer equipementId
        * @return Promise
        */
        equipementsMixins_getEquipement: function(idEquipement, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
                this.$vg.equipements.getById(idEquipement).then((equipement)=>
                    {
                        if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("EquipementsStore/setSelectedItem", equipement);
                        resolve(equipement);
                    });
			});
        },
        /**
        * Get equipement by qrcode.
        *
        * @param string qrcode
        * @return Promise
        */
        equipementsMixins_getEquipementByQrCode: function(code, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
                this.$vg.equipements.getByCode(code).then((equipement)=>{
                    if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("EquipementsStore/setSelectedItem", equipement);
                    resolve(equipement);
                }).catch((error)=>{
                    console.log("Error in getEquipementByQrCode");
                    console.log(error);
                    reject(error);
                });
            });
        },
        /**
        * Get rapport assets.
        *
        * @param integer equipementId
        * @return Promise
        */
        equipementsMixins_getRapportAssets: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    "userId": this.$app.appID,
                    "metadatas":metadatas.get(),
                    "sites":this.$app.restrictionsite
				};
                rc.get("/api/equipements/valeurs-financieres", query, (equipements, meta) => {
                    this.$store.dispatch("EquipementsStore/set", equipements);
                    this.$store.dispatch("EquipementsStore/addMetadatasObject", metadatas);
                    this.$store.dispatch("EquipementsStore/setCounters", meta.counters);
                    resolve(equipements);
                });
			});
        },
                /**
        * Open a new tab to download excel file.
        * @param Metadatas
        * @return Promise
        */
		equipementsMixins_getRapportAssetsExcelFile: function(metadatas,fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
                // si je reinit a [] la pagination ne fonctionne plus
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
    			rc.get("/api/equipements/valeurs-financieres/export/"+fileType, query, function(response,remoteMetadatas){
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
                    link.setAttribute('download', 'rapport_assets_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
    			});
            });

		},
        /**
        * @param Metadatas metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        equipementsMixins_getEquipements: function(metadatas, _options={stored: true}){
            return new Promise((resolve,reject)=>{
                this.$vg.equipements.restrictionsite = this.$app.restrictionsite;
                this.$vg.equipements.getAll(metadatas).then((equipementsApiResponse)=>{
                    if(_options.stored){
                        this.$store.dispatch("EquipementsStore/set", equipementsApiResponse.datas);
                        this.$store.dispatch("EquipementsStore/addMetadatasObject", metadatas);
                        this.$store.dispatch("EquipementsStore/setCounters", equipementsApiResponse.metadatas.counters);
                    }
                    resolve(equipementsApiResponse);
                }).catch((error)=>{
                    console.log("Error in getEquipements");
                    console.log(error);
                    reject(error);
                });
            });
        },
        /**
         * @param String site
        * @param Metadatas metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        equipementsMixins_getEquipementsTachesActivesSites: function(site, metadatas){
            return new Promise((resolve,reject)=>{
                var query = {
                    "userId": this.$app.appID,
                    "site": site,
                    "metadatas":metadatas.get()
                };
                this.$rc.get('/api/equipements/taches/active/site', query, (equipements, meta)=>{
                    resolve({"datas":equipements,"metadatas":meta});
                });
            });
        },
        /**
        * Open a new tab to download excel file.
        * @param Metadatas
        * @return Promise
        */
		equipementsMixins_getExcelFileModeleIntegration: function(filename="VG_modèle_importation_equipements"){
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
    			rc.get("/api/equipements/integration/model", query, function(response,remoteMetadatas){
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
        * Open a new tab to download excel file.
        * @param Metadatas
        * @return Promise
        */
		equipementsMixins_getExcelFile: function(metadatas,filename=null,fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
    			var that = this;
                // si je reinit a [] la pagination ne fonctionne plus
                metadatas.setDirectives([]);
    			var query = {
                    userId:this.$app.appID,
                    sites: this.$app.restrictionsite || '',
                    metadatas: metadatas.get(),
                    isUserTypeAsDemandeur:0
                };
                let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
    			rc.get("/api/equipements/export/"+fileType, query, function(response,remoteMetadatas){
                    //metadatas.setLimit(0,25);
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
                    link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
    			});
            });

		},

        equipementsMixins_createEquipements:function(equipements){
            return new Promise((resolve, reject) => {
                equipements.forEach((equipement, i) => {
                    if(!equipement.marker && equipement.marker == null) delete equipement.marker;
                    if (navigator.geolocation) {
                        try{
                            navigator.geolocation.getCurrentPosition(function(position){
                                equipement.posY = position.coords.latitude;
                                equipement.posX = position.coords.longitude;
                            });
                        }catch(err){
                            console.warn("Cannot get position xy");
                        }
                    } else {}
                });
                this.$vg.equipements.create(equipements).then((equipements)=>{
                    resolve(equipements);
                    this.$store.dispatch("EquipementsStore/addItems", equipements);
                }).catch((error)=>{
                    reject(error);
                });
            });

        },

        equipementsMixins_ImportModelEquipementsExcel:function(equipements){
			var rc = this.$rc;
            return new Promise((resolve, reject) => {
                rc.post("/api/equipements/integration/model", equipements, (datas)=>{
                    resolve(datas);
                });
			})
            .catch(function(error) {
                console.log({error})
            });
        },
        equipementsMixins_sortirEquipement:function(equipement,callback){
			var rc = this.$rc;
            var that = this;

            // //console.log("equipement",equipement);
            rc.useHostv2();
            rc.post("/api/equipement/sortie", equipement, function(reponses){
                callback && callback(reponses);
            });



        },
        equipementsMixins_remplacerEquipement:function(sortie, maintenance){
            return new Promise((resolve, reject) => {
                this.$rc.post("/api/maintenance/"+maintenance.id+"/equipement/remplacement", sortie, (datas)=>{
                    //this.$store.dispatch("EquipementsStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * Update equipement.
        *
        * @param object equipement
        * @return promise
        *
        */
        equipementsMixins_update: function(equipement, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
                this.$vg.equipements.update(equipement).then((equipement)=>{
                    if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("EquipementsStore/updateItem", equipement);
                    resolve(equipement);
                });
            });

		},
        /**
        * Update equipements.
        *
        * @param array equipements
        * @return promise
        *
        */
        equipementsMixins_update_equipements: function(equipements){
			var that = this;
			var rc = this.$rc;
            return new Promise((resolve, reject)=>{
                rc.put("/api/equipements", equipements, (datas)=>{
                    datas.forEach((equipement, i) => {
                        this.$store.dispatch("EquipementsStore/updateItem", equipement);
                    });
                    resolve(datas);
				});
            });

		},
        /**
        * Delete equipement.
        *
        * @param object equipement
        * @return promise
        *
        */
        equipementsMixins_delete: function(equipement){
            return new Promise((resolve, reject)=>{
                this.$vg.equipements.remove(equipement.id).then((equipement)=>{
                    this.$store.dispatch("EquipementsStore/removeItem", equipement);
                    resolve(equipement);
                });
            });

		},
        /**
        * Creer des equipements globaux dans les container lieux générique des sites de la famille donnée.
        *
        * @param string famille
        * @param array equipements [{libel_equipement:"abcd", categorie: ...}, ...]
        */
        equipementsMixins_createEquipementsGlobauxFamilleSite:function(famille, equipements){
            return new Promise((resolve, reject)=>{
				this.$rc.post('/api/sites/'+famille+'/equipements/globaux?userId='+this.$app.appID, equipements, (datas) => {
                    this.$store.dispatch("LieuxStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
         * calcul depreciation equipment. date misEnService tauxDepreciationAnnuel
         * et valeur Achat sont requis pour que cela fonctionne.
         * @param {object} equipement
         * @return {object} equipement with new properties
         */
        equipementsMixins_calculDepreciation:function(equipement){
            equipement.depreciationAnnuelle = 0;
            equipement.depreciationMensuelle = 0;
            equipement.depreciationCumulee = 0;
            equipement.depreciationRestante = 0;
            equipement.dateFin = null;
            equipement.moisUtilisation = "-";
            if(!equipement.miseEnService){
                return equipement;
            }
            let tauxDepreciationAnnuel = Number(equipement.tauxDepreciationAnnuel);
            let tauxDepreciationEnPourcent = Number.isNaN(tauxDepreciationAnnuel) ? 0 : tauxDepreciationAnnuel;

            var valeurAchat = Number(equipement.valeurAchat);
            valeurAchat = Number.isNaN(valeurAchat) || valeurAchat === 0 ? 0 : valeurAchat;
            equipement.valeurAchat = valeurAchat;

            let dateDebut = equipement.miseEnService ? equipement.miseEnService : equipement.created_at;
            if(!equipement.miseEnService || equipement.miseEnService.length==0) equipement.miseEnService = equipement.created_at;

            equipement.depreciationRestante = valeurAchat;
            equipement.dateFin = moment(dateDebut).add( 100/tauxDepreciationEnPourcent ,'years');
            equipement.moisUtilisation = moment(moment()).diff(moment(dateDebut), "months");
            equipement.depreciationAnnuelle = Number(tauxDepreciationEnPourcent)/100*valeurAchat ;
            equipement.depreciationMensuelle = (Number(tauxDepreciationEnPourcent)/100*valeurAchat)/12 ;

            if(equipement.moisUtilisation != 0){
                let decote = equipement.depreciationMensuelle*equipement.moisUtilisation;
                equipement.depreciationCumulee = decote;
                if(decote > valeurAchat){
                    equipement.depreciationCumulee = valeurAchat;
                }
                if(decote < valeurAchat){
                    let depreciationRestante = equipement.depreciationMensuelle*(moment(equipement.dateFin).diff(moment(dateDebut), "months")-equipement.moisUtilisation );
                    equipement.depreciationRestante = depreciationRestante;
                }
            }



            return equipement;
        }
    }
}
