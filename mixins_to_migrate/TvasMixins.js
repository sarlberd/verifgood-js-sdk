export default {
    methods:{
        /**
        * Get Tvas.
        *
        * @param object metadatas
        */
        TvasMixins_getTvas: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/tva", query, (datas, meta) => {
                    console.log("TVA", datas);
                    this.$store.dispatch("TvasStore/set", datas);
                    resolve({"tvas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * POST tvas.
		*
        * @method TvasMixins_create
        * @param Array tvas
        * @return Promise
        */
        TvasMixins_create: function(tvas){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/tva", {"datas": tvas}, (datas) => {
                    console.log("AFTER POST tvas", datas);
                    this.$store.dispatch("TvasStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT tva
        *
        * @method TvasMixins_update
        * @param object tva
        * @return Promise
        */
        TvasMixins_update: function(tva){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/tva/'+tva.id, {datas: tva}, (data) => {
                    this.$store.dispatch("TvasStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE tva
        *
        * @method TvasMixins_delete
        * @param object tva
        * @return Promise
        */
        TvasMixins_delete: function(tva){
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/tva/'+tva.id, null, (data) => {
                    this.$store.dispatch("TvasStore/deleteItem", tva.id);
                    resolve(data);
                });
			});
        },
    }
};
