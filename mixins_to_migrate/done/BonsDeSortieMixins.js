export default {
    methods:{
        /**
        * Get Bons de sortie.
        *
        * @param object metadatas
        */
        BonsDeSortieMixins_getBonsDeSortie: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/bons-de-sortie", query, (datas, meta) => {
                    console.log("BC", datas);
                    this.$store.dispatch("BonsDeSortieStore/set", datas);
                    this.$store.dispatch("BonsDeSortieStore/setCounters", meta.counters);
                    resolve({"bonsDeSortie":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get Bon de sortie by id.
        *
        * @param string idBonDeSortie
        */
        BonsDeSortieMixins_getBonDeSortie: function(idBonDeSortie){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
                rc.get('/api/bons-de-sortie/'+idBonDeSortie, query, (datas) => {
                    this.$store.dispatch("BonsDeSortieStore/setSelectedItem", datas);
                    resolve(datas)
                });
			});
        },
        /**
        * POST bons-de-commande.
		*
        * @method bonsDeSortieMixins_create
        * @param Array bonsDeSortie
        * @return Promise
        */
        BonsDeSortieMixins_create: function(bonsDeSortie, ficheDemandeConsommable=null){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/bons-de-sortie", {datas: bonsDeSortie, ficheDemandeConsommable: ficheDemandeConsommable}, (datas) => {
                    console.log("AFTER POST bonsDeSortie", datas);
                    this.$store.dispatch("BonsDeSortieStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT bons-de-sortie
        *
        * @method bonsDeSortieMixins_update
        * @param Object bonDeSortie
        * @return Promise
        */
        BonsDeSortieMixins_update: function(bonDeSortie){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/bon-de-sortie/'+bonDeSortie.id, {datas: bonDeSortie}, (data) => {
                    this.$store.dispatch("BonsDeSortieStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE bons-de-sortie
        *
        * @method bonsDeSortieMixins_delete
        * @param Object bonDeSortie
        * @return Promise
        */
        BonsDeSortieMixins_delete: function(bonDeSortie){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/bons-de-sortie/'+bonDeSortie.id, null, (data) => {
                    this.$store.dispatch("BonsDeSortieStore/deleteItem", bonDeSortie.id);
                    resolve(data);
                });
			});
        },
        /**
        * Get Bons de sortie signataires.
        *
        * @param object metadatas
        * @param string type receveurs || donneurs
        */
        BonsDeSortieMixins_getSignataires: function(metadatas, type="receveurs"){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/bons-de-sortie/"+type, query, (datas, meta) => {
                    console.log("BS "+type, datas);
                    if(type=="receveurs") this.$store.dispatch("BonsDeSortieStore/setReceveurs", datas);
                    else if(type=="donneurs") this.$store.dispatch("BonsDeSortieStore/setDonneurs", datas);
                    resolve({"signataires":datas,"metadatas":meta});
                });
			});
        },
    }
};