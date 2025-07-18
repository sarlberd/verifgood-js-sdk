export default {
    methods:{
        /**
        * POST Validations.
		*
        * @method DeplacementsEquipementsMixins_createDeplacementsEquipements
        * @param array array of deplacements
        * @param Array deplacements
        * @return Promise
        */
        DeplacementsEquipementsMixins_createDeplacementsEquipements: function(deplacements){
            return new Promise((resolve, reject)=>{
				this.$rc.post("/api/deplacements/equipements",deplacements, (result) => {
                    console.log("AFTER POST deplacements", result);
                    resolve();
                });
			});
        }
    }
};
