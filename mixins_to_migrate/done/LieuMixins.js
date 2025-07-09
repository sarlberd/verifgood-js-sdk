export default {
    methods:{
        /**
        * Récupère les initiales du niveau
        *
        * @param object lieu
        * @return string
        */
        LieuMixins_getInitiales: function(lieu, level=1){
            let libel = lieu.path.split("/")[level];
            let regexBeginWithNumber = /(^[0-9]*)\w+\s*?-\s*/;
            let initiales = "";
            if(libel.match(regexBeginWithNumber)){ // occurence trouvée
                initiales = libel.match(regexBeginWithNumber)[0];
                libel = libel.replace(initiales, "");
            }
            libel = libel.split(" ");
            if(libel.length==1) initiales+=libel[0].substring(0, 3);
            else libel.forEach((word)=>initiales+=word.slice(0,1));
            return initiales.toUpperCase()+"-";
        },
        LieuMixins_getOrganisations: function(metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas
				};
                query.metadatas.filters.push({"attr":"type_lieu","value":"Organisation","action":"equals"});
                rc.get('/api/lieux', query, (datas) => resolve(datas));
			});
        },
        /**
        * @param Metadatas
        * @return Promise
        */
        LieuMixins_getSites: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                metadatas.filterExist("type_lieu");
                metadatas.setFilter("type_lieu", "Site");
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                if(this.$app.restrictionsite) query.metadatas.filters.push({"attr": "path", "value": this.$app.restrictionsite.split("|"), "action":"start_with"});
                rc.get('/api/lieux', query, (datas, metas) => {
                    resolve({lieux: datas, metas: metas});
                });
			});
        },
        /**
        * @param Metadatas metadatas
        * @return Promise
        */
        LieuMixins_getLieux: function(metadatas, _options={_stored_counters: false, _isOrderedBySiteAsc: false}){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite || null,
                    isOrderedBySiteAsc: _options._isOrderedBySiteAsc?_options._isOrderedBySiteAsc:false
				};
                if(this.$app.restrictionsite) query.metadatas.filters.push({"attr": "path", "value": this.$app.restrictionsite.split("|"), "action":"start_with"});
                this.$rc.get('/api/lieux', query, (datas, metas) => {
                    if(_options && _options._stored_counters) this.$store.dispatch("LieuxStore/setCounters", metas.counters);
                    resolve({lieux: datas, metas: metas});
                });
			});
        },
        /**
        * @param integer idLieu
        * @return Promise
        */
        LieuMixins_getLieu: function(idLieu, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID
				};
                rc.get('/api/lieu/'+idLieu, query, (datas) => {
                    if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("LieuxStore/setSelectedItem", datas);
                    resolve(datas)
                });
			});
        },
        /**
         * @param lieux Object
         */
        LieuMixins_create: function(lieux, _options={}){
            return new Promise((resolve, reject)=>{
				var query = {
					datas: lieux
				};
                if(_options && _options.dernierNumeroPiece) query.dernierNumeroPiece = _options.dernierNumeroPiece;
				this.$rc.post('/api/lieux?userId='+this.$app.appID, query, (datas) => resolve(datas));
			});
        },

        /**
         * @param lieux Csv string
         */
        LieuMixins_importPieces: function(lieux){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.setContentType("application/x-www-form-urlencoded");
				var query = {datas:[]};
				rc.post('/api/integration/pieces', 'csv='+lieux, (datas) => resolve(datas));
			});
        },
        /**
        * Creer des pieces dans le container lieux generique pour un site donne.
        *
        * @param integer siteId
        * @param array lieux [{libel_lieu:"abcd"}]
        */
        LieuMixins_createPiecesGeneriques:function(siteId, lieux){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = lieux;
				rc.post('/api/site/'+siteId+'/pieces/generiques?userId='+this.$app.appID, query, (datas) => {
                    this.$store.dispatch("LieuxStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * Creer des pieces dans les container lieux générique des sites de la famille donnée.
        *
        * @param integer siteId
        * @param array lieux [{libel_lieu:"abcd"}]
        */
        LieuMixins_createPiecesGeneriquesFamilleSite:function(famille, lieux){
            return new Promise((resolve, reject)=>{
				var query = lieux;
				this.$rc.post('/api/sites/'+famille+'/pieces/generiques?userId='+this.$app.appID, query, (datas) => {
                    this.$store.dispatch("LieuxStore/addItems", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * Creer piece générique pour les équipements globaux
        *
        * @param integer siteId
        */
        LieuMixins_createPieceGenerique:function(siteId){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
				rc.post('/api/site/'+siteId+'/piece/generique?userId='+this.$app.appID, query, (piece) => {
                    if(piece) this.$store.dispatch("LieuxStore/addItem", piece);
                    resolve(piece);
                });
			});
        },
        /**
        * Update lieu.
        * @param object lieu
        * @return Promise
        */
        LieuMixins_update: function(lieu){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.put('/api/lieu/'+lieu.id+'?userId='+this.$app.appID, lieu, (data) => resolve(data));
			});
        },
        /**
        * Update lieux.
        *
        * @param array lieux
        * @return promise
        *
        */
        LieuMixins_update_lieux: function(lieux){
            return new Promise((resolve, reject)=>{
                this.$rc.put("/api/lieux", lieux, (datas)=>{
                    datas.forEach((lieu, i) => {
                        this.$store.dispatch("LieuxStore/updateItem", lieu);
                    });
                    resolve(datas);
				});
            });

		},
        /**
        * Delete lieu.
        * @param object lieu
        * @return Promise
        */
        LieuMixins_delete: function(lieu){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				rc.delete('/api/'+this.$app.appID+"/lieux/"+lieu.id, null, (data) => resolve(data));
			});
        },
        /**
        * Open a new tab to download excel file.
        *
        * @param Metadatas
        * @return Promise
        */
		LieuMixins_getExcelFile: function(metadatas,filename=null,fileExtension = "xlsx"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
    			var that = this;
                metadatas.setDirectives([]);
    			var query = {
                    userId:this.$app.appID,
                    sites: this.$app.restrictionsite || '',
                    metadatas: metadatas.get(),
                    isUserTypeAsDemandeur:0
                };
                let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
    			rc.get("/api/lieux/export/"+fileType+"/"+filename, query, function(response,remoteMetadatas){
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
		/*idUser Integer, sites Array d'Integer*/
        /**
        * @TODO parameters ad restriction lieu need its mixins and backend endpoints
        * @deprecated
        */
		LieuMixins_saveRestrictionSiteForUser: function(collection, callback){
			var rc = this.$rc;
			var that = this;
			rc.post("/api/V2.0/collection/lieuxuser", collection, callback || function(response){
				// //console.log("/V2.0/collection/lieuxuser response", response);
			});
		},
        LieuMixins_getFamilleBackgroundColor: function(familles){
            let colors = this.LieuMixins_famillesBackgroundColor;
            let famillesColors = [];
            let nColors = colors.length;
            let currentIndexColor = 0;
            familles.forEach((f, index)=>{
                famillesColors.push({label: f, color: colors[currentIndexColor]});
                if(currentIndexColor==nColors) currentIndexColor = 0;
                else currentIndexColor++;
            });
            return famillesColors;
        },
        LieuMixins_getFamilles: function(sites){
            let familles = [];
            sites.forEach((site)=>{
                if(site.famille && site.famille.length!=0) familles.push(site.famille);
            });
            familles = familles.filter((famille, index, self)=>self.indexOf(famille)==index);
            return this.LieuMixins_getFamilleBackgroundColor(familles);
        }
    },
    computed:{
        LieuMixins_famillesBackgroundColor: function(){
            return ["#f59c29ff","#02a7f0ff","#63a103ff","#ED705A","#48c9b0ff","#ccaadaff","#188c4eff","#a9b2c7ff","#b7950bff","#1e74aeff"];
        }
    }
};
