export default {
    data:function(){
        return {

        }
    },
    methods:{
        /**
         * Get Taches.
         * @method stripeMixins_openCustomerPortal
        */
        stripeMixins_openCustomerPortal:function(){
            return new Promise((resolve, reject)=>{
                let query = {
                    
                };

                this.$rc.get("/api/stripe/customer/portal", query, (portalPayload, meta) => {
                    // open in another tab the portalPayload.url
                    window.open(portalPayload.url, '_blank');
                    resolve(portalPayload);
                });
            });
        },
        /**
         * Get Taches.
         * @method stripeMixins_openCustomerPortal
        */
        stripeMixins_getCustomerState:function(){
            return new Promise((resolve, reject)=>{
                let query = {
                    
                };

                this.$rc.get("/api/stripe/customer", query, (customerState, meta) => {
                    // open in another tab the portalPayload.url
                    console.log(customerState);
                    resolve(customerState);
                });
            });
        },
    } 
}
