export default {
    methods:{
        personalParameters_localStorageWorksHere: function(){
            return typeof(Storage) !== "undefined";
        },
        personalParameters_getAllDisplayable:function(){
            //if(this.personalParameters_localStorageWorksHere()) return null;
            return JSON.parse(localStorage.getItem("personalParameters_isdisplayable"));
        },
        personalParameters_getlandingPage:function(){
            //if(this.personalParameters_localStorageWorksHere()) return null;
            return localStorage.getItem("personalParameters_landingPage");
        },
        personalParameters_getDefaultLandingPage:function(role=null){
            if(role=="ROLE_BASIC") return "/demandeintervention";
            return "_maintenances";
        },
        personalParameters_setLandingPage:function(endpoint){
            localStorage.setItem('personalParameters_landingPage',endpoint);
        },
        personalParameters_isDisplayable:function(key){
            //if(this.personalParameters_localStorageWorksHere()) return null;
            var displayableList = JSON.parse(localStorage.getItem("personalParameters_isdisplayable"));
            var debug = displayableList[key] && typeof(displayableList[key]) === "boolean" ? displayableList[key] : true;
            this.$forceUpdate();
            return debug;
        },
        personalParameters_addDisplayable:function(element,isDisplayable){
            //if(this.personalParameters_localStorageWorksHere()) return null;
            localStorage.setItem(element, isDisplayable);
        },
        personnalParameters_setUseIntegratedScanerInKeyboard:function(bool){
            localStorage.setItem('personalParameters_useIntegratedScanerInKeyboard',bool);
        },
        personnalParameters_getUseIntegratedScanerInKeyboard:function(){
            return JSON.parse(localStorage.getItem('personalParameters_useIntegratedScanerInKeyboard'));
        }
    },
    beforeCreate:function(){
        if(!localStorage.getItem('personalParameters_landingPage')) {
            localStorage.setItem('personalParameters_landingPage',"_maintenances");
        }
        if(!localStorage.getItem('personalParameters_useIntegratedScanerInKeyboard')) {
            localStorage.setItem('personalParameters_useIntegratedScanerInKeyboard',false);
        }

    },
    computed:{
        personalParameters_computed_getAllDisplayable:function(){
            return this.personalParameters_getAllDisplayable();
        }
    }
};
