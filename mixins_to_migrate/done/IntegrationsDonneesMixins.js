
export default {
    mounted: function(){

    },
    computed:{

    },
    methods:{
        /**
        * @param Object data
        */
        IntegrationsDonneesMixins_categoriesLieux: function(composants){
            return new Promise((resolve, reject) => {
                let payload = {
                    "csv":composants
                }
                this.$rc.post("/api/integration/categories/lieux/json", payload, (categoriesLieux) => {
    				resolve(categoriesLieux);
    			});
            });
		}
       
    }
}
