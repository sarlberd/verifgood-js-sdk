export default {
    data: function(){
        return {
            /*ComposantMixins:{
                icons: []
            },
            // ci dessous viens de entity composants qui a été delete
            LibelleProblemComposantEquipements : [],
            composants: [],
			ComposantsMixins_base:[],
            */
        };
    },
    methods:{
        /**
        * GET composants.
		*
        * @method ComposantMixins_get
        * @param Metadatas metadatas
        * @return Promise
        */
        ComposantMixins_get: function(metadatas){
            return new Promise((resolve, reject) => {
                let query = {
                    metadatas: metadatas.get()
                };
                this.$rc.get("/api/composants", query, (datas, meta) => {
                    this.$store.dispatch("ComposantsStore/set", datas);
                    this.$store.dispatch("ComposantsStore/setCounters", meta.counters);
                    resolve({"composants":datas,"metadatas":meta});
                });
            });
        },
        /**
        * POST composants.
		*
        * @method ComposantMixins_create
        * @param Array composants
        * @return Promise
        */
        ComposantMixins_create: function(composants){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/composants", {"datas":composants}, (composants) => {
                    this.$store.dispatch("ComposantsStore/addItems", composants);
                    resolve(composants);
                });
			});
        },
        /**
        * PUT composant
        *
        * @method ComposantMixins_update
        * @param object composant
        * @return Promise
        */
        ComposantMixins_update: function(composant){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.put('/api/composant/'+composant.id, {datas: [composant]}, (data) => {
                    this.$store.dispatch("ComposantsStore/updateItem", data);
                    resolve(data);
                });
			});
        },
        /**
        * DELETE composant
        *
        * @method ComposantMixins_delete
        * @param object composant
        * @return Promise
        */
        ComposantMixins_delete: function(composant){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/composant/'+composant.id, null, (data) => {
                    this.$store.dispatch("ComposantsStore/deleteItem", composant.id);
                    resolve(data);
                });
			});
        },
        ComposantMixins_postComposants: function(composants){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					datas: composants
				};
				rc.post('/api/composants?userId='+this.$app.appID, query, (datas) => resolve(datas));
			});
        },
        ComposantMixins_putComposant: function(composant){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                delete composant["composants_categorie_id"];
                delete composant["categorie_id"];
				var query = {
					datas: [composant]
				};
				rc.put('/api/composant/'+composant.id, query, (datas) => resolve(datas));
			});
        },
        ComposantMixins_deleteComposant: function(idComposant){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/'+this.$app.appID+'/composant/'+idComposant, null, (datas) => resolve(datas), (err) => reject(err));
			});
        },
        ComposantMixins_postLibelProblem: function(idComposant, libelProblem){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					datas: [libelProblem]
				};
				rc.post('/api/libelProblem/'+this.$app.appID+'/composant/'+idComposant, query, (datas) => resolve(datas));
			});
        },
        ComposantMixins_deleteLibelProblem: function(idLibelProblem){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/libelProblem/'+this.$app.appID+'/'+idLibelProblem, null, (datas) => resolve(datas));
			});
        },
        ComposantMixins_getIcons: function(){
            return new Promise((resolve, reject)=>{
    			var icons = [];
    			var folder = "/static/assets/icone/composant/";
    			var constFile = "const.json";
    			var rawFile = new XMLHttpRequest();
    			rawFile.open("GET", folder+constFile, true);
    			rawFile.onreadystatechange = ()=>{
    				if (rawFile.readyState === 4) {
    					var response = rawFile.responseText.split(",");
    					response.forEach((iconname)=>{
                            iconname = iconname.replace("\r\n", "");
    						if(iconname.search('.png')!=-1){
    							icons.push({
    								label: iconname.replace('.png',''),
    								src: folder+iconname
    							});
    						}else if(iconname.search(".svg")!=-1){
                                icons.push({
    								label: iconname.replace('.svg',''),
    								src: folder+iconname
    							});
                            }
    					});
    					resolve(icons);
    				}
    			};
    			rawFile.send();
			});
        },
        // ci dessous viens de entity composants qui a été delete
        ComposantsMixins_associateComposants: function(composantsList, callback){
            var that = this;
            var rc = this.$rc;
            rc.useHostv2();
            rc.post("/api/assigncomposants", composantsList, function(datas){
                callback && callback(datas);
            });
        },
        ComposantsMixins_associateLPs: function(idComposant, lpsList, callback){
            var that = this;
            var rc = this.$rc;
            rc.useHostv2();
            var query = [];
            var userId = this.$app.appID;
            lpsList.forEach(function(libelle){	// format [problem1, problem2, ...] to [{composant: id1, libelle: problem1,...}, ...]
                query.push({
                    composant: idComposant,
                    libelle: libelle,
                    userId: userId
                });
            });
            rc.post("/api/assignlibellesproblemes", query, function(datas){
                callback && callback(datas);
            });
        },
        getLibelleProblemOf:function(composantName){
            return this.LibelleProblemComposantEquipements.filter(current => current.libel_composant.includes(composantName) == true);
        },
        ComposantMixins_getComposants: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas || {
                        "directives":[],
                        "filters":[]
                    }
				};
                rc.get('/api/composants', query, (datas) => resolve(datas));
			});
        }
        //----------
    },
    computed:{

    }
};
