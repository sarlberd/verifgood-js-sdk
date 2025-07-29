export default {
    data: function() {
        return {
            
        };
    },
    methods: {
        SyntheseMaintenanceMixins_get: function(startDate, endDate, metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    startDate: startDate,
                    endDate: endDate,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/gamme/maintenance/preventive", query, (datas) => {
                    console.log("RESOLVE GET SYNTHESE", datas);
                    resolve(datas);
                });
			});
        }
    }
};
