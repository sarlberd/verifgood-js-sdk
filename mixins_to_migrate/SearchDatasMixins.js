export default {
    methods:{
        /**
        * Get.
        *
        * @param object metadatas
        */
        SearchDatasMixins_get: function(searchValue){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    searchValue: searchValue,
                    entities: {
                        equipements:true, 
                        lieux:true, 
                        maintenances:true,
                        contrats: true,
                        tiers: true,
                        categories: true,
                        interventions: true,
                        contacts: true
                    },
                    sites: this.$app.restrictionsite
				};
                this.$rc.get("/api/search-datas", query, (datas, metas) => {
                    console.log("SEARCH DATAS", datas);
                    this.$store.dispatch("SearchDatasStore/setDatas", datas);
                    this.$store.dispatch("SearchDatasStore/setCounters", metas.counters);
                    this.$store.dispatch("SearchDatasStore/setEntities", metas.entities);
                    this.$store.dispatch("SearchDatasStore/setFilters", metas.filters);
                    resolve(datas);
                });
			});
        },
        /**
        * Get equipements / lieux
        *
        * @param string searchValue
        * @param object metadatas
        */
        SearchDatasMixins_getEquipements: function(searchValue, metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    searchValue: searchValue,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/search-datas/equipements", query, (datas, metas) => {
                    console.log("SEARCH DATAS", datas);
                    this.$store.dispatch("SearchDatasStore/setDatas", datas);
                    this.$store.dispatch("SearchDatasStore/setCounters", metas.counters);
                    this.$store.dispatch("SearchDatasStore/setFilters", metas.filters);
                    resolve(datas);
                });
			});
        }
    }
};
