export default {
    methods:{
        /**
        * Get Bon de commande items.
        *
        * @param object metadatas
        */
        BonDeCommandeItemsMixins_get: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/items/bons-de-commande", query, (datas, meta) => {
                    console.log("BC", datas);
                    this.$store.dispatch("BonDeCommandeItemsStore/set", datas);
                    //this.$store.dispatch("BonDeCommandeItemsStore/setCounters", meta.counters);
                    resolve({"bonDeCommandeItems":datas,"metadatas":meta});
                });
			});
        },
        /**
        * POST bon-de-commande-items.
		*
        * @method BonDeCommandeItemsMixins_create
        * @param Array bonDeCommandeItems
        * @return Promise
        */
        BonDeCommandeItemsMixins_create: function(bonDeCommandeItems){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/items/bons-de-commande", {"datas":bonDeCommandeItems}, (datas) => {
                    console.log("AFTER POST bons de commande items", datas);
                    this.$store.dispatch("BonDeCommandeItemsStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT bon-de-commande-item
        *
        * @method BonDeCommandeItemsMixins_update
        * @param object bonDeCommandeItem
        * @return Promise
        */
        BonDeCommandeItemsMixins_update: function(bonDeCommandeItem){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/item/'+bonDeCommandeItem.id+'/bon-de-commande', {datas: bonDeCommandeItem}, (data) => {
                    this.$store.dispatch("BonDeCommandeItemsStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE bon-de-commande-item
        *
        * @method BonDeCommandeItemsMixins_delete
        * @param object bonDeCommandeItem
        * @return Promise
        */
        BonDeCommandeItemsMixins_delete: function(bonDeCommandeItem){
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/item/'+bonDeCommandeItem.id+'/bon-de-commande', null, (data) => {
                    this.$store.dispatch("BonDeCommandeItemsStore/deleteItem", bonDeCommandeItem.id);
                    resolve(data);
                });
			});
        },
        /**
        * Get BCitems && Clone.
        *
        * @method BonDeCommandeItemsMixins_getClones
        * @param object bonDeCommande
        * @return Promise
        */
        BonDeCommandeItemsMixins_getClones: function(metadatas){
            return new Promise((resolve, reject)=>{
                this.BonDeCommandeItemsMixins_get(metadatas).then((datas)=>{
                    let bonDeCommandeItemsClones = datas.bonDeCommandeItems.map((item)=>{
                        return Object.assign({}, item, {
                            quantiteLivree: 0,
                            bonDeCommande_id: null,
                            id: null,
                            uid: null
                        });
                    });
                    resolve(bonDeCommandeItemsClones);
                });
			});
        }
    }
};
