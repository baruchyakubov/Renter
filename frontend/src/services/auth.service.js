import { httpService } from './http.service'
import { socketService } from './socket.service'

export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            socketService.login(user._id)
            return saveLocalUser(user)
        } else throw 'User does not match'

    }
    catch (err) {
        throw err
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl ,isAdmin:user.isAdmin,wishList:user.wishList}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}
