export default {
    methods:{
        /**
        * Get CorpsDetats.
        *
        * @param Metadatas metadatas
        */
        CorpsDetatsMixins_getCorpsDetats: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/corps-detats", query, (datas, meta) => {
                    this.$store.dispatch("CorpsDetatsStore/set", datas);
                    resolve({"corpsdetats":datas,"metadatas":meta});
                });
			});
        },
        /**
        * POST corpsdetats.
		*
        * @method CorpsDetatsMixins_create
        * @param Array corpsdetats
        * @return Promise
        */
        CorpsDetatsMixins_create: function(corpsDetats){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/corps-detats", {"datas": corpsDetats}, (datas) => {
                    this.$store.dispatch("CorpsDetatsStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT corpsdetat
        *
        * @method CorpsDetatsMixins_update
        * @param object corpsdetat
        * @return Promise
        */
        CorpsDetatsMixins_update: function(corpsdetat){
            return new Promise((resolve, reject)=>{
				this.$rc.put('/api/corps-detat/'+corpsdetat.id, {datas: corpsdetat}, (data) => {
                    this.$store.dispatch("CorpsDetatsStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE corpsdetat
        *
        * @method CorpsDetatsMixins_delete
        * @param object corpsdetat
        * @return Promise
        */
        CorpsDetatsMixins_delete: function(corpsdetat){
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/corps-detat/'+corpsdetat.id, null, (data) => {
                    this.$store.dispatch("CorpsDetatsStore/deleteItem", corpsdetat.id);
                    resolve(data);
                });
			});
        },
    }
};
