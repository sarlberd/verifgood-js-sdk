import { PDFDocument } from 'pdf-lib';

export default {
    data: function(){
        return {

        };
    },
    methods:{
        VerificationMixins_createVerifications:function(verifications){
            return new Promise((resolve, reject)=>{
                this.$rc.post('/api/verifications', {datas: verifications}, (datas)=>{
                    this.$store.dispatch('VerificationsStore/addItems', datas);
                    resolve(datas);
                });
            });
        },
        VerificationMixins_startVerification:function(equipementId, tacheId, $uniquementMesTachesAffectes = false){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {};
                let ressource = $uniquementMesTachesAffectes ? "mes-taches" : "taches";
                let endpoint = `/api/verifier/equipement/${equipementId}/${ressource}`
                if(tacheId){
                    endpoint += `/${tacheId}`;
                }
                rc.get(endpoint, query, (datas) => resolve(datas));
			});
        },
        /**
        * GET verifications
        *
        * @param Metadatas metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        VerificationMixins_getVerifications: function(metadatas){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite || null
				};
                this.$rc.get('/api/verifications', query, (datas, meta) => {
                    this.$store.dispatch("VerificationsStore/set", datas);
                    this.$store.dispatch("VerificationsStore/setCounters", meta.counters);
                    resolve(datas);
                });
			});
        },
        /**
        * GET verifications à supprimer par la suite
        *
        * @param Object metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        VerificationMixins_getVerificationsNotUseMetadatas: function(metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    metadatas: metadatas,
                    sites: this.$app.restrictionsite || null
				};
                this.$rc.get('/api/verifications', query, (datas, meta) => {
                    this.$store.dispatch("VerificationsStore/set", datas);
                    this.$store.dispatch("VerificationsStore/setCounters", meta.counters);
                    resolve(datas);
                });
			});
        },
        VerificationMixins_getVerificationsReponsesNonConformes: function(metadatas){
            return new Promise((resolve, reject)=>{
				var query = {
					userId: this.$app.appID,
                    isNonConforme: true,
                    metadatas: metadatas.get()
				};
                if(this.$app.restrictionsite) query.sites = this.$app.restrictionsite;
                this.$rc.get('/api/verifications/reponses', query, (datas, meta) => {
                    this.$store.dispatch("ReponsesStore/set", datas);
                    this.$store.dispatch("ReponsesStore/setCounters", meta.counters);
                    resolve(datas);
                });
			});
        },
        VerificationMixins_getVerificationsReponsesById: function(idVerification){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
					userId: this.$app.appID
				};
                rc.get('/api/verification/'+idVerification+'/reponses', query, (datas) => resolve(datas));
			});
        },
        /**
        * Get progression.
        *
        * @param string site
        * @param Metadatas metadatas
        * @return Promise
        */
        VerificationMixins_getProgression: function(site, metadatas){
            return new Promise((resolve, reject)=>{
				var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get(),
                    sites: site || this.$app.restrictionsite
                };
                this.$rc.get('/api/verifications/taches/overview', query, (datas, meta) => {
                    this.$store.dispatch("ProgressionsStore/set", datas);
                    this.$store.dispatch("ProgressionsStore/setCategories", meta.categories);
                    resolve({"datas":datas, "metadatas":meta});
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
        VerificationMixins_getVerificationsEquipementsTaches: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    metadatas: metadatas.get(),
                    sites: this.$app.restrictionsite,
                    typeTache: metadatas.getFilterValue("type_tache")
                };
                rc.get('/api/verifications/equipements/taches/state', query, (datas) => resolve(datas));
			});
        },

        /**
        * Get tache progression on site.
        *
        * @param Object tache
        * @param string site
        * @return Promise
        */
        VerificationMixins_getTacheState: function(tache, site=null, metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    userId: this.$app.appID,
                    metadatas: metadatas.get(),
                    sites: site || this.$app.restrictionsite
                };
                rc.get('/api/verifications/tache/'+tache.id+'/unchecked', query, (datas) =>{
                    this.$store.dispatch("ProgressionsStore/setEquipementsRestants", datas);
                    resolve(datas);
                });
			});
        },
        /**
        * GET verification calendar events
        *
        * @param Object metadatas default {"directives":[],"filters":[]}
        * @return Promise
        */
        VerificationMixins_getCalendarEvents: function(metadatas={"directives":[],"filters":[]}){
            return new Promise((resolve, reject)=>{
                this.VerificationMixins_getVerificationsNotUseMetadatas(metadatas).then((verifications)=>{
                    let calendarEvents = this.VerificationMixins_formatToCalendarEvents(verifications);
                    resolve(calendarEvents);
                });
			});
        },
        /**
        * format verification to calendar events
        *
        * @param Array verifications
        * @return Array calendarEvents
        */
        VerificationMixins_formatToCalendarEvents: function(verifications){
            let calendarEvents = [];
            verifications.forEach((verification, index)=>{
                calendarEvents.push({   // add evenement verification-interne
                    id: index,
                    calendarId: "verification-interne",
                    start: verification.dateVerif,
                    end: verification.dateVerif,
                    isAllDay: false,
                    category: "time",
                    raw: verification
                });
            });
            return calendarEvents;
        },
        /**
                * Open a new tab to download file csv or excel.
                * @todo à refactorer duplique aussi avec maintenance mixins
                * @param Metadatas metadatas
                * @param string filetype csv|excel
                * @return Promise
                */
        VerificationMixins_getPdfFile: function(idVerification, filename=null,fileExtension = "pdf"){
            return new Promise((resolve,reject)=>{
                var rc = this.$rc;
                var query = {};
                rc.setOptions({
                    'responseType': 'blob',
                    'Content-Type':'application/pdf'
                });

                rc.get(`/api/verification/export/${idVerification}/S`, query, function(response,remoteMetadatas){
                    var reader = new FileReader();
                    reader.readAsDataURL(response); 
                    reader.onloadend = function() {
                      var pdf64 = reader.result;                
                      PDFDocument.load(pdf64).then((datas)=>{
                        let logo = window.sessionStorage.getItem('account_logo');
                        let pdf = datas;
                        let page = pdf.getPage(0);
                        const pageHeight = page.getHeight();
                        // res = UintArray8
                        let displayPdf = function(res){
                            let blob = new Blob([res],{type:"application/pdf"});
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.target = "_blank";
                            link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            resolve(pdf);
                        }
                        let addLogo = function(pdf, logo){
                            if(logo.indexOf("jpeg") != -1 ){
                                pdf.embedJpg(logo).then((logo)=>{
                                    let pngDims = logo.scale(1);
                                    
                                    let maxHeight = 70;
                                    let maxWidth = 250;
                                    let ratio = Math.min(maxWidth / pngDims.width, maxHeight / pngDims.height);
                                    page.drawImage(logo, {
                                        x: 10,
                                        y: (pageHeight - 10 )-pngDims.height*ratio,
                                        width: pngDims.width*ratio,
                                        height: pngDims.height*ratio
                                    });
                                    pdf.save().then(displayPdf);
        
                                });
                            }else{
                                pdf.embedPng(logo).then((logo)=>{
                                    let pngDims = logo.scale(1);
                                    
                                    let maxHeight = 70;
                                    let maxWidth = 250;
                                    let ratio = Math.min(maxWidth / pngDims.width, maxHeight / pngDims.height);
                                    page.drawImage(logo, {
                                        x: 10,
                                        y: pageHeight-pngDims.height*ratio,
                                        width: pngDims.width*ratio,
                                        height: pngDims.height*ratio
                                    });
                                    pdf.save().then(displayPdf);
        
                                });
                            }

                        }
                        if(logo){
                            addLogo(pdf, logo);
                        }else{
                            pdf.save().then(displayPdf);
                        }
                    });

                    }
                    resolve(response);
                });
            })
        },
        VerificationMixins_exportHistoriqueTacheRecurrentes(metadatas, fileExtension = "xlsx", site = null){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    metadatas: metadatas.get(),
                    sites: site || this.$app.restrictionsite
                };
                let fileType = fileExtension != "csv" ? "excel":"csv";
                let contentType = fileExtension != "csv" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"text/csv";
                let responseType = fileExtension != "csv" ? "blob":"text";
                rc.setOptions({
                    'responseType': responseType,
                    'Content-Type': contentType
                });
                let filename = "historique_taches_recurrentes";
                rc.get('/api/verifications/export/historique-taches-recurrente/'+fileType, query, (response) => {
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
                    link.setAttribute('download', filename+'_'+moment().format("DD-MM-YYYY")+'.'+fileExtension); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    resolve();
                
                });
			});
        }

    },
    computed:{

    }
};
