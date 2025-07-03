export default {
    methods:{
        /**
        * POST GroupeValidateursUsers.
		*
        * @method GroupeValidateursMixins_create
        * @param Object groupeValidateurs
        * @param Array validateurs - liste des object users à associer au groupeValidateurs
        * @return Promise
        */
        GroupeValidateursUsersMixins_create: function(groupeValidateurs, validateurs){
            return new Promise((resolve, reject)=>{
                let groupeValidateursUsers = [];
                validateurs.forEach((validateur)=>{
                    groupeValidateursUsers.push({
                        validateur_id: validateur.id,
                        groupeValidateur_id: groupeValidateurs.id
                    });
                });
				this.$rc.post("/api/groupe-validateurs-users", {"datas": groupeValidateursUsers}, (datas) => {
                    console.log("AFTER POST groupeValidateursUsers", datas);
                    this.$store.dispatch("GroupeValidateursStore/addGroupeValidateursUsers", {groupeValidateurs: groupeValidateurs, groupeValidateursUsers: datas});
                    resolve(datas);
                });
			});
        },
        /**
        * DELETE GroupeValidateursUsers.
        *
        * @method GroupeValidateursMixins_delete
        * @param object groupeValidateurUser
        * @return Promise
        */
        GroupeValidateursUsersMixins_delete: function(groupeValidateurUser){
            return new Promise((resolve, reject)=>{
				this.$rc.delete('/api/groupe-validateur-user/'+groupeValidateurUser.id, null, (data) => {
                    this.$store.dispatch("GroupeValidateursStore/deleteGroupeValidateurUser", {groupeValidateur_id: groupeValidateurUser.groupeValidateur_id, groupeValidateurUser: groupeValidateurUser});
                    resolve(data);
                });
			});
        },
    }
};
