export default {
    data: function(){
        return {

        };
    },
    methods:{
        /**
        * GET SortieEquipement types.
		*
        * @method SortieEquipementMixins_get
        * @param Metadatas metadatas
        * @return Promise
        */
        SortieEquipementMixins_getTypes: function(metadatas){
            return new Promise((resolve, reject)=>{
				var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get('/api/sortieequipement/types', query, (datas, meta) => {
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        }
    },
    computed:{

    }
};
