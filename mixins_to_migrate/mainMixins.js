import Exceptions from 'src/Exceptions/Exceptions.js';

export default {
    created: function(){
        /*if(!this.isSessionStillAuth()){
            this.removeSession();
            if(window.location.pathname == "/signup") return;
            this.redirectToLogin();
        }   */
    },
    methods:{
        /**
         * @return boolean
         */
        isSessionStillAuth:function(){
            let expiredAt = localStorage.getItem("_expired_at");
            let now = new Date();
            let isAuth = false;
            if(expiredAt){
                let endSessionDate = new Date(expiredAt);
                if(now < endSessionDate){
                    isAuth = true;
                }
            }
            return isAuth;
        },
        /**
         * 
         */
        removeSession:function(){
            localStorage.removeItem("_expired_at");
            sessionStorage.clear();
        },
        
        redirectToLogin:function(){
            if(this.$route.name != "_login"){
                this.$router.push({name:"_login"});
            }
        }
    }
}
