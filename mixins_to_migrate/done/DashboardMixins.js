export default {
    methods:{
        /**
        * GET dashboard curatif totaux.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifTotaux: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/totaux", query, (datas, meta) => {
                    console.log("AFTER GET TOTAUX", datas);
                    this.$store.dispatch("DashboardStore/setCuratifTotaux", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif urgences.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifUrgentes: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/urgentes", query, (datas, meta) => {
                    console.log("AFTER GET URGENCES", datas);
                    this.$store.dispatch("DashboardStore/setCuratifUrgentes", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition age.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionAge: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-age", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionAge", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition composants.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionComposants: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-composants", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionComposants", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition par demandeur.
        * nombre de fm ouverte par demandeur
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionDemandeur: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-demandeur", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionDemandeur", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition user affecte.
        * pour chaque user: nombre de fms affectées au user dans la période + nombre de fm affectée au user cloturées dans la période
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionUserAffecte: function(metadatas, start, end){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    start: start,
                    end: end,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-user-affecte", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionUserAffecte", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition tiers affecte.
        * pour chaque user: nombre de fms affectées au tier dans la période + nombre de fm affectées au tiers cloturées dans la période
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionTiersAffecte: function(metadatas, start, end){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    start: start,
                    end: end,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-tiers-affecte", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionTiersAffecte", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition categories equipements.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionCategoriesEquipements: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-categories-equipements", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionCategoriesEquipements", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition corps d'état.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionCorpsDetat: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-corps-detat", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionCorpsDetat", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition équipements.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionEquipements: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-equipements", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionEquipements", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition équipements coûts.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionEquipementsCouts: function(metadatas, typeCout="externe"){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get(),
                    typeCout: typeCout
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-equipements-couts", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionEquipementsCouts", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition pieces.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionPieces: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-pieces", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionPieces", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard curatif repartition duree traitement moyenne.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getCuratifRepartitionDureeTraitement: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/maintenances/repartition-duree-traitement", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setCuratifRepartitionDureeTraitement", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },

        /**
        * --------------------------------
        *       DASHBOARD PREVENTIF
        * --------------------------------
        */

        /**
        * GET dashboard preventif repartition non conformites.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getPreventifRepartitionNonConformites: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/verifications/repartition-non-conformites", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setPreventifRepartitionNonConformites", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard preventif relever compteurs.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getPreventifReleverCompteur: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/verifications/repartition-relever-compteurs", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setPreventifReleverCompteurs", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard preventif prochaines interventions.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getPreventifProchainesInterventionsExternes: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/verifications/prochaines-interventions-externes", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setPreventifProchainesInterventions", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * Get progression.
        *
        * @param string site
        * @param Metadatas metadatas
        * @return Promise
        */
        DashboardMixins_getPreventifProgressionInterne: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite
                };
                rc.get('/api/verifications/taches/overview', query, (datas) => {
                    this.$store.dispatch("DashboardStore/setPreventifProgressionInterne", datas);
                    resolve(datas);
                });
			});
        },

        /**
        * --------------------------------
        *       DASHBOARD CONSOMMABLES
        * --------------------------------
        */

        /**
        * GET dashboard consommables répartition consommations maintenances.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getConsommablesRepartitionConsommationsMaintenances: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/consommables/repartition-consommations-maintenances", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setConsommablesRepartitionConsommationsMaintenances", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard consommables répartition consommations bons de sortie.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getConsommablesRepartitionConsommationsBonsDeSortie: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/consommables/repartition-consommations-bons-de-sortie", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setConsommablesRepartitionConsommationsBonsDeSortie", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
        /**
        * GET dashboard consommables répartition en stock.
        *
        * @param Object Metadatas.
        */
        DashboardMixins_getConsommablesRepartitionEnStock: function(metadatas){
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    sites: this.$app.restrictionsite,
                    metadatas: metadatas.get()
				};
                this.$rc.get("/api/dashboard/consommables/repartition-en-stock", query, (datas, meta) => {
                    this.$store.dispatch("DashboardStore/setConsommablesRepartitionEnStock", datas);
                    resolve({"datas":datas,"metadatas":meta});
                });
			});
        },
    },
    computed:{
        DashboardMixins_datePickerShortcutsCollection: function(){
            return ["today", "yesterday", "week", "last7days", "last30days", "month", "last3months", "last12months", "lastyear", "year", "intervalle"];
        },
        DashboardMixins_datePickerFuturShortcutsCollection: function(){
            return ["today", "tomorrow", "week", "next2weeks", "next30days", "month", "year", "intervalle"];
        }
    }
};
