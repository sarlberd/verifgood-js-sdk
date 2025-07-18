export default {
    methods:{
        /**
        * Get Depots.
        *
        * @param object metadatas
        */
        StocksMixins_getDepots: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/depots", query, (datas, meta) => {
                    console.log("DEPOTS", datas);
                    this.$store.dispatch("StocksStore/setDepots", datas);
                    resolve({"depots":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get Stocks.
        *
        * @param object metadatas
        */
        StocksMixins_getStocks: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/stocks", query, (datas, meta) => {
                    console.log("STOCKS", datas);
                    this.$store.dispatch("StocksStore/set", datas);
                    this.$store.dispatch("StocksStore/setCounters", meta.counters);
                    resolve({"stocks":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get Bon de sortie by id.
        *
        * @param string idFiche
        */
        StocksMixins_getFiche: function(idFiche){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
                rc.get('/api/fiche-demande-consommables/'+idFiche, query, (datas) => {
                    this.$store.dispatch("StocksStore/setSelectedItem", datas);
                    resolve(datas)
                });
			});
        },
        /**
        * POST Stocks.
		*
        * @method StocksMixins_create
        * @param Array Stocks
        * @return Promise
        */
        StocksMixins_create: function(Stocks){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/fiche-demande-consommables", {"datas":Stocks}, (datas) => {
                    console.log("AFTER POST Stocks", datas);
                    this.$store.dispatch("StocksStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT fiche-demande-consommables
        *
        * @method BonsDeCommandeMixins_update
        * @param Object bonDeCommande
        * @return Promise
        */
        StocksMixins_update: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/fiche-demande-consommables/'+bonDeCommande.id, {datas: bonDeCommande}, (data) => {
                    this.$store.dispatch("StocksStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE fiche-demande-consommables
        *
        * @method BonsDeCommandeMixins_delete
        * @param Object bonDeCommande
        * @return Promise
        */
        StocksMixins_delete: function(bonDeCommande){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/fiche-demande-consommables/'+bonDeCommande.id, null, (data) => {
                    this.$store.dispatch("StocksStore/deleteItem", bonDeCommande.id);
                    resolve(data);
                });
			});
        }
    }
};
