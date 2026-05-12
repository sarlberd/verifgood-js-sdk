export default {
    methods:{
        /**
        * delete  Libelle categorie.
		*
        * @method LibellesCategorieMixins_delete
        * @param Integer idLibelleCategorie
        * @return Promise
        */
        LibellesCategorieMixins_delete: function(idLibelleCategorie){
            return new Promise((resolve, reject)=>{
				this.$rc.delete("/api/libelle-categorie/"+idLibelleCategorie, null, (libelleCategorie) => {
                    resolve({libelleCategorie: libelleCategorie});
                });
			});
        },
        /**
        * get  Libelles categorie.
		*
        * @method LibellesCategorieMixins_getLibellesCategorie
        * @param Metadatas metadatas
        * @return Promise
        */
        LibellesCategorieMixins_getLibellesCategorie: function(metadatas){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get()
                };
				this.$rc.get("/api/libelles-categorie", query, (libellesCategorie) => {
                    resolve(libellesCategorie);
                });
			});
        },
        /**
         * post  Libelle categorie.
         * @method LibellesCategorieMixins_create
         * @param Object libellesCategories
         * @return Promise
         */
        LibellesCategorieMixins_create: function(libellesCategories, _options={_stored: true}){
            return new Promise((resolve, reject)=>{
                this.$rc.post("/api/libelles-categories", {datas: libellesCategories}, (response) => {
                    console.log("LIBELLES CATEGORIES CREATE", response);
                    if(response && _options._stored) this.$store.dispatch("CategoriesStore/updateLibellesCategories", response);
                    resolve(response.datas);
                });
            });
        },
    }
};
