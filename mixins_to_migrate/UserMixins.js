export default {
    methods: {
        UserMixins_logout:function(){
            let query = {
                metadatas: {"directives":[],"filters":[]},
            };
            this.$rc.get("/api/logout", query, (datas, meta) => {
                this.$store.dispatch("UsersStore/set", {});
                window.sessionStorage.removeItem("user");
                this.$auth0.logout(    {
                    logoutParams: {
                        returnTo: window.location.origin
                    }
                })
            });
            return;
            return new Promise((resolve,reject)=>{
                let query = {
                    metadatas: {"directives":[],"filters":[]},
                };
                this.$rc.get("/api/logout", query, (datas, meta) => {
                    this.$store.dispatch("UsersStore/set", {});
                    window.sessionStorage.removeItem("user");
                    resolve();
                    //this.$router.push({ name: '_login' });
                });
            });
        },
        /**
        * Get Users.
        * Fetch users with their personnal datas on the given account.
        * @param string userId
        * @return Promise
        */
        UserMixins_getUsers:function(userId,metadatas){
            return new Promise((resolve, reject) => {
                let query = {
                    metadatas: metadatas.get(),
                };
                this.$rc.get("/api/users/"+userId, query, (datas, meta) => {
                    this.$store.dispatch("UsersStore/set", datas.users);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
        /**
        * Get Users restreints.
        * Fetch users with their personnal datas on the given account.
        * @param string userId
        * @return Promise
        */
        UserMixins_getUsersRestreints:function(userId, metadatas, restrictionSite=null){
            return new Promise((resolve, reject) => {
                let sites = restrictionSite?restrictionSite:this.$app.restrictionsite;
                if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PS - ") && this.$app.restrictionsite=="FpF/PS ") sites = "FpF/PS ";
                else if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PHD - ") && this.$app.restrictionsite=="FpF/PHD ") sites = "FpF/PHD ";
                else if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PMSCI") && this.$app.restrictionsite=="FpF/IMSCI") sites = "FpF/IMSCI";
                else if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PSA") && this.$app.restrictionsite=="FpF/PSA") sites = "FpF/PSA";
                let query = {
                    metadatas: metadatas.get(),
                    sites: sites //restrictionSite?restrictionSite:this.$app.restrictionsite
                };
                this.$rc.get("/api/users/"+userId, query, (datas, meta) => {
                    this.$store.dispatch("UsersStore/set", datas.users);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
        /**
         * Get Users affectables.
         * Fetch users with their personnal datas on the given account.
         * @param string userId
         * @return Promise
         * */
        UserMixins_getAffectables:function(userId, metadatas, restrictionSite=null){
            return new Promise((resolve, reject) => {
                let sites = restrictionSite?restrictionSite:this.$app.restrictionsite;
                if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PS - ") && this.$app.restrictionsite=="FpF/PS ") sites = "FpF/PS ";
                else if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PHD - ") && this.$app.restrictionsite=="FpF/PHD ") sites = "FpF/PHD ";
                else if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PMSCI") && this.$app.restrictionsite=="FpF/IMSCI") sites = "FpF/IMSCI";
                else if(this.$app.appID=="GUzAOyS6Bw" && restrictionSite.includes("PSA") && this.$app.restrictionsite=="FpF/PSA") sites = "FpF/PSA";
                let query = {
                    metadatas: metadatas.get(),
                    sites: sites
                };
                this.$rc.get("/api/users/"+userId, query, (datas, meta) => {
                    this.$store.dispatch("AffectablesStore/set", datas.users);
                    resolve({"datas":datas,"metadatas":meta});
                });
            });
        },
        /**
        * Create User.
        *
        * @param object user
        * @return Promise
        */
        UserMixins_create:function(userDatas){
            let user = Object.assign({}, userDatas, {
                lang: this.$langs.current
            });
            return new Promise((resolve, reject) => {
                this.$rc.post("/api/user", user, (datas) => resolve(datas));
            });
        },
        /**
        * Update User.
        * Id must be provided in the user Object.
        * @param object user
        * @return Promise
        */
        UserMixins_update:function(user){
            user.lang = this.$langs.current;
            return new Promise((resolve, reject) => {
                this.$rc.put("/api/user/"+user.id, user, (datas) => resolve(datas));
            });
        },
        /**
        * Delete User.
        * Id must be provided in the user Object.
        * @param object user
        * @return Promise
        */
        UserMixins_delete:function(user){
            return new Promise((resolve, reject) => {
                this.$rc.delete("/api/user/"+user.id+"?userId="+this.$app.appID, user, (datas) => resolve(datas));
            });
        },
        /**
        * Open a new tab to download file csv or excel.
        *
        * @param Metadatas metadatas
        * @param string filetype csv|excel
        * @return Promise
        */
        UserMixins_getFile: function(metadatas, filetype = "csv") {
            return new Promise((resolve, reject) => {
                var rc = this.$rc;
                var that = this;
                metadatas.setDirectives([]);
                var query = {
                    userId: this.$app.appID,
                    sites: this.$app.restrictionsite || '',
                    metadatas: metadatas.get()
                };
                let fileExtension = filetype != "csv" ? "xlsx" : "csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv";
                let responseType = fileExtension != "csv" ? "blob" : "text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
                rc.get("/api/users/" + this.$app.appID + "/export/" + fileExtension, query, function(response, remoteMetadatas) {
                    let blob;
                    if (fileExtension === "csv") {
                        // Add BOM for UTF-8 encoding
                        const BOM = "\uFEFF";
                        blob = new Blob([BOM + response], { type: contentType });
                    } else {
                        blob = new Blob([response], { type: contentType });
                    }
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    metadatas.setLimit(0, 25);
                    link.setAttribute('download', 'Verifgood_export-users_' + moment().format("DD-MM-YYYY") + '.' + fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
                });
            });
        },
    }
};
