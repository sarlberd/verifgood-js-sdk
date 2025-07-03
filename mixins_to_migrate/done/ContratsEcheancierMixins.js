/**
* @module ContratsEcheancierMixins
*/
export default {
	methods: {
        /**
        * Query : get echeance for contrat.
        * @method ContratsEcheancierMixins_getEcheancierContrat
        * @param integer ContratEcheanceId
        * @return Promise
        */
        ContratsEcheancierMixins_getContratEcheances:function(contratEcheanceId){
            return new Promise((resolve, reject) => {
                let query = {
                    "metadatas": {
                        "directives":[],
                        "filters":[]
                    },
                    "userId":this.$app.appID
                };
                this.$rc.get("/api/contrat/"+contratEcheanceId+"/echeances", query, (datas) => {
    				resolve(datas);
    			});
            });
        },
        /**
        * Query : create echeances contrats.
        * @method ContratsEcheancierMixins_createContratEcheance
        * @param {Object} datas - contrat object
        * @return Promise
        */
		ContratsEcheancierMixins_create: function(contratsEcheances){
            return new Promise((resolve, reject) => {
                this.$rc.post("/api/contrats/echeances?userId="+this.$app.appID, contratsEcheances, (datas) => resolve(datas));
            });
		},
        /**
        * Update contrat Echeance.
        * @method ContratsEcheancierMixins_createContratEcheance
        * @param object contratEcheance
        * @return Promise
        */
        ContratsEcheancierMixins_update:function(contratEcheance){
            return new Promise((resolve, reject) => {
                this.$rc.put("/api/contrat/echeance/"+contratEcheance.id+"?userId="+this.$app.appID, contratEcheance, (datas) => resolve(datas));
            });
        },
        /**
        * Query : delete contrat Echeance.
        * @method ContratsEcheancierMixins_deleteContratEcheance
        * @param {Object} contratEcheance - contratEcheance
        * @return Promise
        */
		ContratsEcheancierMixins_delete: function(contratEcheance, callback){
            return new Promise((resolve, reject) => {
                this.$rc.delete("/api/contrat/echeance/"+contratEcheance.id+"?userId="+this.$app.appID, contratEcheance, (datas) => resolve(datas));
            });
		}

	},
};
