/**
* @module ContratsMixins
*/
export default {
	data: function(){
		return {
            /**
            *   array of contrat object
            * @property {Array} contrats
            */
			contrats:[],
		};
	},

	methods: {
		/**
        * GET contrats.
		*
        * @method ContratsMixins_getContrats
        * @param Metadatas metadatas
        * @return Promise
        */
        ContratsMixins_getContrats: function(metadatas){
            return new Promise((resolve, reject) => {
                let query = {
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite,
                    userId: this.$app.appID
                };
                this.$rc.get("/api/contrats", query, (datas, meta) => {
                    this.$store.dispatch("ContratsStore/set", datas);
                    this.$store.dispatch("ContratsStore/setCounters", meta.counters);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
        /**
        * Query : get list of contrat
        * @method ContratsMixins_fetchContrats
		* @param Object metadatas default {"directives":[],"filters":[]}
        * @return Promise
		* @deprecated
        */
        ContratsMixins_fetchContrats: function(metadatas={"directives":[],"filters":[]}) {
			return new Promise((resolve, reject)=>{
				var query = {
	                "userId": this.$app.appID,
					"sites": this.$app.restrictionsite,
					"metadatas": metadatas
	            };
	            this.$rc.get('/api/contrats', query, (reponses)=>resolve(reponses));
			});

        },
        /**
        * Query : get list of contrat by id
        * @method ContratsMixins_fetchContrat
        * @param {integer} idContrat - execute on query success
		* @deprecated
        */
        ContratsMixins_fetchContrat: function (idContrat, _options={skipVueXStorage: false}) {
            var rc = this.$rc;
            var query = {
                "userId": this.$app.appID
            };
            return new Promise((resolve, reject) =>{
                rc.get('/api/contrat/'+idContrat, query, function (reponses) {
                    //if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("ContratsStore/setSelectedItem", reponses);
                    resolve(reponses);
                });
            });
        },
        /**
        * Query : create a contrat
        * @method ContratsMixins_createContrat
        * @param {Object} datas - contrat object
        * @param Function - callback execute on query success
        * @// TODO: retourner une promesse
        */
		ContratsMixins_createContrat: function(datas){
			return new Promise((resolve, reject) => {
                this.$rc.post('/api/contrats?userId='+this.$app.appID, Object.assign({"datas":[datas]}, {
					userId: this.$app.appID
				}), (datas) => {
					this.$store.dispatch("ContratsStore/addItem", datas[0]);
					resolve(datas);
				});
            });
		},

        /**
        * Query : create a contrat
        * @method ContratsMixins_updateContrat
        * @param {Object} datas - contrat object
        * @param Function - callback execute on query success
		* @// TODO: utiliser la route api/contrats?userId=
		* @// TODO: utiliser la method dupdate restClient ( voir userMixin comme reference )
		* @// TODO: retourner une promesse
        */
		ContratsMixins_updateContrat: function(contrat, _options={skipVueXStorage: false}){
            delete contrat.tiers_name;
            delete contrat.tiers_uid ;
			return new Promise((resolve, reject) => {
                this.$rc.put("/api/contrat/"+contrat.id+"?userId="+this.$app.appID, contrat, (datas) => {
                    //if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("ContratsStore/updateItem", datas);
                    resolve(datas);
                });
            });
		},
        /**
        * @method ContratsMixins_archive
        * @param {Object} datas - contrat object
        * @param Function - callback execute on query success
		* @// TODO: utiliser la route api/contrats?userId=
		* @// TODO: utiliser la method dupdate restClient ( voir userMixin comme reference )
		* @// TODO: retourner une promesse
        */
		ContratsMixins_archive: function(contrat, _options={skipVueXStorage: false}){
            let contratArchived = {
                id: contrat.id,
                userId: this.$app.appID,
                isArchived: "1"
            };
			return new Promise((resolve, reject) => {
                this.$rc.put("/api/contrat/"+contratArchived.id+"?userId="+this.$app.appID, contratArchived, (datas) => {
                    //if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("ContratsStore/updateItem", datas);
                    resolve(datas);
                });
            });
		},
        /**
        * delete contrat
        * @// TODO: utiliser la route /api/contrat/:id?userId=
        * @// TODO: utiliser la method de delete restClient ( voir userMixin comme reference )
        * @// TODO: retourner une promesse
        * @// WARNING: : Attention cette methode est déjà utilisé ailleurs
        * @method ContratsMixins_delete
        * @param {Object} contrat must contains id and userId
        * @param Function - callback execute on query success
		* @deprecated
        */
        ContratsMixins_delete: function(contrat){
            // à pusher sur snapshot le 06/12/2019
			return new Promise((resolve, reject) => {
                this.$rc.delete("/api/contrat/"+contrat.id+"?userId="+this.$app.appID, contrat, (datas) => resolve(datas));
            });
        },
        /**
        *  attach a list of categories to a contrat
        * @param Array categoriesContrat - array of record categories attach to contrat
        * @param Function callback - triggered on success
		* @deprecated
        */
        ContratsMixins_attachCategoriesToContrat: function(categoriesContrat,callback){
            var rc = this.$rc;
            rc.useHostv2();
            var that = this;
            rc.post('/api/tier/contrat/categories',categoriesContrat, function (reponses) {
                ////// //console.log("/api/tier/contrat/categories",reponses);
                callback && callback(reponses);
            });
        },

        /**
        * Format contrat's status
        * @method ContratsMixins_formatStatus
        * @param {Object} contrat must contains id and userId
        * @return String
		* @deprecated
        */
        ContratsMixins_formatStatus: function(contrat){
            var dateDebut = moment(contrat.startDate).format('YYYY-MM-DD');
            var endDate = moment(contrat.endDate).format('YYYY-MM-DD');
            var endDateWithoutNoticePeriod = moment(contrat.endDate).subtract(contrat.noticePeriod, 'days').format('YYYY-MM-DD');
            var datenow = moment().format('YYYY-MM-DD');
            var dateNowIsUpperThanEndDate = datenow > endDate;
            var dateNowIsInNoticePeriod = endDateWithoutNoticePeriod <= datenow && datenow <= endDate;
            var dateNowBetweenStartDateAndEndDate = dateDebut <= datenow && datenow <= endDate;
            var status = "Expiré";
            if ( dateNowBetweenStartDateAndEndDate ) {
                status = "En cours non résiliable";
            }
            if( dateNowIsInNoticePeriod ){
                status = "En cours Resiliable";
            }
            return status;
        }
	},
};
