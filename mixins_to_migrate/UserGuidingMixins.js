
export default {
    data: function() {
        return {

        };
    },
    methods: {
        UserGuidingMixins_identify: function(user){
            window.userGuiding.identify('1Ax69i57j0j69i60l4', {
                email: user.email,
                name: user.fullname,
                idUser: user.idUser,
                role: user.role,
                organisation: user.organisation,
                appID: user.appID,
                accountCreatedAt: user.account_created_at?moment(user.account_created_at).format("YYYY-MM-DD HH:mm"):null
            });
        }
    }
};
