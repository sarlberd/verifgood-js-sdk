export default {
    methods:{
        /**
        * Get Bons de sortie.
        *
        * @param object metadatas
        */
        BonsDentreeMixins_getBonsDentree: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/bons-dentree", query, (datas, meta) => {
                    console.log("bonsDentree", datas);
                    this.$store.dispatch("BonsDentreeStore/set", datas);
                    this.$store.dispatch("BonsDentreeStore/setCounters", meta.counters);
                    resolve({"bonsDentree":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get Bon de sortie by id.
        *
        * @param string idBonDentree
        */
        BonsDentreeMixins_getBonDentree: function(idBonDentree){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
                rc.get('/api/bons-dentree/'+idBonDentree, query, (datas) => {
                    this.$store.dispatch("BonsDentreeStore/setSelectedItem", datas);
                    resolve(datas)
                });
			});
        },
        /**
        * POST bons-dentree.
		*
        * @method bonsDentreeMixins_create
        * @param Array bonsDentree
        * @return Promise
        */
        BonsDentreeMixins_create: function(bonsDentree){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/bons-dentree", {"datas":bonsDentree}, (datas) => {
                    console.log("AFTER POST bonsDentree", datas);
                    this.$store.dispatch("BonsDentreeStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT bons-dentree
        *
        * @method bonsDentreeMixins_update
        * @param Object bonDentree
        * @return Promise
        */
        BonsDentreeMixins_update: function(bonDentree){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/bons-dentree/'+bonDentree.id, {datas: bonDentree}, (data) => {
                    this.$store.dispatch("BonsDentreeStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE bons-dentree
        *
        * @method bonsDentreeMixins_delete
        * @param Object bonDentree
        * @return Promise
        */
        BonsDentreeMixins_delete: function(bonDentree){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/bons-dentree/'+bonDentree.id, null, (data) => {
                    this.$store.dispatch("BonsDentreeStore/deleteItem", bonDentree.id);
                    resolve(data);
                });
			});
        }
    }
};
