
export default {
	methods: {
        /**
        * Create UserParameters.
        *
        * @param object user
        * @return Promise
        */
        UserParametersMixins_create:function(userParameters){
            return new Promise((resolve, reject) => {
                this.$rc.post("/api/userparameters", userParameters, (datas) => resolve(datas));
            });
        },
        /**
        * Update UserParameters.
        * Id must be provided in the user Object.
        * @param object userParameters
        * @return Promise
        */
        UserParametersMixins_update:function(userParameters){
            return new Promise((resolve, reject) => {
                this.$rc.put("/api/userparameters", userParameters, (datas) => resolve(datas));
            });
        },
        /**
        * Delete UserParameter.
        * Id must be provided in the userparameter Object.
        * @param object userParameter
        * @return Promise
        */
        UserParametersMixins_delete:function(userParameter){
            return new Promise((resolve, reject) => {
                this.$rc.delete("/api/userparameter/"+userParameter.id+"?userId="+this.$app.appID, userParameter, (datas) => resolve(datas));
            });
        },
	}
};
