export default {
    data:function(){
        return {
            FiltersMixins_page_name:null,
            previousRoute: null
        }
    },
    beforeRouteEnter(to, from, next) {
    // Utilisez une fonction de next pour accéder à `this` après que le composant soit créé
        next(vm => {
            if(from){
                vm.previousRoute = from.name;
                if(from) vm.FiltersMixins_setStorage("router-from", from.name);
                if(to) vm.FiltersMixins_setStorage("router-to", to.name);
            }else{
                vm.previousRoute = vm.getRouterFrom;
            }
        });
    },
    computed: {
        getRouterTo: function(){
            return this.$storage.get("router-to")??null;
        },
        getRouterFrom: function(){
            return this.$storage.get("router-from")??null;
        },
        getDefaultPagination: function(){
            return this.$storage.get("pagination-page-"+this.FiltersMixins_page_name+"-current")?JSON.parse(this.$storage.get("pagination-page-"+this.FiltersMixins_page_name+"-current")):{offset: 0, limit: 25, currentPage: 1};
        },
        getDefaultPaginationOffset: function(){
            if(this.FiltersMixins_page_name=="maintenances" && this.getRouterFrom=="_maintenance") return this.getDefaultPagination.offset;
            else return 0;
        },
        getDefaultPaginationLimit: function(){
            if(this.FiltersMixins_page_name=="maintenances" || this.getRouterTo=="_maintenances") return this.getDefaultPagination.limit;
            else return 25;
        },
        getDefaultPaginationCurrentPage: function(){
            if(this.FiltersMixins_page_name=="maintenances" && this.getRouterFrom=="_maintenance") return this.getDefaultPagination.currentPage;
            else return 1;
        }
    },
    methods:{
        FiltersMixins_setStorage: function(storageKey, value){
            this.$storage.set(storageKey, value);
        },
        FiltersMixins_checkValidity(){
            if(!this.FiltersMixins_page_name){
                throw new Error('Page name is not defined i dont know to which page belongs theses filters !');
            }
        },
        /**
        * Save Current filters.
        *
        * @method FiltersMixins_saveCurrentFilters
        */
        FiltersMixins_saveFilters(filters){
            this.FiltersMixins_checkValidity();
            this.$storage.set("filtres-page-"+this.FiltersMixins_page_name+"-current",filters);
            this.$message(this.$t("filtrage-sauvegarde"),{type:"info","position":"top"});
        },
        /**
        * Save default focused tab.
        *
        * @method FiltersMixins_saveDefaultTab
        */
        FiltersMixins_saveDefaultTab(tabName){
            this.FiltersMixins_checkValidity();
            this.$storage.set("default-tab-page-"+this.FiltersMixins_page_name+"-current",tabName);
        },
        /**
        * Save Current filters.
        *
        * @method FiltersMixins_saveSearchQuery
        */
        FiltersMixins_saveSearchQuery(searchQuery){
            this.FiltersMixins_checkValidity();
            this.$storage.set("filtres-page-"+this.FiltersMixins_page_name+"-current-searchQuery", searchQuery);
        },
        /**
        * Save default pagination.
        *
        * @method FiltersMixins_savePagination
        */
        FiltersMixins_savePagination(offset, limit, currentPage){
            this.FiltersMixins_checkValidity();
            console.log("FILTERSMIXINS SAVE PAGINATION---------------", {offset: offset, limit: limit, currentPage: currentPage});
            this.$storage.set("pagination-page-"+this.FiltersMixins_page_name+"-current", JSON.stringify({offset: offset, limit: limit, currentPage: currentPage}));
        },
        /**
        * Save Current filters.
        *
        * @method FiltersMixins_deleteStoredCurrentFilters
        */
        FiltersMixins_deleteStoredCurrentFilters(){
            this.FiltersMixins_checkValidity();
            this.$storage.set("filtres-page-"+this.FiltersMixins_page_name+"-current",null);
            this.$storage.set("filtres-page-"+this.FiltersMixins_page_name+"-current-searchQuery",null);
            this.$storage.set("default-tab-page-"+this.FiltersMixins_page_name+"-current",null);
        },
        /**
        * Save Current filters.
        *
        * @method FiltersMixins_getStoredSearchQuery
        * @return object
        */
        FiltersMixins_getStoredSearchQuery(){
            this.FiltersMixins_checkValidity();
            return this.$storage.get("filtres-page-"+this.FiltersMixins_page_name+"-current-searchQuery");
        },
        /**
        * Save Current filters.
        *
        * @method FiltersMixins_getStoredFilters
        * @return object
        */
        FiltersMixins_getStoredFilters(){
            this.FiltersMixins_checkValidity();
            let filters = this.$storage.get("filtres-page-"+this.FiltersMixins_page_name+"-current");
            return filters ? filters : {};
        },
        /**
        * get default focused tab
        *
        * @method FiltersMixins_getStoredFilters
        * @return object
        */
        FiltersMixins_getDefaultFocusedTab(){
            this.FiltersMixins_checkValidity();
            return this.$storage.get("default-tab-page-"+this.FiltersMixins_page_name+"-current");
        },
        /**
        * get default pagination
        *
        * @method FiltersMixins_getDefaultPagination
        * @return object
        */
        FiltersMixins_getDefaultPagination(){
            this.FiltersMixins_checkValidity();
            let pagination = this.$storage.get("pagination-page-"+this.FiltersMixins_page_name+"-current");
            return pagination?JSON.parse(pagination):{offset: 0, limit: 25};
        }
    }
};
