import userService from "../services/user.service.js"
import authService from "../services/auth.service.js"

export const userModule = {
    state() {
        return {
            users:[],
            loggedInUser: authService.getLoggedInUser()
        }
    },
    mutations: {
       login(state , { user }){
        state.loggedInUser = user
        console.log(state.loggedInUser);
       },
       logout(state){
        state.loggedInUser = null
       }
    },
    getters: {
        users({ users }){
            return users
        },
        loggedInUser({ loggedInUser }){
            console.log(loggedInUser);
            return loggedInUser
        }
    },
    actions: {
      async login({ commit } , { credentials }){
        try{
            var user = await authService.login( credentials.username , credentials.password )
            console.log(user);
            commit({type: 'login' , user})
        }catch (err){
            console.log(err)
        }       
     },
     async signup({ commit } , { signupInfo }){
        try{
           const user = await authService.signup( signupInfo.username , signupInfo.password , signupInfo.fullname)
           commit({type: 'login' , user})
        }catch (err){
            console.log(err);
        }   
     },
     async logout({ commit }){
        try{
            await authService.logout()
            commit({type: 'logout'})
        }catch (err){
            console.log(err)
        }
     }

    }
}