import toyService from "../services/toy.service.js"

export const toyModule = {
    state() {
        return {
            toys: [],
            filter: {
                txt: '',
                label: '',
                inStock: false
            }
        }
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        removeToy({ toys }, { toyId }) {
            const idx = toys.findIndex(toy => toy._id === toyId)
            toys.splice(idx, 1)
        },
        updateToy({ toys }, { toy }) {
            const idx = toys.findIndex(_toy => _toy._id === toy._id)
            if (idx === -1) {
                console.log("Can't update todo " + toy._id)
                return
            }
            toys.splice(idx, 1, toy)
        },
        addToy({ toys }, { toy }) {
            console.log(toy);
            console.log('Adding!!')
            toys.push(toy)
        },
        setFilter(state, { filter }) {
            state.filter = filter
        }
    },
    getters: {
        toys({ toys }) {
            return toys
        },
    },
    actions: {
        loadToys({ state, commit }) {
            return toyService.query(state.filter)
                .then(toys => {
                    commit({ type: 'setToys', toys })
                    return toys
                })
                .catch(err => {
                    console.log('Cannot load toys', err)
                    throw err
                })
        },
        setFilterBy({ commit, state, dispatch }, { filterBy }) {
            console.log(filterBy);
            commit({ type: 'setFilter', filter: filterBy })
            dispatch({ type: 'loadToys' })
        },

        removeToy({ commit }, { toyId }) {
            return toyService.remove(toyId)
                .then(() => {
                    commit({ type: 'removeToy', toyId })
                })
                .catch(err => {
                    console.log('Cannot delete todo', err)
                    throw err
                })
        },
        getToyById(context, { toyId }) {
            console.log(toyId)
            return toyService.getById(toyId)
                        .then(toy => toy)
        },
        saveToy({ commit }, { toy }) {
            const isEdit = toy._id
            return toyService.save(toy).then(toy => {
                const type = isEdit ? 'updateToy' : 'addToy'
                commit({ type, toy })
            })
        },

    }
}