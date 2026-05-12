export default {
    methods:{
        /**
        * liste des contacts.
        *
        * @param Metadatas metadatas
        * @return {Promise}
        */
        ContactsMixins_getContacts: function(metadatas){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
				var query = {
                    metadatas: metadatas.get()
				};
                rc.get('/api/contacts', query, (contacts) => {
                    this.$store.dispatch("ContactsStore/set", contacts);
                    resolve(contacts);
                });
			});
        },
        /**
        * post les contacts.
        *
        * @param {array} contacts liste des contacts à poster
        * @return {Promise}
        */
        ContactsMixins_create: function(contacts){
            return new Promise((resolve, reject)=>{
				var rc = this.$rc;
                var query = {
					datas: contacts
				};
				rc.post('/api/contacts', query, (contacts) => {
                    this.$store.dispatch("ContactsStore/addItems", contacts);
                    resolve(contacts);
                });
            });
        },
        /**
        * modifie un contact.
        *
        * @param {Object} contact contact à modifier
        * @return {Promise}
        */
        ContactsMixins_update: function(contact){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                var query = {
                    datas: contact
                };
                rc.put("/api/contact/"+contact.id, query, (contact) => {
                    this.$store.dispatch("ContactsStore/updateItem", contact);
                    resolve(contact);
                });
            });
        },
        /**
        * supprime un contact.
        *
        * @param {Object} contact contact à supprimer
        * @return {Promise}
        */
        ContactsMixins_delete: function(contact){
            return new Promise((resolve, reject)=>{
                var rc = this.$rc;
                rc.delete("/api/contact/"+contact.id, null, (datas) => {
                    this.$store.dispatch("ContactsStore/deleteItem", contact.id);
                    resolve(datas);
                });
            });
        }
    }
};
