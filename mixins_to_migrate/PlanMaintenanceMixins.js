export default {
    data: function() {
        return {
            
        };
    },
    methods: {
        PlanMaintenanceMixins_get: function(focusedDate, metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    focusedDate: focusedDate,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/plan/maintenance/preventive", query, (datas) => {
                    resolve({taches: datas.taches, contrats: datas.contrats, metadatas: datas.metadatas});
                });
			});
        }
    }
};
