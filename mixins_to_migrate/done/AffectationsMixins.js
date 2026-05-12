import { start } from "nprogress";

export default {
    data: function() {
        return {
            AffectationsMixins: {
				calendarsColors: [
					/*"#FF9900", "#8C6C6C", "#D49797", "#1F947B", "#3299BB", "#DB6466",
					"#775AC7", "#C7BA47", "#3BED79", "#8CAF54", "#FFD7C9", "#C15719",
					"#F4B0D3", "#3385D8"*/
					"#D4E6F1", "#F5B7B1", "#D7BDE2",
					"#A3E4D7", "#FAD7A0", "#ABEBC6",
					"#EDBB99", "#85C1E9", "#F2D7D5",
					"#AEB6BF"
				],
            }
        };
    },
    methods: {
        /**
        * copie affectation tache.
        *
        * @param array maintenances
        */
        AffectationsMixins_copieAffectationTache: function(affectation, start, end, affectes=[]){
            return new Promise((resolve, reject)=>{
                let payload = {
                    affectation: affectation,
                    affectes: affectes,
                    start: start,
                    end: end,
                    dateAffectation: moment().format("YYYY-MM-DD HH:mm"),
                    idAffectant: this.$app.idUser
                };
                this.$rc.post("/api/affectation/tache/"+affectation.id+"/copie?userId="+this.$app.appID, payload, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * create affectationsuserstaches.
        *
        * @param array maintenances
        */
        AffectationsMixins_createAffectationsUsersTaches: function(affectes){
            return new Promise((resolve, reject)=>{
                this.$rc.post("/api/affectationsuserstaches?userId="+this.$app.appID, {datas: affectes}, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * delete affectationsuserstaches.
        *
        * @param array maintenances
        */
        AffectationsMixins_deleteAffectationsUsersTaches: function(affecte){
            return new Promise((resolve, reject)=>{
                let affectationusertache = {
                    id: affecte.affectationusertache_id,
                    user_id: affecte.affectationusertache_user_id,
                    affectation_id: affecte.affectationusertache_affectation_id,
                    tache_id: affecte.affectationusertache_tache_id,
                    userId: this.$app.appID
                };
                this.$rc.delete("/api/affectationsuserstaches/"+affecte.affectationusertache_id+"?userId="+this.$app.appID, affectationusertache, (datas) => {
                    resolve(datas);
                });
			});
        },
        /**
        * delete affectation.
        *
        * @param array maintenances
        */
        AffectationsMixins_deleteAffectation: function(idAffectation){
            return new Promise((resolve, reject)=>{
                let affectation = {
                    id: idAffectation,
                    userId: this.$app.appID
                };
                this.$rc.delete("/api/affectation/"+idAffectation+"?userId="+this.$app.appID, affectation, (datas) => {
                    resolve(datas);
                });
			});
        },
        AffectationsMixins_saveSchedule: function(schedule, maintenance, emailDatas) {
            return new Promise((resolve, reject)=>{
				let email = Object.assign({}, emailDatas, {
                    demandeur: {
                        id: this.$app.idUser,
                        email: this.$app.email,
                        nom: this.$app.nom,
                        prenom: this.$app.prenom
                    }
                });
				var query = {
                    datas: schedule,
                    maintenance: maintenance,
                    email: email,
					userId: this.$app.appID
				};
                this.$rc.post("/api/affectation/maintenance/"+maintenance.id, query, (datas)=>resolve(datas));
			});
        },        
        AffectationsMixins_saveSchedules: function(schedule, maintenances) {
            return new Promise((resolve, reject)=>{
                let email = Object.assign({}, {
                    demandeur: {
                        id: this.$app.idUser,
                        email: this.$app.email,
                        nom: this.$app.nom,
                        prenom: this.$app.prenom
                    }
                });
				var query = {
                    datas: schedule,
                    email: email,
                    maintenances: maintenances
				};
                this.$rc.post("/api/affectation/maintenances", query, (datas)=>resolve(datas));
			});
        },
        AffectationsMixin_updateSchedule: function(schedule, callback) {
            var rc = this.$rc;
            rc.post("/api/update/affectation", schedule, callback || function(response) {});
        },
        AffectationsMixin_fetchProgrammationContratIntervention: function(contratId) {
            var rc = this.$rc;
            var query = {
                userId: this.$app.appID,
                metadatas: {
                    "directives":[],
                    "filters":[],
                    "columns":[]
                }
            };
            return new Promise((resolve, reject)=>{
                rc.get(`/api/affectation/contrat/${contratId}/programmation/interventions`, query, (datas, meta) => {
                    resolve(datas);
                });
            });
        },
        AffectationsMixin_createProgrammationContratIntervention: function(programmation, contratId) {
            return new Promise((resolve, reject)=>{
                this.$rc.post(`/api/affectation/contrat/${contratId}/programmation/interventions`, programmation, (response)=>{
                    resolve(response);
                });
            });
        },
        AffectationMixin_updateProgrammationContratIntervention: function(programmation, contratId) {
            return new Promise((resolve, reject)=>{
                this.$rc.put(`/api/affectation/contrat/${contratId}/programmation/interventions`, programmation, (response)=>{
                    resolve(response);
                });
            });
        },
        toCalendar: function(item, type, color){
            return {
                id: item.uid,
                type: type,
                name: type=="user"?item.nom+" "+item.prenom: item.name,
                checked: true,
                color: "#fff",
                bgColor: color,
                dragBgColor: color,
                borderColor: color,
                datas: item
            };
        },
        /**
        * @params affectables Object {users:[...], tiers: [...]}
        */
        formatCalendars: function(affectables){
            let colors = this.AffectationsMixins.calendarsColors;
            let indexcolors = 0;
            let calendars = [];
            affectables.users.forEach((user)=>{
                calendars.push( this.toCalendar(user, "user", colors[indexcolors]) );
                indexcolors++;
            });
            affectables.tiers.forEach((tier)=>{
                calendars.push( this.toCalendar(tier, "tiers", colors[indexcolors]) );
                indexcolors++;
            });
            return calendars;
        },
    }
};
