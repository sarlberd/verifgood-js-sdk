export default {
    data: function(){
        return {

        };
    },
    methods:{
        /*
        *
        * Libel problems Composants
        *
        */
        /**
        * POST libels-problem.
		*
        * @method LibelProblemMixins_create
        * @param String idComposant
        * @param Array problems
        * @return {Promise}
        */
        LibelProblemMixins_create: function(idComposant, problems){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/composant/"+idComposant+"/libels-problems", {"datas":problems}, (datas) => {
                    this.$store.dispatch("ComposantsStore/addComposantProblems", {composant_id: idComposant, datas: datas});
                    resolve(datas);
                });
			});
        },
        /**
        * DELETE libel-problem.
		*
        * @method LibelProblemMixins_delete
        * @param Object problem
        * @return {Promise}
        */
        LibelProblemMixins_delete: function(problem){
            return new Promise((resolve, reject)=>{
				this.$rc.delete("/api/libel-problem/"+problem.id, null, (datas) => {
                    this.$store.dispatch("ComposantsStore/removeComposantProblem", {composant_id: problem.composant, problem_id: problem.id});
                    resolve(datas);
                }, (err) => reject(err));
			});
        },

        /*
        *
        * Libel problems DI
        *
        */
        /**
        *
        * @param {Metadatas}
        * @return {Promise} resolve:{"datas":datas,"metadatas":meta}
        */
        LibelProblemMixins_DI_get_composant_problem:function(composantId){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID
				};
                rc.get("/api/composant/"+composantId+"/libelles-probleme", query, (datas, meta) => {
                    this.$store.dispatch("LibellesProblemStore/set", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /*
        *
        * Libel problems DI
        *
        */
        /**
        *
        * @param {Metadatas}
        * @return {Promise} resolve:{"datas":datas,"metadatas":meta}
        */
        LibelProblemMixins_DI_get:function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/libelles-probleme", query, (datas, meta) => {
                    this.$store.dispatch("LibellesProblemStore/set", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Récupère les libellés problèmes génériques && associé à la catégorie
        *
        * @param {Metadatas}
        * @param idCategorie
        * @return {Promise} resolve:{"datas":datas,"metadatas":meta}
        */
        LibelProblemMixins_getLibellesProblemByCategorie:function(metadatas, idCategorie){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/libelles-probleme/categorie/"+idCategorie+"/all", query, (datas, meta) => {
                    this.$store.dispatch("LibellesProblemStore/set", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
         * @params {array} array of object
         * @return {Promise}
         */
        LibelProblemMixins_DI_create:function(libellesProblem){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/libelles-probleme", {"datas":libellesProblem}, (datas) => {
                    this.$store.dispatch("LibellesProblemStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
         * @params {integer}
         * @return {Promise}
         */
        LibelProblemMixins_DI_delete:function(libelleProblemId){
            return new Promise((resolve, reject)=>{
				this.$rc.delete("/api/libelle-probleme/"+libelleProblemId, null, (datas) => {
                    this.$store.dispatch("LibellesProblemStore/deleteItem", libelleProblemId);
                    resolve(datas);
                }, (err) => reject(err));
			});
        },
        /**
        *
        */
        LibelProblemMixins_getLibelsEquipement: function(){

        }
    },
    computed:{

    }
};
