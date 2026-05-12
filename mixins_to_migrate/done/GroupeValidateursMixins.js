export default {
    methods:{
        /**
        * Get GroupeValidateurs.
        *
        * @method GroupeValidateursMixins_getGroupeValidateurs
        * @param object metadatas
        * @return Promise
        */
        GroupeValidateursMixins_getGroupeValidateurs: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/groupe-validateurs", query, (datas, meta) => {
                    console.log("GROUPE VALIDATEURS", datas);
                    this.$store.dispatch("GroupeValidateursStore/set", datas);
                    resolve({"groupeValidateurs":datas,"metadatas":meta});
                });
			});
        },
        /**
        * POST GroupeValidateurs.
		*
        * @method GroupeValidateursMixins_create
        * @param Array groupeValidateurs
        * @return Promise
        */
        GroupeValidateursMixins_create: function(groupeValidateurs){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/groupe-validateurs", {"datas":groupeValidateurs}, (datas) => {
                    console.log("AFTER POST groupeValidateurs", datas);
                    this.$store.dispatch("GroupeValidateursStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT GroupeValidateurs
        *
        * @method GroupeValidateursMixins_update
        * @param object groupeValidateurs
        * @return Promise
        */
        GroupeValidateursMixins_update: function(groupeValidateurs){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/groupe-validateur/'+groupeValidateurs.id, {datas: groupeValidateurs}, (data) => {
                    this.$store.dispatch("GroupeValidateursStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE GroupeValidateurs
        *
        * @method GroupeValidateursMixins_delete
        * @param object groupeValidateurs
        * @return Promise
        */
        GroupeValidateursMixins_delete: function(groupeValidateurs){
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/groupe-validateur/'+groupeValidateurs.id, null, (data) => {
                    this.$store.dispatch("GroupeValidateursStore/deleteItem", groupeValidateurs.id);
                    resolve(data);
                }, (err)=>{
                    reject(err);
                });
			});
        },
    }
};
