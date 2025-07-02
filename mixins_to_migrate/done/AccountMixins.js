
export default {
    mounted: function(){

    },
    computed:{

    },
    methods:{
        /**
        * @param Object data
        */
        AccountMixins_update: function(data){
            return new Promise((resolve, reject) => {
                this.$rc.put("/api/account", {datas: data}, (account) => {
                    let sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
                    if(account.hasOwnProperty("address")) sessionUser = Object.assign({}, sessionUser, {account_address: account.address});
                    if(account.hasOwnProperty("immatriculation")) sessionUser = Object.assign({}, sessionUser, {account_immatriculation: account.immatriculation});
                    window.sessionStorage.setItem('user', JSON.stringify(sessionUser));
    				resolve(account);
    			});
            });
		},
        /**
        * @param Object data
        */
        AccountMixins_fetch: function(data){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {};
                rc.get("/api/account", query, (datas) => {
                    resolve(datas);
                });
			});
		},
        /**
        * @param Object data
        */
        AccountMixins_create: function(account){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                let lang = navigator.language;
                rc.post("/api/cfae5733-8860-48d6-8346-693a93816c6e/account/"+lang, account, (response) => {
                    resolve(response);
                });
			});
		},
    }
}
