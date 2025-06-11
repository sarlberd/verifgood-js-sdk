export default {
    data:function(){
        return {

        }
    },
    methods:{
        /**
         * Get Checkpoint.
         * @method checkpointsMixins_getCheckpoint.
         * @param {Metadatas} Metadatas
         * @return {Promise}
        */
        checkpointsMixins_getCheckpoint:function(metadatas){
            return new Promise((resolve, reject)=>{
                let query = {
                    metadatas: metadatas.get()
                };
                this.$rc.get("/api/checkpoints", query, (checkpoints, meta) => {
                    this.$store.dispatch("CheckpointsStore/set", checkpoints);
                    resolve(checkpoints);
                });
            });
        },
        /**
         * Create Checkpoint.
         * @method checkpointsMixins_createCheckpoints
         * @param {array} checkpoint array of checkpoint object
         * @return {Promise}
        */
        checkpointsMixins_createCheckpoints:function(checkpoints){
            return new Promise((resolve, reject)=>{
                this.$rc.post("/api/checkpoints", {"datas":checkpoints}, (datas) => resolve(datas));
            });
        },
        /**
         * Update Taches.
         * @method checkpointsMixins_updateCheckpoint
         * @param {object} checkpoint
         * @return {Promise}
        */
        checkpointsMixins_updateCheckpoint:function(checkpoint){
            return new Promise((resolve, reject)=>{
                this.$rc.put("/api/checkpoints/"+checkpoint.id, {"datas":checkpoint}, (datas) => resolve(datas));
            });
        },
        /**
         * Delete Checkpoint.
         * @method checkpointsMixins_deleteCheckpoint
         * @param {object} checkpoint
         * @return {Promise}
        */
        checkpointsMixins_deleteCheckpoint:function(checkpoint){
            return new Promise((resolve, reject)=>{
                this.$rc.delete("/api/checkpoints/"+checkpoint.id, {"datas":checkpoint}, (datas) => resolve(datas));
            });
        }
    }
}
