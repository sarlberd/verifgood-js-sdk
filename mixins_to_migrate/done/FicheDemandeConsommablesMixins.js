export default {
    methods:{
        /**
        * Get Bons de sortie.
        *
        * @param object metadatas
        */
        FicheDemandeConsommablesMixins_getFiches: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/fiche-demande-consommables", query, (datas, meta) => {
                    console.log("DEMANDES CONSOS", datas);
                    this.$store.dispatch("FicheDemandeConsommablesStore/set", datas);
                    this.$store.dispatch("FicheDemandeConsommablesStore/setCounters", meta.counters);
                    resolve({"ficheDemandeConsommables":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get Bon de sortie by id.
        *
        * @param string idFiche
        */
        FicheDemandeConsommablesMixins_getFiche: function(idFiche){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
                rc.get('/api/fiche-demande-consommables/'+idFiche, query, (datas) => {
                    this.$store.dispatch("FicheDemandeConsommablesStore/setSelectedItem", datas);
                    resolve(datas)
                });
			});
        },
        /**
        * POST FicheDemandeConsommables.
		*
        * @method FicheDemandeConsommablesMixins_create
        * @param Array ficheDemandeConsommables
        * @return Promise
        */
        FicheDemandeConsommablesMixins_create: function(ficheDemandeConsommables){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/fiche-demande-consommables", {"datas":ficheDemandeConsommables}, (datas) => {
                    console.log("AFTER POST ficheDemandeConsommables", datas);
                    this.$store.dispatch("FicheDemandeConsommablesStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT fiche-demande-consommables
        *
        * @method FicheDemandeConsommablesMixins_update
        * @param Object ficheDemandeConsommables
        * @return Promise
        */
        FicheDemandeConsommablesMixins_update: function(fiche){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/fiche-demande-consommables/'+fiche.id, {datas: fiche}, (data) => {
                    this.$store.dispatch("FicheDemandeConsommablesStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * PUT fiche-demande-consommables close
        *
        * @method FicheDemandeConsommablesMixins_close
        * @param Object ficheDemandeConsommables
        * @return Promise
        */
        FicheDemandeConsommablesMixins_close: function(fiche){
            return new Promise((resolve, reject)=>{
                fiche.dateCloture = moment().format("YYYY-MM-DD HH:mm");
				this.$rc.put('/api/fiche-demande-consommables/'+fiche.id+"/close", {datas: fiche}, (data) => {
                    this.$store.dispatch("FicheDemandeConsommablesStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * PUT fiche-demande-consommables prise-en-compte
        *
        * @method FicheDemandeConsommablesMixins_priseEnCompte
        * @param Object ficheDemandeConsommables
        * @return Promise
        */
        FicheDemandeConsommablesMixins_priseEnCompte: function(fiche){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/fiche-demande-consommables/'+fiche.id+"/prise-en-compte", {datas: fiche}, (data) => {
                    this.$store.dispatch("FicheDemandeConsommablesStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * PUT fiche-demande-consommables en-attente
        *
        * @method FicheDemandeConsommablesMixins_priseEnCompte
        * @param Object ficheDemandeConsommables
        * @return Promise
        */
        FicheDemandeConsommablesMixins_enAttente: function(fiche){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/fiche-demande-consommables/'+fiche.id+"/en-attente", {datas: fiche}, (data) => {
                    this.$store.dispatch("FicheDemandeConsommablesStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE fiche-demande-consommables
        *
        * @method FicheDemandeConsommablesMixins_delete
        * @param Object ficheDemandeConsommables
        * @return Promise
        */
        FicheDemandeConsommablesMixins_delete: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/fiche-demande-consommables/'+bonDeCommande.id, null, (data) => {
                    this.$store.dispatch("FicheDemandeConsommablesStore/deleteItem", bonDeCommande.id);
                    resolve(data);
                });
			});
        },
        /**
        * Get FDC signataires.
        *
        * @param object metadatas
        * @param string type receveurs || donneurs
        */
        FicheDemandeConsommablesMixins_getSignataires: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/fiche-demande-consommables/signataires", query, (datas, meta) => {
                    console.log("FDC signataires", datas);
                    this.$store.dispatch("FicheDemandeConsommablesStore/setDemandeurs", datas);
                    resolve({"signataires":datas,"metadatas":meta});
                });
			});
        },
        /**
         * @method FicheDemandeConsommablesMixins_export
         * @param Metadatas metadatas 
         * @param string filename 
         * @param string fileExtension 
         * @returns 
         */
        FicheDemandeConsommablesMixins_export: function(metadatas, filename = null, fileExtension = "xlsx" ){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
    			var that = this;
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
    			rc.get("/api/fiche-demande-consommables/export/"+fileType, query, function(response,remoteMetadatas){
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
        }
    }
};
