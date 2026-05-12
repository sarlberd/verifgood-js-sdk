export default {
    methods:{
        /**
        * Create Affectation Tache Users.
        *
        * @param object tacheUsers
        * @param integer tacheId
        * @return Promise
        */
        tacheUsersMixins_create:function(tacheUsers, tacheId){
            return new Promise((resolve, reject) => {
                this.$rc.post("/api/tache/"+tacheId+"/users?userId="+this.$app.appID, tacheUsers, (datas) => {
                    // récupérer le getSelectedItem dans tachesStore
                    let tache = this.$store.getters["TachesStore/getSelectedItem"];
                    if(tache){
                        tache.assignation = tacheUsers.map((tacheUser) => {
                            return tacheUser.user_id;
                        });
                        this.$store.dispatch("TachesStore/setSelectedItem", tache);
                    }
                    resolve(datas);
                });
            });
        },
    }
}
