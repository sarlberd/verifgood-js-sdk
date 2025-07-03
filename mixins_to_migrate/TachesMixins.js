import moment from "moment";

export default {
    data:function(){
        return {

        }
    },
    methods:{
        /**
         * Get Taches.
         * @method tachesMixins_getTaches
         * @param {Metadatas} Metadatas
         * @return {Promise}
        */
        tachesMixins_getTaches:function(metadatas, _options = {_stored: true, _restrictionSites: null}){
            return new Promise((resolve, reject)=>{
                let query = {
                    metadatas: metadatas.get()
                };
                if(_options._restrictionSites) query.sites = _options._restrictionSites;
                this.$rc.get("/api/taches", query, (taches, meta) => {
                    console.log("Taches",taches);
                    if(_options._stored){
                        this.$store.dispatch("TachesStore/set", taches);
                        this.$store.dispatch("TachesStore/setCounters", meta.counters);
                    }
                    resolve(taches);
                });
            });
        },
        /**
         * Get Taches.
         * @method tachesMixins_getTache
         * @param {Metadatas} Metadatas
         * @return {Promise}
        */
        tachesMixins_getTache:function(id){
            return new Promise((resolve, reject)=>{
                let query = {};

                this.$rc.get("/api/tache/"+id, query, (tache, meta) => {
                    this.$store.dispatch("TachesStore/setSelectedItem", tache);
                    resolve(tache);
                });
            });
        },
        /**
         * Create Taches.
         * @method tachesMixins_createTaches
         * @param {array} taches array of tache object
         * @return {Promise}
        */
        tachesMixins_createTaches:function(taches, restrictionSites=null){
            return new Promise((resolve, reject)=>{
                let query = {
                    datas: taches
                };
                if(restrictionSites) query.restrictionSites = restrictionSites;
                this.$rc.post("/api/taches", query, (datas) => {
                    this.$store.dispatch("TachesStore/addItems", datas);
                    resolve(datas);
                });
            });
        },
        /**
         * Update Taches.
         * @method tachesMixins_updateTache
         * @param {object} tache
         * @return {Promise}
        */
        tachesMixins_updateTache:function(tache, updatedTacheSites=null){
            return new Promise((resolve, reject)=>{
                let datasTache = Object.assign({}, {}, tache);
                delete datasTache.checkpoints;
                if(updatedTacheSites) datasTache.tacheSites = updatedTacheSites;
                this.$rc.put("/api/tache/"+tache.id, {"datas": datasTache}, (datas) => {
                    this.$store.dispatch("TachesStore/updateItem", datas);
                    resolve(datas);
                });
            });
        },
        /**
         * Delete Taches.
         * @method tachesMixins_deleteTache
         * @param {object} tache
         * @return {Promise}
        */
        tachesMixins_deleteTache:function(tache){
            return new Promise((resolve, reject)=>{
                this.$rc.delete("/api/tache/"+tache.id, {"datas":tache}, (datas) => {
                    this.$store.dispatch("TachesStore/deleteItem", datas);
                    this.$store.dispatch("TachesStore/setSelectedItem", null);
                    resolve(datas);
                });
            });
        },
        /**
        * Open a new tab to download excel file.
        * @param Metadatas
        * @return Promise
        */
         tachesMixins_getExcelFile: function(metadatas,filename=null,fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
    			var query = {
                    userId:this.$app.appID,
                    metadatas: metadatas.get()
                };
                let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
    			rc.get("/api/taches/export/"+fileType, query, function(response){
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
    } 
}
