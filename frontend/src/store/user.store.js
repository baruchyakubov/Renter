import { userService } from '../services/user.service'
import { authService } from '../services/auth.service'

export const userStore = {
    state: {
        isLogged: false,
        loggedinUser: null,
        users: []
    },
    getters: {
        users({ users }) { return users },
        loggedinUser({ loggedinUser }) { return loggedinUser },
        isLogged(state) { return state.isLogged }
    },
    mutations: {
        setIsLogged(state, { condition }) {
            condition ? state.isLogged = true : state.isLogged = false
        },
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user
        },
        setUsers(state, { users }) {
            state.users = users
        },
        setUser(state, { user }) {
            state.loggedinUser = user
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        }
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await authService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await authService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await authService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId)
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user)
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        }
    }
}