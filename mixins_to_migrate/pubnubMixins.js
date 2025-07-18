import PubNub from 'pubnub';
import Exceptions from 'src/Exceptions/Exceptions.js';
import PubnubFilters from 'src/services/PubnubFilters.js'
import Publisher from 'src/services/Publisher.js'
export default {
    data: function() {
        return {
            pubnub : null,
            publisher: new Publisher("notifications","pubnubMixins")
        };
    },
    methods: {
        listenPubnubNotification : function( data ) {
            //var audio = new Audio('/web/sounds/bip.mp3');
            ////console.log("notification triggered : " + JSON.stringify(data));
            var m = data.message;
            var meta = data.userMetadata;
            m.isRead = false;
            this.$store.dispatch({
              type: 'addMessage',
              message: m,
            });
            //this.$store.dispatch("MaintenancesStore/addMaintenances", m);
            //audio.play();
            switch (meta.action) {
                case "createMaintenance":
                    this.$store.dispatch("MaintenancesStore/addMaintenances", m);
                    break;
                case "deleteMaintenance":
                    this.$store.dispatch("MaintenancesStore/deleteMaintenance", m.id);
                    break;
                case "clotureMaintenance":
                    this.$store.dispatch("MaintenancesStore/updateMaintenance", m);
                    break;
                case "relanceMaintenance":
                    this.$store.dispatch("MaintenancesStore/updateMaintenance", m);
                    break;
                case "clotureMaintenances":

                    break;
                case "reopenMaintenance":
                    break;
                case "updateStatusMaintenance":

                    break;
                case "updateStatusMaintenances":

                    break;
                case "createInterventions":

                    break;
                default:

            }
        },
        pubnubMixins_connect: function(user){
            let appID = user.appID;
            let idUser = user.idUser;
            let fullname = user.fullname;
            var pubnub = new PubNub({
                subscribeKey: this.$app.__subkey,
                uuid:`${idUser}-${fullname}`,
                ssl: true,
                keepAlive: true,
                restore:true
            });
            pubnub.addListener({
                status: (statusEvent)=>{
                    if (statusEvent.category === "PNConnectedCategory") {
                        // //console.log("Listening notifications");
                    }

                    switch (statusEvent.category) {
                        case "PNNetworkDownCategory":
                            //console.log("not able to reach data stream network");
                            break;
                        case "PNTimeoutCategory":
                            //console.log("Failure to establish a connection to PubNub due to a timeout");
                            break;
                        default:

                    }
                },
                message: (m)=>{
                    var currentTimetokenMessage = m.timetoken;
                    localStorage.setItem( 'lastPWNotification', currentTimetokenMessage );
                    var lastMessageToken = localStorage.getItem( 'lastPWNotification' );
                    // handle message
                    var channelName = m.channel; // The channel for which the message belongs
                    var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
                    var pubTT = m.timetoken; // Publish timetoken
                    var msg = m.message; // The Payload
                    currentTimetokenMessage == lastMessageToken ? this.pushCallback(m) : null ;

                        /*var audio = new Audio('/static/assets/sounds/bip.mp3');
                        audio.play();*/
                        //NOTIFICATION CHROME
                        this.listenPubnubNotification(m); //this.listenPubnubNotification([m]);
                        //// //console.log(m);
                        // dispatch on BroadcastChannel if windows or Android
                        if(navigator.platform.includes("Win")){
                            this.publisher.publish(m).then((datas)=>{
                                // do whatever you want
                            });
                        }else{
                            var event = new CustomEvent('pubnubNotify',{"detail":m});
                            //distribuer l'événement.
                            document.dispatchEvent(event);
                        }


                },
                presence: (p)=>{
                    //console.log("presence",p);
                    // handle presence
                    var action = p.action; // Can be join, leave, state-change or timeout
                    var channelName = p.channel; // The channel for which the message belongs
                    var occupancy = p.occupancy; // No. of users connected with the channel
                    var state = p.state; // User State
                    var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
                    var publishTime = p.timestamp; // Publish timetoken
                    var timetoken = p.timetoken;  // Current timetoken
                    var uuid = p.uuid; // UUIDs of users who are connected with the channel
                },
            });
            pubnub.subscribe({
                 channels: [
                     'ch-'+appID+'-maintenance', // old chan
                     'ch-'+appID+'-verification', // old chan
                     'ch-'+appID+'-interventions', // old chan
                     appID,
                     idUser
                 ]
             });
             let sites = this.$app.restrictionsite;
             let isInMyPerimeter = sites && sites !="" ? this.getMyPerimeterSite():"";
             let isCreateMaintenance = sites && sites != ""? "": " || action == 'createMaintenance'";
             let isDeleteMaintenance = "action == 'deleteMaintenance'";
             let isClotureMaintenances = "action == 'clotureMaintenance'";
             let isRelanceMaintenances = "action == 'relanceMaintenance'";
             let isReopenMaintenance = "action == 'reopenMaintenance'";
             let isUpdateStatusMaintenance = "action == 'updateStatusMaintenance'";
             let isUpdateStatusMaintenances = "action == 'updateStatusMaintenances'";
             let isMaintenanceAssignToMe = `action == 'createAffectation'`; // ici j'ai users='(1,2,3)' envoyé par le serveur
             let actionsWithoutNotifications = `${isDeleteMaintenance} || ${isClotureMaintenances} || ${isRelanceMaintenances} ||${isReopenMaintenance} ||${isUpdateStatusMaintenance} || ${isUpdateStatusMaintenances} ${isCreateMaintenance}`;
             pubnub.setFilterExpression(`${isInMyPerimeter} ${isMaintenanceAssignToMe} || ( ${actionsWithoutNotifications} )`);
             /*pubnub.hereNow(
                {
                    channels: [appID],
                    includeUUIDs: true,
                    includeState: true
                },
                function (status, response) {
                    ////console.log("here now ",status,response)
                }
            );*/
            this.pubnub = pubnub;
        },
        /**
        * Get current filters.
        *
        * @return string
        */
        pubnubMixins_getCurrentFilter: function(){
            return this.pubnub.getFilterExpression();
        },
        /**
        * Unsubscribe all channels.
        */
        pubnubMixins_unsubscribeAll: function(){
            this.pubnub.unsubscribeAll();
        },
        pushCallback: function(m) {
            try{
                /*var audio = new Audio('/static/assets/sounds/bip.mp3');
                audio.play();*/
                //NOTIFICATION CHROME
                this.listenPubnubNotification(m); //this.listenPubnubNotification([m]);
                //// //console.log(m);
            }catch(err){
                new Exceptions('mixins:pubnubMixins:pushCallback',err);
            }

        },
        /**
        * Get restrictionSite in session storage and return the filter for
        * subscribing pubnub channel.
        * @exemple:
        * org1/siteA|org1/siteB = (restrictionSite CONTAINS 'siteA') || (restrictionSite CONTAINS 'siteB')
        * @return string
        */
        getMyPerimeterSite: function(){
            let pFilters = new PubnubFilters();
            let isInMyPerimeter = "";
            let sites = this.$app.restrictionsite.split("|");
            if(!sites.length)return "";
            sites = sites.map((site)=>{
               let siteName = site.split("/").pop();
               let checkSite = pFilters.contains("restrictionSite",siteName);
               return `( ${checkSite} )`;
            });
            isInMyPerimeter = "("+sites.join(" || ")+") ||";
            //isInMyPerimeter += ` || (${pFilters.equals("restrictionSite","")})`;
            return isInMyPerimeter;
        }
    }
};
