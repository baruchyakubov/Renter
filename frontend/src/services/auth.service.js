import { storageService } from './async-storage.service'
import { stayService } from './stay.service.local'

export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function login(userCred) {
    const users = await storageService.query('user')
    try {
        const user = users.find(user => user.username === userCred.username)
        // const user = await httpService.post('auth/login', userCred)
        if (user) {
             const User = await _checkIfAdmin(user)
            console.log(User);
            return saveLocalUser(User)
        } else throw 'User does not match'

    }
    catch (err) {
        throw err
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    // return await httpService.post('auth/logout')
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl ,isAdmin:user.isAdmin}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function _checkIfAdmin(user) {
    try {
        const stays = await stayService.query()
        console.log(stays);
        var isAdmin = stays.find(stay => {
            return stay.host._id === user._id
        })
        user.isAdmin = (isAdmin) ? true : false
        console.log(user);
        return user
    }
    catch (err) {
        throw err
    }

}