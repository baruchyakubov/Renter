import { httpService } from "./http.service";

const BASE_URL = `auth/`
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

async function login( username , password ){
    try{
        console.log( username , password );
        const user = await httpService.post(BASE_URL + 'login' , { username , password })
        return _setLoggedinUser(user)
    } catch (err){
        throw err
    }
}

async function signup( username, password, fullname ){
    try{
        const user = await httpService.post(BASE_URL + 'signup' , { username, password, fullname })
        return _setLoggedinUser(user)
    } catch (err){
        throw err
    }
}

async function logout(){
    try{
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    } catch (err){
        throw err
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}

export default {
    login,
    signup,
    logout,
    getLoggedInUser
}