/**
* @module MouvementsEquipementsMixins
*
*/
export default {
	methods: {
		/**
        * GET mouvementsEquipements.
		*
        * @method MouvementsEquipementsMixins_get
        * @param {Metadatas} metadatas
        * @return {Promise}
        */
        MouvementsEquipementsMixins_get: function(metadatas){
            return new Promise((resolve, reject) => {
                let query = {
                    metadatas: metadatas.get()
                };
                this.$rc.get("/api/mouvements", query, (datas, meta) => {
					this.$store.dispatch("MouvementsEquipementsStore/set", datas);
	                //this.$store.dispatch("MouvementsEquipementsStore/setCounters", meta.counters);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
		/**
        * GET mouvementsEquipements.
		*
        * @method MouvementsEquipementsMixins_getMouvementsEquipementsId
        * @param {integer} id
        * @return {Promise}
        */
        MouvementsEquipementsMixins_getMouvementsEquipementsId: function(id){
            return new Promise((resolve, reject)=>{
                let query = {};
                this.$rc.get("/api/mouvements/"+id, query, (mouvementsEquipements, meta) => {
                    this.$store.dispatch("MouvementsEquipementsStore/setSelectedItem", mouvementsEquipements);
                    resolve(mouvementsEquipements);
                });
            });
        },
		/**
        * Update mouvementsEquipements.
        * @method MouvementsEquipementsMixins_update
        * @param {object} mouvementsEquipements
        * @return {Promise}
        */
        MouvementsEquipementsMixins_update: function(mouvementsEquipements){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {

				};
                rc.put("/api/mouvements/"+mouvementsEquipements.id, mouvementsEquipements, (mouvementsEquipements) => {
                    this.$store.dispatch("MouvementsEquipementsStore/setSelectedItem", mouvementsEquipements);
                    this.$store.dispatch("MouvementsEquipementsStore/updateItem", mouvementsEquipements);
                    // gérer l'update dans la collection courante
                    resolve(mouvementsEquipements);
                });
			});
        },
        /**
        * Create mouvementsEquipements.
        * @method MouvementsEquipementsMixins_create
        * @param array mouvementsEquipements
        * @return {Promise}
        */
        MouvementsEquipementsMixins_create: function(mouvementsEquipements,type){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/mouvements/"+type, mouvementsEquipements, (mouvementsEquipements) => {
                    this.$store.dispatch("MouvementsEquipementsStore/setSelectedItem", mouvementsEquipements);
                    resolve(mouvementsEquipements); 
                });
			});
        },
        /**
        * Delete mouvementsEquipements.
        * @method MouvementsEquipementsMixins_delete
        * @param {object} mouvementsEquipements
        * @return {Promise}
        */
        MouvementsEquipementsMixins_delete: function(mouvementsEquipements){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.delete("/api/mouvements/"+mouvementsEquipements.id, mouvementsEquipements, (datas) => {
                    this.$store.dispatch("MouvementsEquipementsStore/deleteItem", mouvementsEquipements["id"]);
                    resolve(datas);
                });
			});
        },
        
        /**
        * Get mouvements signataires.
        *
        * @param object metadatas
        * @param string type receveurs || donneurs
        */
        MouvementsEquipementsMixins_getMouvementsSignataires: function(metadatas, type="receveurs"){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/mouvements/"+type, query, (datas, meta) => {
                    console.log("Mouvements "+type, datas);
                    if(type=="receveurs") this.$store.dispatch("MouvementsEquipementsStore/setReceveurs", datas);
                    else if(type=="donneurs") this.$store.dispatch("MouvementsEquipementsStore/setDonneurs", datas);
                    resolve({"signataires":datas,"metadatas":meta});
                });
			});
        },
        /**
         * @method MouvementsEquipementsMixins_export
         * @param Metadatas metadatas 
         * @param string filname 
         * @param string fileExtension 
         * @returns 
         */
        MouvementsEquipementsMixins_export: function(metadatas, filename = null, fileExtension = "xlsx"){
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
    			rc.get("/api/mouvements/export/"+fileType, query, function(response,remoteMetadatas){
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
