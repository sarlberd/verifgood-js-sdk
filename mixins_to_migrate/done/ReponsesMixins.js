export default {
    data: function(){
        return {

        };
    },
    methods:{
        /**
        * Get Reponses.
        *
        * @param array filters
        * @param array directives
        * @return Promise
        */
        ReponsesMixins_getReponses: function(filters,directives){
            return new Promise((resolve, reject) =>{
				var query = {
					userId: this.$app.appID,
                    metadatas: {
                        "directives": directives,
                        "filters": filters
                    }
				};
                if(this.$app.restrictionsite) query.sites = this.$app.restrictionsite;
                this.$rc.get('/api/reponses', query, (datas) => resolve(datas));
            });
        },
        /**
        * Update reponses.
        * @param Object reponse reponse.datas
        * @return Promise
        */
        ReponsesMixins_updateReponse: function(reponse){
            var that = this;
            let id = reponse["datas"]["id"];
            return new Promise((resolve, reject) =>{
                this.$rc.put('/api/reponse/'+id+'?userId='+this.$app.appID,reponse, (data)=>{
                    resolve(data);
                });
            });

        },
        ReponsesMixins_setConsoJournaliere: function (tableauRelevesCompteur) {
            var tableauRelevesCompteurLen = tableauRelevesCompteur.length;
			// //console.log("LEN", tableauRelevesCompteurLen);
            for (var index = 0; index < tableauRelevesCompteurLen ; ++index ) {
                var releveCompteur = tableauRelevesCompteur[index];
				// //console.log("RELEVE COMPTEUR", releveCompteur);
                this.findPreviousRegisterResponse(index, releveCompteur, tableauRelevesCompteur);
            }
        },
        isPreviousRegisterResponse: function(examinedRegisterResponse, releveCompteur) {
			// //console.log("IS PREVIOUS register response", examinedRegisterResponse, releveCompteur, examinedRegisterResponse.id == releveCompteur.id && examinedRegisterResponse.etid == releveCompteur.etid && examinedRegisterResponse.idCheckpoint == releveCompteur.idCheckpoint);
			return examinedRegisterResponse.id == releveCompteur.id && examinedRegisterResponse.etid == releveCompteur.etid && examinedRegisterResponse.idCheckpoint == releveCompteur.idCheckpoint;
            /*if (examinedRegisterResponse.qrCode === releveCompteur.qrCode && examinedRegisterResponse.question === releveCompteur.question) {
                return true;
            } else {
                return false;
            }*/
        },
        findPreviousRegisterResponse: function (index, releveCompteur, tableauRelevesCompteur) {
			// //console.log("find previous register response", index, releveCompteur, tableauRelevesCompteur);
            for (var position = index + 1; position < tableauRelevesCompteur.length; position++) {
                var examinedRegisterResponse = tableauRelevesCompteur[position];
				// //console.log("examinedRegisterResponse", examinedRegisterResponse);
                if (this.isPreviousRegisterResponse(examinedRegisterResponse, releveCompteur)) {
                    var consoJournaliere = this.getOutput(examinedRegisterResponse, releveCompteur, 'days');
                    releveCompteur.consoJournaliere = consoJournaliere;
					// //console.log("RELEVER COMPTEUR consoJournaliere", releveCompteur.consoJournaliere);
                    break;
                }else{
					// //console.log("RELEVER COMPTEUR ici");
				}
            }
        }
    },
    computed:{

    }
};
