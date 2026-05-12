export default {
    data: function(){
        return {

        };
    },
    methods:{
        /**
        * GET tags.
		*
        * @method TagsMixins_get
        * @param Metadatas metadatas
        * @return Promise
        */
        TagsMixins_get: function(metadatas, _options={_stored: true}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                rc.get('/api/tags', query, (datas, meta) => {
                    if(_options._stored){
                        this.$store.dispatch("TagsStore/set", datas);
                        this.$store.dispatch("TagsStore/setCounters", meta?meta.counters:0);
                    }
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * @deprecated
        */
        TagsMixins_getTags: function(tagType=null){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    userId: this.$app.appID,
                    metadatas: {
                        "directives":[],
                        "filters":tagType?[
                            {"attr":"type","value":tagType,"action":"equals"}
                        ]:[]
                    }
				};
                rc.get('/api/tags', query, (datas) => resolve(datas));
			});
        },
        TagsMixins_postTags: function(tags){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					datas: tags
				};
				rc.post('/api/tags?userId='+this.$app.appID, query, (datas) => resolve(datas));
            });
        },
        TagsMixins_putTag: function(tag){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                var query = {
                    datas: [tag]
                };
                rc.put("/api/tag/"+tag.id, query, (datas) => resolve(datas));
            });
        },
        TagsMixins_deleteTag: function(tag){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                rc.delete("/api/"+this.$app.appID+"/tag/"+tag.id, null, (datas) => resolve(datas));
            });
        },
        TagsMixins_listComposantType: function(tags, prefix="composant-type-"){
            return this.$vgutils.sortAsc(tags.map((tag)=>tag=!tag.userId?Object.assign({label: this.$t(prefix+tag.label)}):tag), "label");
        }
    },
    computed:{

    }
};
