export default {
    methods:{
        /**
        * Liste des documents.
        * @params Metadatas metadatas directives et filters à appliquer
        * @return Promise
        */
        DocumentsMixins_get: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get('/api/documents', query, (datas) => resolve(datas));
			});
        },
        /**
        * Liste des documents plans.
        * @params Metadatas metadatas directives et filters à appliquer
        * @return Promise
        */
        DocumentsMixins_getPlans: function(metadatas){
            return new Promise((resolve, reject)=>{
				var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite
				};
                this.$rc.get('/api/documents/plans', query, (datas, meta) => resolve({plans: datas, counters: meta.counters}));
			});
        },
        /**
        * post liste de documents [BACKEND not implemented]
        * @params Array documents liste des documents à poster
        * @return Promise
        */
        DocumentsMixins_create: function(documents){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					datas: documents
				};
				rc.post('/api/documents?userId='+this.$app.appID, query, (datas) => resolve(datas));
            });
        },
        /**
        * modifie un document [BACKEND not implemented]
        * @params Object document document à modifier
        * @return Promise
        */
        DocumentsMixins_update: function(document){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                var query = {
                    datas: [document]
                };
                rc.put("/api/document/"+document.id, query, (datas) => resolve(datas));
            });
        },
        /**
        * supprime un document [BACKEND not implemented]
        * @params Object document document à supprimer
        * @return Promise
        */
        DocumentsMixins_delete: function(document){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                rc.delete("/api/document/"+document.id+"?userId="+this.$app.appID, null, (datas) => resolve(datas));
            });
        }
    }
};
