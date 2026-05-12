export default {
    methods:{
        /**
        * @param Metadatas metadatas
        * @return {Promise}
        */
        LibelServicesMixins_getLibelServices: function(metadatas, _options={_stored: true, _restrictionSite: false, _all: false}){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                if(_options._restrictionSite && !_options._all) query.site = this.$app.restrictionsite;
                this.$rc.get('/api/libel-services', query, (datas, metas) => {
                    if(_options._stored){
                        this.$store.dispatch("LibelServicesStore/set", datas);
                    }
                    resolve(datas);
                });
			});
        },
        /**
        * POST libel-services.
		*
        * @method LibelServicesMixins_create
        * @param Array libelServices
        * @return {Promise}
        */
        LibelServicesMixins_create: function(libelServices){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/libel-services", {"datas":libelServices}, (datas) => {
                    this.$store.dispatch("LibelServicesStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * DELETE libel-problem.
		*
        * @method LibelServicesMixins_delete
        * @param Object libelService
        * @return {Promise}
        */
        LibelServicesMixins_delete: function(libelService){
            return new Promise((resolve, reject)=>{
				this.$rc.delete("/api/libel-service/"+libelService.id, null, (datas) => {
                    this.$store.dispatch("LibelServicesStore/deleteItem", libelService.id);
                    resolve(datas);
                }, (err) => reject(err));
			});
        },

    },
    computed:{

    }
};
