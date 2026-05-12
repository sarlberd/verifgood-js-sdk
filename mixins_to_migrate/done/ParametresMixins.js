
export default {
    mounted: function(){

    },
    computed:{

    },
    methods:{

        ParametresMixins_get: function(){
            return new Promise((resolve, reject) =>{
				var query = {};
                this.$rc.get('/api/parameters', query, (datas) => resolve(datas));
            });
        },
        /**
        * @param Object datas
        */
        ParametresMixins_update: function(datas){ 
            return new Promise((resolve, reject) => {
                let parameter = Object.assign({}, datas, {userId: this.$app.appID});
                this.$rc.put("/api/parameter", {datas: parameter}, (p) => {
                    let sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
                    sessionUser = Object.assign({}, sessionUser, p);
                    window.sessionStorage.setItem('user', JSON.stringify(sessionUser));
    				resolve(p);
    			});
            });
		},
        /**
        * @param Object datas
        */
        ParametresMixins_deleteDemoAccount: function(entitiesToRemove){
            entitiesToRemove = !entitiesToRemove ? {"maintenances":true,"equipements":true,"lieux":true,"contrats":true,"tiers":true,"contacts":true,"taches":false,"consommables":false,"categories":true} : entitiesToRemove;
            let datas = {id:null};
            return new Promise((resolve, reject) => {
                let parameter = Object.assign({}, datas, {userId: this.$app.appID});
                this.$rc.delete("/api/account/demo/datas?entitiesToRemove="+JSON.stringify(entitiesToRemove), {datas: parameter}, (p) => {
    				resolve(p);
    			});
            });
		}
    }
}
