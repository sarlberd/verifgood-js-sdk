import IconNameCellRender from "src/components/Vg/TagGrid/IconNameCellRender.vue";

export default {
	data: function () {
		return {
			TagGridMixins:{
				isModalShowHideColumnsOpened: false,
				isExportXLS: false,

			}

		}
	},
	created: function () {

	},
	methods: {
		/**
		* 	FILTER
		* isExternalFilterPresent
		* exemple filters:
		* [
		*	{colId: "isRelance", value:null},
		*	{colId: "statut", value: ["En_cours", "en_attente", "prise_en_compte"], isExternalFilter: true},
		*	{colId: "urgence", value:"1"},
		*	{colId: "traitement", value:null},
		*	{colId: "isMeAffectation", value: null},
		*	{colId: "isNotAffectation", value: null}
		* ]
		* [
		*	{colId: "statut", value: null, isExternalFilter: true}
		* ]
		*
		* @return Boolean true if filter is active
		*/
		TagGridMixins_isExternalFilterPresent: function(){
			let isFilterActive = false;
			if(this.tabs){	// filtres externes stockés dans les tabs
				isFilterActive = this.tabs.findIndex((t)=>{
					return t.filters.findIndex((f)=>f.isExternalFilter)!=-1;
				})!=-1;
			}
			if(this.filters){	// filtres externes passés au composant aggrid par une props (cf exemple src/components/Vg/FicheSAV/VgFichesavTable)
				isFilterActive = this.filters.findIndex((f)=>f.isExternalFilter)!=-1;
			}
			return isFilterActive;
		},
		/**
		* 	FILTER
		* doesExternalFilterPass
		* exemple filters:
		* [
		*	{colId: "isRelance", value:null},
		*	{colId: "statut", value: ["En_cours", "en_attente", "prise_en_compte"], isExternalFilter: true},
		*	{colId: "urgence", value:"1"},
		*	{colId: "traitement", value:null},
		*	{colId: "isMeAffectation", value: null},
		*	{colId: "isNotAffectation", value: null}
		* ]
		* [
		*	{colId: "statut", value: null, isExternalFilter: true}
		* ]
		*
		* @param Object node AgGrid node
		* @return Boolean true if ExternalFilterPass
		*/
		TagGridMixins_doesExternalFilterPass: function(node){
			let externalFiltersPass = false;
			if(this.tabs && this.focusedTab){ // filtres externes stockés dans les tabs
				let focusedTab = this.tabs.find((t)=>t.name==this.focusedTab);
				let externalFilters = focusedTab.filters.filter((f)=>f.isExternalFilter);
				externalFilters.forEach((filter)=>{
					externalFiltersPass = externalFiltersPass || ( !filter.value || filter.value.indexOf(node.data[filter.colId])!=-1 );
				});
			}
			if(this.filters){ // filtres externes stockés dans les tabs
				let externalFilters = this.filters.filter((f)=>f.isExternalFilter);
				externalFilters.forEach((filter)=>{
					externalFiltersPass = externalFiltersPass || ( !filter.value || filter.value.indexOf(node.data[filter.colId])!=-1 );
				});
			}
			return externalFiltersPass;
		},
		/**
		* 	FILTER
		* applique les filtres pour chaque column du gridOptions
		* exemple filters:
		* [
		*	{colId: "isRelance", value:null},
		*	{colId: "statut", value: ["En_cours", "en_attente", "prise_en_compte"], isExternalFilter: true},
		*	{colId: "urgence", value:"1"},
		*	{colId: "traitement", value:null},
		*	{colId: "isMeAffectation", value: null},
		*	{colId: "isNotAffectation", value: null}
		* ]
		*
		* @param Object gridOptions
		* @param Array filters
		*/
		TagGridMixins_setFilters: function(gridOptions, filters){
			//// //console.log("----- > TAG GRID MIXINS TagGridMixins_setFilter", filters, gridOptions);
			var columnFilter = null;
			filters.forEach(function(filter, index){
				//// //console.log("FILTER", index, filter, gridOptions, Array.isArray(filter.value));
				if(!filter.isExternalFilter){
                    if(filter && !filter.colId)return;
					columnFilter = gridOptions.api.getFilterInstance( filter.colId );
					let model;
					if(columnFilter){
                        if(columnFilter.constructor.name == "DateFilter"){
                            model = {
                                type: 'equals',
                                dateFrom: filter.value,
                                dateTo: null,
                            };
                        }else{
                            model = {
                                type: "contains",
                                filter: null
                            };
                            switch (typeof(filter.value)) {
    	                        case "string":
    	                            model.filter = [filter.value];
    	                            break;
    	                        case "object":
    	                            model.filter = filter.value;
    	                            break;
    	                        case "array":
    	                            model.filter = filter.value;
    	                            break;
    	                        default:
    	                            model.filter = filter.value;
    								break;
    	                    }
                        }
                        model.type = filter.action || "contains";
	                    columnFilter.setModel(model);
                        // Get grid to run filter operation again
                        gridOptions.api.onFilterChanged();
	                    // columnFilter.selectValue(filter.value);
						// columnFilter.setModel('0');
						// // //console.log("setFilter", model);
					}
				}
			});
			//// //console.log("BEFORE onFilterChanged", gridOptions.api);
			gridOptions.api.onFilterChanged();
			//// //console.log("AFTER onFilterChanged");
		},
		/**
		*	FILTER
		* used for VgTextFilter
		*
		* @param Object gridOptions
		* @param String searchQuery
		*/
		TagGridMixins_setQuickFilter: function(gridOptions, searchquery){
			gridOptions.api.setQuickFilter(searchquery);
		},
		TagGridMixins_exportCSV: function(gridOptions, filename){
			var params = {
                skipHeader: false,
                skipFooters: false,
                skipGroups: false,
                skipFloatingTop: false,
                skipFloatingBottom: false,
                allColumns: false,
                onlySelected: false,
                suppressQuotes: false,
                fileName: 'Verifgood_'+filename+'.xls',
                columnSeparator: ';'
            };
            gridOptions.api.exportDataAsCsv(params);
		},

		/**
		* handle modal show/hide columns is closed
		* @param Boolean closed modal is closed
		*/
		TagGridMixins_modalShowHideColumnsClosed: function(closed){
			this.TagGridMixins.isModalShowHideColumnsOpened = !closed;
		},
		/**
		* handle export XLS done
		* @param Boolean done export is done
		* @deprecated
		*/
		TagGridMixins_exportXLSDone: function(done){
			this.TagGridMixins.isExportXLS = !done;
		},
		/**
		* columnDefs for mobile utilisation
		*
		* @param Object gridOptions
		* @param Object columnDefs
		* @param Object column  colonne a afficher pour le mobile
		* @param int rowHeight update height in gridOptions
		* @return columnDefs avec une colonne visible.
		*/
		TagGridMixins_replaceMobileColumn:function(gridOptions, columnDefs , column, rowHeight){
			columnDefs = columnDefs.map(function(x) {
				x.hide = true;
				return x;
			});
			gridOptions.headerHeight = 0;
			gridOptions.rowHeight = rowHeight;
			columnDefs.unshift(column);
			return columnDefs;
		},
		/**
		 * Recupere la proprieté visible de la colonne venant du gridApi et retourne un colonneDef avec les colonnes caché/visible actuelle du tableau principal
		 * Utiliser pour recuperer les colonnes affiché pour la creation d'un rapport
		 * @param Object api = this.gridOptions.api
		 * @return columnDefs avec les colonne visible ou pas.
		 */
		TagGridMixins_columnVisibleTagGrid:function(api){

	        var columnDef = api.columnController.columnDefs;
	        var gridColumns = api.columnController.gridColumns;
	        for (var pos = 0; pos < gridColumns.length; pos++) {
	            columnDef[pos].hide = !gridColumns[pos].visible;

	        }

	        return columnDef ;
	    },
		/**
		 * recupere le chemin vers la clé rechercher dans un objet
		 * exemple si on cherche params.fm.equipement , ça sera TagGridMixins_getPath(params.data,"fm.equipement", "site")
		 * @param Object data
		 * @param String attributePath - chemin vers le path en chaine de caractere
		 * @param String level - site batiment etage ou piece
		 * @return la valeur dans l'objet a au chemin voulu
		 */
		TagGridMixins_getPath: function(data, attributePath, level) {
            let levelIndexMatchingReference = {
				site: {index:1},
				batiment: {index:2, default: this.$t("batiment-generique")},
				etage: {index:3, default: this.$t("etage-generique")},
				piece: {index:4, default: this.$t("piece-generique")}
			};
			//let path = data[attributePath];
			let attributes = attributePath.split(".");
			let path = data[attributes[0]];
			attributes.shift();
			attributes.forEach((attribute)=>{
				path = path[attribute];
			});
			let result = path.split("/")[levelIndexMatchingReference[level].index];
			if(result=="-") return levelIndexMatchingReference[level].default;
			else return result;
        },
        /**
         * Créer 4 nouvelle colonne site/bat/etage/piece
         * @param {Array} columnDef
         * @param {String} specPath pour les path plus complexe comme "fm.equipement.path"
         * @return columnDef modifier
         */
        TagGridMixins_columnDefSplitpath: function(columnDef,specPath) {
            var pathSplitColumnDef = [
                {
                    headerName: this.$t('site'),
                    field: 'paths',
                    colId:'paths',
                    width: 200,
                    hide:true,
                    pinned: 'left',
                    cellClass: ["vg-cell-ballam-theme"],
					cellRenderer: (params) => new IconNameCellRender({propsData: {dataColumn: this.TagGridMixins_getPath(params.data, specPath, "site"), icon: "static/assets/icone/circle/site-cercle.png",isMainColumn:false}}).$mount().$el

                },
                {
                    headerName: this.$t('batiment'),
                    field: 'pathb',
                    colId:'pathb',
                    width: 200,
                    hide:true,
                    pinned: 'left',
                    cellClass: ["vg-cell-ballam-theme"],
					cellRenderer: (params) => new IconNameCellRender({propsData: {dataColumn: this.TagGridMixins_getPath(params.data, specPath, "batiment"), icon: "static/assets/icone/circle/batiment-cercle.png",isMainColumn:false}}).$mount().$el


                },
                {
                    headerName: this.$t('etage'),
                    field: 'pathe',
                    colId:'pathe',
                    width: 200,
                    hide:true,
                    pinned: 'left',
                    cellClass: ["vg-cell-ballam-theme"],
					cellRenderer: (params) => new IconNameCellRender({propsData: {dataColumn: this.TagGridMixins_getPath(params.data, specPath, "etage"), icon: "static/assets/icone/circle/etage-cercle.png",isMainColumn:false}}).$mount().$el


                },
                {
                    headerName: this.$t('piece'),
                    field: 'pathp',
                    colId:'pathp',
                    width: 200,
                    hide:true,
                    pinned: 'left',
                    cellClass: ["vg-cell-ballam-theme"],
					cellRenderer: (params) => new IconNameCellRender({propsData: {dataColumn: this.TagGridMixins_getPath(params.data, specPath, "piece"), icon: "static/assets/icone/circle/piece-cercle.png",isMainColumn:false}}).$mount().$el

                }] ;
            var isPathColumnFound = false;
            columnDef.map((def)=>{
                if (def.field == "path" || specPath != "path") {
                    isPathColumnFound = true;
                }
            })
            if(isPathColumnFound){
                columnDef = columnDef.concat(pathSplitColumnDef );
            }
            return columnDef;

        },
        /**
        * Normalize data following given model.
        * @param object filters
        * @param string model
        * @param Object Aggrid GridOptions
        */
        TagGridMixins_normalize:function(filters, model, gridOptions){
            let normalized = {};
            switch (model) {
                case "metadatas":
                for (const [key, filter] of Object.entries(filters)) {

                    normalized[key] = {
                        "action":filter.type,
                        "value":filter.filter,
                        "colId":gridOptions.columnApi.getColumn(key).colId,
                        "attr":gridOptions.columnApi.getColumn(key).colId
                    }
                }
                    break;
                default:

            }
            return normalized;
        },
        /**
         * Download excel file xlsx from csv
        * @param string csv
        * @param string fileName
        * @return {Promise}
        */
        TagGridMixins_convertCsvToXlsx:function(csv, filename="verifgood"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;

                rc.setOptions({
                    'responseType': 'blob',
                    'Content-Type':'application/vnd.ms-excel'
                });
                var query = {
					csv: csv,
					filename: filename,
				};
				rc.post("/api/convert/csv-to-vg-csv", query, (response) => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', query.filename+'_'+moment().format("DD-MM-YYYY")+'.csv'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve(datas);
                });
            });
        }
	},
	computed: {

	}
};
