
export default {
    mounted: function(){

    },
    computed:{

    },
    methods:{
        /**
        * -----------------------------
        *   Statistiques Maintenance
        * -----------------------------
        */

        /**
        * Statistiques Maintenance état
        * état des maintenances ouvertures & fermetures sur une année ou sur une semaine
        *
        * @param string year
        * @param string week
        * @param object metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        StatistiquesMixins_fetchStatistiquesMaintenanceEtat: function(year, week=null, metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas
				};
                rc.get(week?"/api/statistiques/maintenance/etat/"+year+"/"+week:"/api/statistiques/maintenance/etat/"+year, query, (datas) => resolve(datas));
			});
		},
        /**
        * Statistiques Maintenance répartition
        * maintenances réparties par lieux & équipements & composants & services
        *
        * @param object metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        StatistiquesMixins_fetchStatistiquesMaintenanceRepartition: function(metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas
				};
                rc.get("/api/statistiques/maintenance/repartition", query, (datas) => resolve(datas));
			});
		},
        /**
        * -----------------------------
        *   Statistiques Verification
        * -----------------------------
        */
        /**
        * Statistiques Verification état
        * état des vérifications conformes & non conformes sur une année ou sur une semaine
        *
        * @param string year
        * @param string week
        * @param object metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        StatistiquesMixins_fetchStatistiquesVerificationEtat: function(year, week=null, metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas
				};
                rc.get(week?"/api/statistiques/verification/etat/"+year+"/"+week:"/api/statistiques/verification/etat/"+year, query, (datas) => resolve(datas));
			});
		},
        /**
        * Statistiques Verification répartition
        * vérifications réparties par lieux & équipements
        *
        * @param object metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        StatistiquesMixins_fetchStatistiquesVerificationRepartition: function(metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas
				};
                rc.get("/api/statistiques/verification/repartition", query, (datas) => resolve(datas));
			});
		},
        /**
        * Statistiques Verification temps passé par technicien
        * temps passé pour chaque technicien sur une année ou sur une semaine
        *
        * @param object metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        StatistiquesMixins_fetchStatistiquesVerificationTemps: function(year, week=null, metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas
				};
                rc.get(week?"/api/statistiques/verification/temps/"+year+"/"+week:"/api/statistiques/verification/temps/"+year, query, (datas) => resolve(datas));
			});
		}
    }
}
