import moment from "moment";

export default {
	data: function(){
		return {
			OperationMixins: {
				//id:null,
				operation: "",
				retourClient: "",
				dateOperation: "",
				ficheSav: null,

				__uploadedFile: null,
				__action: null,

				idUser: this.$app.idUser,
				userId: this.$app.appID,

				tiers: null

			}
		};
	},
	created: function(){

	},
	methods: {
		/**
        * GET operations liste.
        *
        * @param Object Metadatas.
        */
        OperationsMixins_get: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
					metadatas: metadatas.get()
				};
                this.$rc.get("/api/operations", query, (datas, meta) => {
					this.$store.dispatch("OperationsStore/set", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
		OperationMixins_delete: function(operation){
			return new Promise((resolve, reject)=>{
				this.$rc.delete("/api/operation/"+operation.id+"?userId="+this.$app.appID, null, (datas)=>{
					this.$store.dispatch("OperationsStore/deleteItem", operation.id);
					resolve(datas);
				});
			});
		},

		OperationMixins_createBIOperation: function(data, callback){
			var restClientObj = this.$rc;
			var that = this;

			this.OperationMixins.operation = "Bon Intervention";
			this.OperationMixins.ficheSav = data.ficheSav;
			this.OperationMixins.tiers = data.tiers;
			this.OperationMixins.__uploadedFile = data.__uploadedFile.id;
			this.OperationMixins.__action = data.__action;
			this.OperationMixins.dateOperation = moment().format("YYYY-MM-DD HH:mm:ss");

			// //console.log("OperationMixins_createOperation_v2", this.OperationMixins);

			restClientObj.post("/api/V2.0/Operation", this.OperationMixins, callback || function(response){
				// //console.log("datas created...", response);

			});
		},
		OperationMixins_createPhotoOperation: function(idFM, file, callback){
			var rc = this.$rc;
			var that = this;
			var query = {
				__action: "photo",
				__uploadedFile: file.id,
				ficheSav: idFM,
				dateOperation: moment().format("YYYY-MM-DD HH:mm:ss"),
				idUser: this.$app.idUser,
				userId: this.$app.appID
			};
			//// //console.log("QUERY CREATE OPERATION", query);
			rc.post("/api/V2.0/Operation", query, callback || function(response){

			});
		},
		OperationMixins_updateOperation: function(callback){
			var restClientObj = this.$rc;
			var that = this;
			restClientObj.put("/api/V2.0/Put/Operation", this.OperationMixins, callback || function(response){
				// //console.log("datas modified...", response);
			});
		},

		/**
        * Open a new tab to download file csv or excel.
        *
        * @param Metadatas metadatas
        * @param string filetype csv|excel
        * @return Promise
        */
		OperationMixins_getFile: function(metadatas,fileExtension="csv"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
    			var that = this;
                metadatas.setDirectives([]);
    			var query = {
                    userId:this.$app.appID,
                    sites: this.$app.restrictionsite || '',
                    metadatas: metadatas.get()
                };
				let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
    			rc.get("/api/operations/export/"+fileType, query, function(response,remoteMetadatas){
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
                    metadatas.setLimit(0,25);
                    link.setAttribute('download', 'Verifgood_export-taches_a_prevoir_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
    			});
            });

		},
	},
	computed: {

	}
};
