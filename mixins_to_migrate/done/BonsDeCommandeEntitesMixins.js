export default {
    methods:{
        /**
        * Get Bons de commande entites.
        *
        * @param object metadatas
        */
        BonsDeCommandeEntitesMixins_getEntites: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/bons-de-commande-entites", query, (datas, meta) => {
                    console.log("BC entites", datas);
                    this.$store.dispatch("BonsDeCommandeEntitesStore/set", datas);
                    resolve({"bonsDeCommandeEntites":datas,"metadatas":meta});
                });
			});
        },
        /**
        * POST bons-de-commande-entites.
		*
        * @method BonsDeCommandeEntitesMixins_create
        * @param Array bonsDeCommandeEntites
        * @return Promise
        */
        BonsDeCommandeEntitesMixins_create: function(bonsDeCommandeEntites){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/bons-de-commande-entites", {"datas": bonsDeCommandeEntites}, (datas) => {
                    this.$store.dispatch("BonsDeCommandeEntitesStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT bon-de-commande-entite
        *
        * @method BonsDeCommandeEntitesMixins_update
        * @param Object bonsDeCommandeEntites
        * @return Promise
        */
        BonsDeCommandeEntitesMixins_update: function(bonsDeCommandeEntite){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/bons-de-commande-entite/'+bonsDeCommandeEntite.id, {datas: bonsDeCommandeEntite}, (data) => {
                    this.$store.dispatch("BonsDeCommandeEntitesStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE bon-de-commande-entite
        *
        * @method BonsDeCommandeEntitesMixins_delete
        * @param Object bonsDeCommandeEntite
        * @return Promise
        */
        BonsDeCommandeEntitesMixins_delete: function(bonsDeCommandeEntite){
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/bons-de-commande-entite/'+bonsDeCommandeEntite.id, null, (data) => {
                    this.$store.dispatch("BonsDeCommandeEntitesStore/deleteItem", bonsDeCommandeEntite.id);
                    resolve(data);
                });
			});
        }
    }
};
