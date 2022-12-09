// import { stayService } from '../services/stay.service.local'
import { stayService } from '../services/stay.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
export function getActionRemoveStay(stayId) {
    return {
        type: 'removeStay',
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: 'addStay',
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: 'updateStay',
        stay
    }
}

export function getActionAddStayMsg(stayId) {
    return {
        type: 'addStayMsg',
        stayId,
        txt: 'Stam txt',
    }
}

export const stayStore = {
    state: {
        stays: [],
        currStay: null,
        filterBy:{
            label: '',
            country:'',
            guestsCount:0,
            page:1
        }
    },
    getters: {
        stays({ stays }) {
            return stays
        },
        getCurrStay({ currStay }) {
            return currStay
        }
    },
    mutations: {
        setCurrStay(state, { stay }) {
            state.currStay = stay
        },
        setStays(state, { stays }) {
            state.stays = stays
        },
        addStay(state, { stay }) {
            state.stays.push(stay)
        },
        updateStay(state, { stay }) {
            const idx = state.stays.findIndex(c => c._id === stay._id)
            state.stays.splice(idx, 1, stay)
        },
        removeStay(state, { stayId }) {
            state.stays = state.stays.filter(stay => stay._id !== stayId)
        },
        addStayMsg(state, { stayId, msg }) {
            const stay = state.stays.find(stay => stay._id === stayId)
            if (!stay.msgs) stay.msgs = []
            stay.msgs.push(msg)
        },
        setFilter(state, { filter }) {
            state.filterBy = filter
        }
    },
    actions: {
        async setCurrStay(context, { stayId }) {
            try {
                const currStay = await stayService.getById(stayId)
                context.commit({ type: 'setCurrStay', stay: currStay })
                return currStay
            }
            catch(err) {
                console.log('Cannot remove stay', err)
                throw err
            }
        },
        async addStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionAddStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in addStay', err)
                throw err
            }
        },
        async updateStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionUpdateStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in updateStay', err)
                throw err
            }
        },
        async loadStays({ state, commit }) {
            try {
                const stays = await stayService.query(state.filterBy)
                commit({ type: 'setStays', stays })
            } catch (err) {
                console.log('stayStore: Error in loadStays', err)
                throw err
            }
        },
        setFilterBy({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filter: filterBy })
            dispatch({ type: 'loadStays' })
        },
        async removeStay(context, { stayId }) {
            try {
                await stayService.remove(stayId)
                context.commit(getActionRemoveStay(stayId))
            } catch (err) {
                console.log('stayStore: Error in removeStay', err)
                throw err
            }
        },
        async addStayMsg(context, { stayId, txt }) {
            try {
                const msg = await stayService.addStayMsg(stayId, txt)
                context.commit({ type: 'addStayMsg', stayId, msg })
            } catch (err) {
                console.log('stayStore: Error in addStayMsg', err)
                throw err
            }
        },

    }
}