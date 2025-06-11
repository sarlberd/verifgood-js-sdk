export default {
    methods:{
        /**
        * Get calendars events.
        *
        * @param object metadatas
        */
        CalendarMixins_get: function(start, end, sites, idTiers, affectes, metadatas){
            console.log("CALENDAR MIXINS GET", sites, idTiers, affectes);
            return new Promise((resolve, reject)=>{
                var query = {
					userId: this.$app.appID,
                    start: start,
                    end: end,
                    //metadatas: metadatas.get()
				};
                if(sites && sites!="") query.sites = sites;
                if(idTiers && idTiers!="") query.idTiers = idTiers;
                if(affectes && affectes!="" && affectes.length!=0) query.affectes = affectes;
                this.$rc.get("/api/calendars/events", query, (datas, meta) => {
                    console.log("calendars/events", datas);
                    resolve({"events":this.CalendarMixins_formatEvents(datas), "metadatas":meta});
                });
			});
        },
        CalendarMixins_formatEvents: function(events){
            let formatedEvents = [];
            let typesEvents = Object.keys(events);
            console.log("TYPES EVENTS", typesEvents);
            typesEvents.forEach((type)=>{
                console.log("TYPE EVENT", type);
                events[type].forEach((event)=>{
                    formatedEvents.push({
                        calendarId: event.type,
                        category: "time",
                        start: event.start,
                        end: event.end,
                        id: event.data.id,
                        isAllDay: false,
                        raw: event.data
                    });
                });
            });
            console.log("FORMATED EVENTS", formatedEvents);
            return formatedEvents;
        },
    }
};
