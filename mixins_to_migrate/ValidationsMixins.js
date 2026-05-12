export default {
    methods:{
        /**
        * POST Validations.
		*
        * @method ValidationsMixins_create
        * @param Integer idBonDeCommande
        * @param Array validations
        * @return Promise
        */
        ValidationsMixins_validationsBonDeCommande: function(idBonDeCommande, validations){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/bon-de-commande/"+idBonDeCommande+"/validations", {"datas": validations}, (bonDeCommande) => {
                    console.log("AFTER POST BONDECOMMANDE VALIDATIONS", bonDeCommande);
                    this.$store.dispatch("BonsDeCommandeStore/updateItem", bonDeCommande);
                    resolve({bonDeCommande: bonDeCommande});
                });
			});
        }
    }
};
