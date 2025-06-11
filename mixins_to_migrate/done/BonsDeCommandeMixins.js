
export default {
    methods:{
        /**
        * Get Bons de commande.
        *
        * @param object metadatas
        */
        BonsDeCommandeMixins_getBonsDeCommande: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/bons-de-commande", query, (datas, meta) => {
                    console.log("BC", datas);
                    this.$store.dispatch("BonsDeCommandeStore/set", datas);
                    this.$store.dispatch("BonsDeCommandeStore/setCounters", meta.counters);
                    resolve({"bonsDeCommande":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get Bon de commande by id.
        *
        * @param string idBonDeCommande
        */
        BonsDeCommandeMixins_getBonDeCommande: function(idBonDeCommande){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
                rc.get('/api/bon-de-commande/'+idBonDeCommande, query, (datas) => {
                    this.$store.dispatch("BonsDeCommandeStore/setSelectedItem", datas);
                    resolve(datas)
                });
			});
        },
        /**
        * POST bons-de-commande.
		*
        * @method BonsDeCommandeMixins_create
        * @param Array bonsDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_create: function(bonsDeCommande){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/bons-de-commande", {"datas":bonsDeCommande}, (datas) => {
                    console.log("AFTER POST bons de commande", datas);
                    this.$store.dispatch("BonsDeCommandeStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT bon-de-commande
        *
        * @method BonsDeCommandeMixins_update
        * @param Object bonDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_update: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/bon-de-commande/'+bonDeCommande.id, {datas: bonDeCommande}, (data) => {
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE bon-de-commande
        *
        * @method BonsDeCommandeMixins_delete
        * @param Object bonDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_delete: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/bon-de-commande/'+bonDeCommande.id, null, (data) => {
                    this.$store.dispatch("BonsDeCommandeStore/deleteItem", bonDeCommande.id);
                    resolve(data);
                });
			});
        },
        /**
        * PUT bon-de-commande : cancel
        *
        * @method BonsDeCommandeMixins_cancel
        * @param Object bonDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_cancel: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/bon-de-commande/'+bonDeCommande.id+'/cancel', {datas: bonDeCommande}, (data) => {
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * PUT bon-de-commande : skip sending
        *
        * @method BonsDeCommandeMixins_skipSending
        * @param Object bonDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_skipSending: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/bon-de-commande/'+bonDeCommande.id+'/skip-sending', {datas: bonDeCommande}, (data) => {
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * PUT demande validation.
        *
        * @method BonsDeCommandeMixins_demandeValidation
        * @param Object bonDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_demandeValidation: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/bon-de-commande/'+bonDeCommande.id+'/demande-validation', {datas: bonDeCommande}, (data) => {
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * Envoi commande.
		*
        * @method BonsDeCommandeMixins_envoiCommande
        * @param Object bonDeCommande,
        * @param String destinataire email
        * @param String destinataireCC email
        * @param Blob pdfBlob le pdf au format blob
        * @return Promise
        */
        BonsDeCommandeMixins_envoiCommande: function(bonDeCommande, destinataire, destinataireCC, pdfBlob){
            return new Promise((resolve, reject)=>{
                let pdfBase64 = null;
                let reader = new FileReader();
                reader.readAsDataURL(pdfBlob);
                reader.onloadend = ()=>{
                    pdfBase64 = reader.result;
                    console.log("pdfBase64", pdfBase64);
                    let envoiDatas = {
                        bonDeCommande: bonDeCommande,
                        dateEnvoi: moment().format("YYYY-MM-DD HH:mm"),
                        user:{
                            id: this.$app.idUser,
                            email: this.$app.email,
                            nom: this.$app.nom,
                            prenom: this.$app.prenom
                        },
                        destinataire: destinataire,
                        destinataireCC: destinataireCC,
                        pdfBase64: pdfBase64
                    };
                    this.$rc.post("/api/bon-de-commande/"+bonDeCommande.id+"/envoi-commande", {"datas":envoiDatas}, (datas) => {
                        this.$store.dispatch("BonsDeCommandeStore/updateItem", datas);
                        resolve(datas);
                    });
                };

			});
        },
        /**
        * Livraison BC.
		*
        * @method BonsDeCommandeMixins_livraison
        * @param Object bonDeCommande
        * @param Array itemsLivraison
        * @param Array consommablesStocks
        * @param Object depot
        * @return Promise
        */
        BonsDeCommandeMixins_livraison: function(bonDeCommande, itemsLivraison, depot=null){
            return new Promise((resolve, reject)=>{
                let datas = {
                    depot_id: depot?depot.id:null,
                    idUser: this.$app.idUser,
                    dateLivraison: moment().format("YYYY-MM-DD HH:mm"),
                    datas: itemsLivraison
                };
                this.$rc.put("/api/bon-de-commande/"+bonDeCommande.id+"/livraison", datas, (datas) => {
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", datas.bonDeCommande);
                    this.$store.dispatch("BonDeCommandeItemsStore/set", datas.bonDeCommandeItems);
                    resolve(datas);
                });
			});
        },
        /**
        * Livraison totale BC.
		*
        * @method BonsDeCommandeMixins_livraisonTotale
        * @param Object bonDeCommande
        * @param Array bonDeCommandeItems
        * @param Object depot
        * @return Promise
        */
        BonsDeCommandeMixins_livraisonTotale: function(bonDeCommande, depot=null){
            return new Promise((resolve, reject)=>{
                let datas = {
                    depot_id: depot?depot.id:null,
                    dateLivraison: moment().format("YYYY-MM-DD HH:mm"),
                    idUser: this.$app.idUser,
                    bonDeCommande: bonDeCommande
                };
                this.$rc.put("/api/bon-de-commande/"+bonDeCommande.id+"/livraison-totale", datas, (datas) => {
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", datas.bonDeCommande);
                    this.$store.dispatch("BonDeCommandeItemsStore/set", datas.bonDeCommandeItems);
                    resolve(datas);
                });
			});
        },
        /**
        * Non livre BC.
		*
        * @method BonsDeCommandeMixins_nonLivre
        * @param Object bonDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_nonLivre: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
                this.$rc.put("/api/bon-de-commande/"+bonDeCommande.id+"/non-livre", {"datas":bonDeCommande}, (datas) => {
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * Clone un BC.
        *
        * @method BonsDeCommandeMixins_clone
        * @param object bonDeCommande
        * @return object
        */
        BonsDeCommandeMixins_clone: function(bonDeCommande){
            return Object.assign({}, bonDeCommande, {
                id: null,
                numero: null,
                statut: "draft",
                statutLivraison: null,
                statutPaiement: null,
                dateCreation: moment().format("YYYY-MM-DD HH:mm")
            });
        },
        /**
        * Get Bon de commande historique.
        *
        * @param string bonDeCommande_id
        * @param object metadatas
        */
        BonsDeCommandeMixins_getHistorique: function(bonDeCommande_id, metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    metadatas: metadatas
                };
                rc.get('/api/bon-de-commande/'+bonDeCommande_id+"/historique", query, (datas) => {
                    this.$store.dispatch("BonsDeCommandeHistoriquesStore/set", datas);
                    resolve(datas)
                });
			});
        },
        /**
        * POST récupère le PDF du bon de commande.
		*
        * @method BonsDeCommandeMixins_getPDF
        * @param Array bonsDeCommande
        * @return Promise
        */
        BonsDeCommandeMixins_getPDF: function(idBonDeCommande, _options={}){
            console.log("OPTIONS", _options);
            return new Promise((resolve, reject)=>{
                console.log("Before post BC export pdf", idBonDeCommande, _options);
                let rc = this.$rc;
                rc.setOptions({
                    'responseType': 'blob',
                    'Content-Type':'application/pdf'
                });
				rc.post("/api/bon-de-commande/"+idBonDeCommande+"/export/pdf/S", _options, (response, remoteMetadatas) => {
                    let file = new Blob(
                        [response], 
                        { type: 'application/pdf' }
                    );
                    let fileURL = URL.createObjectURL(file);
                    resolve({fileURL: fileURL, blob: file});
                });
			});
        },
        BonsDeCommandeMixins_getRepartitionMontantHt: function(metadatas, _options={_stored: true}){
			return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
				this.$rc.get('/api/dashboard/bons-de-commande/repartition-montant-ht', query, (datas) => {
                    console.log("BC REPARTITION MONTANT HT +++++++++++++++", datas);
                    if(_options._stored) this.$store.dispatch("BonsDeCommandeStore/setRepartitionMontantHt", datas);
                    resolve(datas);
                });
			});
		},
        /**
         * @method BonDeCommandeMixins_export
         * @param Metadatas metadatas 
         * @param string filename 
         * @param string fileExtension 
         * @returns <Promise>
         */
        BonsDeCommandeMixins_export: function(metadatas,filename=null,fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
                // si je reinit a [] la pagination ne fonctionne plus
                metadatas.setDirectives([]);
    			var query = {
                    sites: this.$app.restrictionsite || '',
                    metadatas: metadatas.get()
                };
                let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
    			rc.get("/api/bons-de-commande/export/"+fileType, query, function(response,remoteMetadatas){
                    metadatas.setLimit(0,25);
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
        /**
        * Get Bons de commande createurs.
        *
        * @param object metadatas
        */
        BonsDeCommandeMixins_getCreateurs: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/bons-de-commande/createurs", query, (datas, meta) => {
                    this.$store.dispatch("BonsDeCommandeStore/setCreateurs", datas);
                    resolve({"createurs":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get Bons de commande validateurs.
        *
        * @param object metadatas
        */
        BonsDeCommandeMixins_getValidateurs: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/bons-de-commande/validateurs", query, (datas, meta) => {
                    this.$store.dispatch("BonsDeCommandeStore/setValidateurs", datas);
                    resolve({"validateurs":datas,"metadatas":meta});
                });
			});
        },
    }
};