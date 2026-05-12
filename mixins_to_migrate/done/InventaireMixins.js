export default {
	methods: {
        /**
        * Fetch all inventaires.
        * @method InventaireMixins_fetch
        * @example // Postman::Inventaire::Get_Inventaires
        * @param Metadatas metadatas
        * @deprecated
        * @return Promise
        */
        inventaireMixins_fetch:function(metadatas){
            return new Promise((resolve, reject) => {
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/"+this.$app.appID+"/inventaire", query,(datas)=>{
                    this.$store.dispatch("InventairesStore/set", datas.inventaires);
                    this.$store.dispatch("InventairesStore/setStateByPath", datas.stateByPath);
                    resolve({datas: datas});
                });
            });
        },
        /**
         * Fetch all inventaires.
         * @method InventaireMixins_fetchAll
         * @example // Postman::Inventaire::Get_Inventaires
         * @param Metadatas metadatas
         * @return Promise 
         */
        InventaireMixins_fetchAll: function(){
            return new Promise((resolve, reject) => {
                this.$rc.get("/api/inventaires", null, (datas)=>{
                    console.log("InventaireMixins_fetchAll", datas);
                    //this.$store.dispatch("InventairesStore/set", datas.inventaires);
                    resolve({datas: datas});
                });
            });
        },
        /**
        * Fetch on inventaire by id.
        * @method InventaireMixins_fetchById
        * @example // Postman::Inventaire::Get_Inventaire_Id
        * @param Integer idInventaire
        * @return Promise
        */
        InventaireMixins_fetchById: function( idInventaire ){
            return new Promise((resolve, reject) => {
                this.$rc.get("/api/"+this.$app.appID+"/inventaire/"+idInventaire, null, (datas)=>{
                    this.$store.dispatch("InventairesStore/setSelectedItem", datas.inventaires[0]); // @TODO à vérifier où l'utiliser
                    let all = datas.stateByPath.notInventoried.map((item)=>{
                        return {
                            equipements_id: item.equipements_id,
                            inventaire_path: item.inventaire_path,
                            lieu_id: item.lieu_id,
                            path: item.path,
                            qtyNotInventoried: item.qtyNotInventoried,
                            qtyInventoried: 0,
                            qtyNotFound: 0
                        };
                    });
                    let indexInAll = null;
                    let stateByPath = datas.stateByPath;
                    datas.stateByPath.inventoried.forEach((item, i) => {
                        indexInAll = all.findIndex((i)=>i.path==item.path);
                        if(indexInAll!=-1){
                            all[indexInAll].qtyInventoried = all[indexInAll].qtyInventoried+parseInt(item.qtyInventoried);
                        }else{
                            all.push({
                                equipements_id: item.equipements_id,
                                inventaire_path: item.inventaire_path,
                                lieu_id: item.lieu_id,
                                path: item.path,
                                qtyNotInventoried: 0,
                                qtyInventoried: item.qtyInventoried,
                                qtyNotFound: 0
                            });
                        }
                    });
                    datas.stateByPath.notFound.forEach((item, i) => {
                        indexInAll = all.findIndex((i)=>i.path==item.path);
                        if(indexInAll!=-1){
                            all[indexInAll].qtyNotFound = all[indexInAll].qtyNotFound+parseInt(item.qtyNotFound);
                        }else{
                            if(item.path && item.equipements_id && item.inventaire_path){ 
								all.push({
	                                equipements_id: item.equipements_id,
	                                inventaire_path: item.inventaire_path,
	                                lieu_id: item.lieu_id,
	                                path: item.path,
	                                qtyNotInventoried: 0,
	                                qtyInventoried: 0,
	                                qtyNotFound: item.qtyNotFound
	                            });
							}
                        }
                    });
                    stateByPath.all = all;
                    this.$store.dispatch("InventairesStore/setStateByPath", stateByPath);
                    resolve({datas: {inventaires: datas.inventaires, stateByPath: stateByPath}});
                });
            });
        },
        /**
        * Fetch inventaire en cours and store it.
        * @method InventaireMixins_fetchEnCoursInventory
        */
        InventaireMixins_fetchEnCoursInventory:function(){
            // //console.log("InventaireMixins_fetchEnCoursInventory");
            this.InventaireMixins_fetch().then((inventaires)=>{
                let lastInventaireId = inventaires.inventaires[inventaires.inventaires.length-1]['inventaire_id'];
                this.InventaireMixins_fetchById(lastInventaireId);
            });
        },
        /**
        * Fetch Inventaire's operations.
        * @method InventaireMixins_fetchOperationsByInventaireId
        * @example // Postman::Inventaire::GET_Operations_Inventaire_Id
        * @param Integer id inventaire_id
        * @return Promise
        */
        InventaireMixins_fetchOperationsByInventaireId:function(id){
            return new Promise((resolve, reject) => {
                this.$rc.get("/api/"+this.$app.appID+"/inventaire/"+id+"/operations",null,(operations)=>{
                    this.$store.dispatch("OperationsInventairesStore/setOperations", operations);
                    resolve({datas: operations});
                });
            });
        },
        /**
        * Fetch Inventaire's operations On a given lieu .
        * @method InventaireMixins_fetchOperationsByInventaireIdOnLieu
        * @example // Postman::Inventaire::Post_Inventaire
        * @param Integer inventaire_id inventaire_id
        * @param Integer lieu_id lieu de l'inventaire
        * @return Promise
        */
        InventaireMixins_fetchOperationsByInventaireIdOnLieu:function( inventaire_id, lieu_id ){
            return new Promise((resolve, reject) => {
                this.$rc.get("/api/"+this.$app.appID+"/inventaire/"+inventaire_id+"/operations/lieu/"+lieu_id,null,(operations)=>{
                    this.$store.dispatch("OperationsInventairesStore/setOperations", operations);
                    resolve({datas: operations});
                });
            });
        },
        /**
        * Finalize Inventaire On lieu. All equipement in this Lieu will be considered
        * Inventorie and an operation foreach equipement is generated
        * @method InventaireMixins_finalizeInventaireOnLieu
        * @example // Postman::Inventaire::Post_finalize_inventaire_on_lieu
        * @param Integer id inventaire_id
        * @param Integer id lieu_id
        * @Deprecated
        */
        InventaireMixins_finalizeInventaireOnLieu:function( inventaire_id, lieu_id ){
            var that = this;
            const RC = this.$rc;
            RC.post("/api/"+this.$app.appID+"/inventaire/"+inventaire_id+"/operations/lieu/"+lieu_id+"/finalize",null,function(inventaire){
                // //console.log(inventaire);
            })
        },
        /**
        * Fetch Inventaire's operations
        * @method InventaireMixins_create
        * @example // Postman::Inventaire::Post_Inventaire
        * @param Object[] inventaires
        * @return Promise
        */
        InventaireMixins_create:function( inventaires ){
            const RC = this.$rc;
            // //console.log(inventaire);
            return new Promise((resolve, reject) => {
                // //console.log(inventaire);
                RC.post(
                    "/api/inventaires",
                    inventaires,
                    (createdInventaires) => {
                        if(createdInventaires){
                            this.$store.dispatch("InventairesStore/addItems", createdInventaires);
                            resolve(createdInventaires);
                        }else reject(createdInventaires)
                    }
                );
            });
        },
        /**
        * Fetch create Inventaire's operations
        * @method InventaireMixins_create_operation
        * @param Object operation
        * @param Integer id inventaire_id
        * @param Integer id lieu_id
        * @return Promise
        */
        InventaireMixins_create_operation:function( operation, inventaire_id, lieu_id ){
            return new Promise((resolve, reject) => {
                this.$rc.post("/api/"+this.$app.appID+"/inventaire/"+inventaire_id+"/operations/lieu/"+lieu_id, operation, (createdoperation) => {
                    if(createdoperation){
                        //this.$store.dispatch("OperationsInventairesStore/addOperation", createdoperation);
                        this.InventaireMixins_fetchOperationsByInventaireIdOnLieu(inventaire_id, lieu_id).then((datas)=>{

                        });
                        resolve(createdoperation);
                    }else reject(createdoperation);
                });
            });
        },
        /**
        * remove Inventaire's operation's id
        * @method InventaireMixins_removeOperationInventaire
        * @param Object operation
        * @return Promise
        */
        InventaireMixins_removeOperationInventaire:function( operation ){
            return new Promise((resolve, reject) => {
                this.$rc.delete("/api/"+this.$app.appID+"/inventaire/"+operation.inventaire_id+"/operation/"+operation.id, null, (data)=>{
                    //this.$store.dispatch("OperationsInventairesStore/removeInventoried", operation_id);
                    this.InventaireMixins_fetchOperationsByInventaireIdOnLieu(operation.inventaire_id, operation.lieuInventorier_id).then((datas)=>{

                    });
                    resolve(data);
                });
            });

        },
        /**
        * remove Inventaire id
        * @method InventaireMixins_deleteInventaire
        * @param integer inventaire id
        * @return Promise
        */
        InventaireMixins_deleteInventaire:function( inventaireId ){
            return new Promise((resolve, reject) => {
                this.$rc.delete("/api/"+this.$app.appID+"/inventaire/"+inventaireId, null, (data)=>{
                    resolve(data);
                });
            });
        }
    },
	computed: {}
};
