/**
* @module TiersMixins
*
*/
export default {
	methods: {
		/**
        * GET tiers.
		*
        * @method TiersMixins_get
        * @param {Metadatas} metadatas
        * @return {Promise}
        */
        TiersMixins_get: function(metadatas){
            return new Promise((resolve, reject) => {
                let query = {
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite,
                    userId: this.$app.appID
                };
                this.$rc.get("/api/tiers", query, (datas, meta) => {
					this.$store.dispatch("TiersStore/set", datas);
	                //this.$store.dispatch("TiersStore/setCounters", meta.counters);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
		/**
        * GET tiers.
		*
        * @method TiersMixins_getTiersId
        * @param {integer} id
        * @return {Promise}
        */
        TiersMixins_getTiersId: function(id, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
                let query = {};
                this.$rc.get("/api/tiers/"+id, query, (tier, meta) => {
                    if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("TiersStore/setSelectedItem", tier);
                    resolve(tier);
                });
            });
        },
		/**
        * Update tier.
        * @method TiersMixins_update
        * @param {object} tier
        * @return {Promise}
        */
        TiersMixins_update: function(tier, _options={skipVueXStorage: false}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID
				};
                rc.put("/api/tiers/"+tier.id, {"datas":tier}, (tier) => {
                    if(!_options || (_options && _options.hasOwnProperty("skipVueXStorage") && _options.skipVueXStorage==false)) this.$store.dispatch("TiersStore/setSelectedItem", tier);
                    resolve(tier);
                });
			});
        },
        /**
        * Create tiers.
        * @method TiersMixins_create
        * @param array tiers
        * @return {Promise}
        */
        TiersMixins_create: function(tiers){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.post("/api/tiers", {"datas":[tiers]}, (tiers) => {
                    this.$store.dispatch("TiersStore/addItems", tiers);
                    resolve(tiers);
                });
			});
        },
        /**
        * Delete tiers.
        * @method TiersMixins_delete
        * @param {object} tier
        * @return {Promise}
        */
        TiersMixins_delete: function(tier){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                rc.delete("/api/tiers/"+tier.id+"?userId="+this.$app.appID, tier, (datas) => {
                    this.$store.dispatch("TiersStore/deleteItem", tier["id"]);
                    resolve(datas);
                });
			});
        },
	}
};
