export default {
    methods:{
        /**
        * GET typologiesMaintenance.
		*
        * @method TypologiesMaintenanceMixins_get
        * @param {Metadatas} metadatas
        * @return {Promise}
        */
        TypologiesMaintenanceMixins_get: function(metadatas){
            return new Promise((resolve, reject) => {
                let query = {
                    metadatas: metadatas.get()
                };
                this.$rc.get("/api/typologies-maintenance", query, (datas, meta) => {
					this.$store.dispatch("TypologiesMaintenanceStore/set", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
		/**
        * GET typologiesMaintenance.
		*
        * @method TypologiesMaintenanceMixins_getTypologiesMaintenanceId
        * @param {integer} id
        * @return {Promise}
        */
        TypologiesMaintenanceMixins_getTypologiesMaintenanceId: function(id){
            return new Promise((resolve, reject)=>{
                let query = {};
                this.$rc.get("/api/typologies-maintenance/"+id, query, (typologiesMaintenance, meta) => {
                    this.$store.dispatch("TypologiesMaintenanceStore/setSelectedItem", typologiesMaintenance);
                    resolve(typologiesMaintenance);
                });
            });
        },
        /**
        * Create typologiesMaintenance.
        * @method TypologiesMaintenanceMixins_create
        * @param array typologiesMaintenance
        * @return {Promise}
        */
        TypologiesMaintenanceMixins_create: function(typologiesMaintenance){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/typologies-maintenance", typologiesMaintenance, (typologiesMaintenance) => {
                    this.$store.dispatch("TypologiesMaintenanceStore/addItems", typologiesMaintenance);
                    resolve(typologiesMaintenance);
                });
			});
        },
        /**
        * Update typologiesMaintenance.
        * @method TypologiesMaintenanceMixins_update
        * @param {object} typologiesMaintenance
        * @return {Promise}
        */
        TypologiesMaintenanceMixins_update: function(typologiesMaintenance){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                var query = {

                };
                rc.put("/api/typologies-maintenance/"+typologiesMaintenance.id, typologiesMaintenance, (typologiesMaintenance) => {
                    this.$store.dispatch("TypologiesMaintenanceStore/setSelectedItem", typologiesMaintenance);
                    this.$store.dispatch("TypologiesMaintenanceStore/updateItem", typologiesMaintenance);
                    // gérer l'update dans la collection courante
                    resolve(typologiesMaintenance);
                });
            });
        },
        /**
        * DELETE tva
        *
        * @method TypologiesMaintenanceMixins_delete
        * @param object tva
        * @return Promise
        */
        TypologiesMaintenanceMixins_delete: function(typologieMaintenance){
            console.log({typologieMaintenance});
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/typologies-maintenance/'+typologieMaintenance.id, null, (data) => {
                    this.$store.dispatch("TypologiesMaintenanceStore/deleteItem", typologieMaintenance.id);
                    resolve(data);
                });
			});
        },
    }
};
