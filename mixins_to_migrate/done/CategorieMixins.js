import {Metadatas} from 'verifgood-js-sdk'
export default {
    methods:{
        /**
        * Get categories.
        *
        * @param object metadatas
        */
        CategorieMixins_getCategories: function(metadatas, _options = {_stored: true}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get("/api/categories", query, (datas, meta) => {
                    if(_options._stored){
                        this.$store.dispatch("CategoriesStore/set", datas);
                        this.$store.dispatch("CategoriesStore/setCounters", meta.counters);
                    }
                    resolve({"categories":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get categorie by id.
        *
        * @param integer idCategorie
        * @param Object _options
        * @return Promise
        */
        CategorieMixins_getCategorie: function(idCategorie, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID
				};
                this.$rc.get("/api/categorie/"+idCategorie, query, (datas) => {
					if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("CategoriesStore/setSelectedItem", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * POST categories.
		*
        * @method CategorieMixins_create
        * @param Array categories
        * @return Promise
        */
        CategorieMixins_create: function(categories){
            return new Promise((resolve, reject)=>{
                this.$vg.categories.create(categories).then((datas)=>{
                    this.$store.dispatch("CategoriesStore/addItems", datas.datas);
                    resolve(datas);
                });
			});
        },
        /**
        * PUT categorie
        *
        * @method CategorieMixins_update
        * @param Object categorie
        * @return Promise
        */
        CategorieMixins_update: function(categorie){
            return new Promise((resolve, reject)=>{
                this.$vg.categories.update(categorie.id,categorie).then((data)=>{
                    this.$store.dispatch("CategoriesStore/updateItem", data.datas);
                    resolve(data);
                });
			});
        },
        /**
        * PUT categories
        *
        * @method CategorieMixins_updateCollection
        * @param Object categorie
        * @return Promise
        */
        CategorieMixins_updateCollection: function(categories){
            return new Promise((resolve, reject)=>{
                this.$rc.put("/api/categories", {datas: categories}, (datas) => {
                    this.$store.dispatch("CategoriesStore/updateItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * delete categorie
        *
        * @method CategorieMixins_update
        * @param Object categorie
        * @return Promise
        */
        CategorieMixins_delete: function(categorie){
            return new Promise((resolve, reject)=>{
                this.$vg.categories.remove(categorie.id).then((data)=>{
                    this.$store.dispatch("CategoriesStore/deleteItem", data.id);
                    resolve(data);
                });
			});
        },
        /**
        * @deprecated
        */
        CategorieMixins_associate: function(idCategorie, composants){
            return new Promise((resolve1, reject1)=>{
                new Promise((resolve2, reject2)=>{
                    if(composants.toAssociate && composants.toAssociate.length!=0)
                        this.CategorieMixins_postAssociatedComposants(idCategorie, composants.toAssociate)
                            .then((reponse)=>resolve2());
                    else resolve2();
    			}).then(()=>{
                    if(composants.toDesassociate && composants.toDesassociate.length!=0)
                        this.CategorieMixins_deleteAssociatedComposants(idCategorie, composants.toDesassociate)
                            .then((reponse)=>resolve1());
                    else resolve1();
                });
            });
        },
        /**
        * POST composants categorie.
		*
        * @method CategorieMixins_associateComposant
        * @param Array categories
        * @return Promise
        */
        CategorieMixins_associateComposant: function(categorie_id, composant){
            return new Promise((resolve, reject)=>{
				var query = {
					datas: [composant]
				};
				this.$rc.post("/api/categorie/"+categorie_id+"/composants", query, (datas) => {
                    this.$store.dispatch("CategoriesStore/incrementCategorieCounter", {categorie_id: categorie_id, counter: "countComposants"});
                    resolve(datas);
                });
			});
        },
        /**
        * DELETE composants categorie.
		*
        * @method CategorieMixins_desassociateComposant
        * @param Object composant_categorie
        * @return Promise
        */
        CategorieMixins_desassociateComposant: function(composant_categorie){
            return new Promise((resolve, reject)=>{
				this.$rc.delete("/api/composant-categorie/"+composant_categorie.id, null, (datas) => {
                    this.$store.dispatch("CategoriesStore/decrementCategorieCounter", {categorie_id: composant_categorie.categorie.id, counter: "countComposants"});
                    resolve(datas);
                });
			});
        },
        /**
        * @deprecated
        */
        CategorieMixins_postAssociatedComposants: function(idCategorie, composantsToAssociate){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					datas: composantsToAssociate
				};
				rc.post('/api/categorie/'+idCategorie+'/composants?userId='+this.$app.appID, query, (datas) => resolve(datas));
			});
        },
        /**
        * Open a new tab to download file csv or excel.
        *
        * @param Metadatas metadatas
        * @param string filetype csv|excel
        * @return Promise
        */
         CategorieMixins_getFile: function(metadatas,typeCategorie = "lieux", filename=null,fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
    			var that = this;
                metadatas.setDirectives([]);
    			var query = {
                    userId:this.$app.appID,
                    metadatas: metadatas.get()
                };
                let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
    			rc.get("/api/categories/export/"+typeCategorie+"/"+fileType, query, function(response,remoteMetadatas){
                    let blob;
                    if (fileExtension === "csv") {
                        // Add BOM for UTF-8 encoding
                        const BOM = "\uFEFF";
                        blob = new Blob([BOM + response], { type: contentType });
                    } else {
                        blob = new Blob([response], { type: contentType });
                    }
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    metadatas.setLimit(0,25);
                    link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
    			});
            });

		},
        /**
        * @deprecated
        */
        CategorieMixins_deleteAssociatedComposants: function(idCategorie, composantsToDesassociate){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					datas: composantsToDesassociate
				};
                //console.log("DELETE ASSOCIATED COMPOSANTS", composantsToDesassociate);
				rc.delete('/api/'+this.$app.appID+'/categorie/'+idCategorie+'/composants', query, (datas) => resolve(datas));
			});
        },
        // -----------------------------------------------------------------------------------
        // CI DESSOUS DES METHODES A BIEN CHECKER AVANT DE DELETE
        // -----------------------------------------------------------------------------------
        /**
        * @deprecated
        */
        CategoriesMixins_fetchCategoriesLieux: function(callback) {
            var rc = this.$rc;
            var that = this;
            var query = {};

            // //console.log("CATEGORIE MIXINS useHostv2 /api/categorieslieux/");
            rc.get("/api/categorieslieux/" + this.$app.appID, query, callback || function(response) {
                // //console.log("datas created...");
            });
        },
        /**
        * Get categories.
        * Get categories and their respective composants + libelle problème.
        *
        * @method CategoriesMixins_getCategories
        * @param Object metadatas
        * @return Promise
        * @deprecated
        */
        CategoriesMixins_getCategories: function(metadatas=null){ 
            return new Promise((resolve,reject)=>{
                if(!metadatas) metadatas = new Metadatas();
                this.$vg.categories.getAll(metadatas).then((categories)=>{
                    this.$store.dispatch("CategoriesStore/set", categories);
                    resolve(categories);
                });
            });
        },
        /**
         * create corpsDetatCategorie association.
         *
         * @param integer categorieId
         * @param integer corpsDetatId
         * @return Promise
         */
        CategorieMixins_AddCorpsDetat:function(categorieId,corpsDetatId){
            return new Promise((resolve, reject)=>{
				var query = {
                    "datas":[
                        {
                            "categorie_id":categorieId,
                            "corpsDetat_id":corpsDetatId,
                            "userId":this.$app.appID
                        }
                    ]
                };
				this.$rc.post('/api/corps-detats-categories', query, (datas) => {
                    resolve(datas);
                });
			});
        }
    }
};
