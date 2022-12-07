import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'
import { orderService } from '../services/order.service'
import { stayService } from '../services/stay.service.local'
import { utilService } from '../services/util.service'

export const orderStore = {
    state: {
        orders: [],
        form: null,
    },
    getters: {
        orders({ orders }) { return orders },
        getForm({ form }) {
            return form
        }
    },
    mutations: {
        removeTempForm(){
            localStorage.removeItem("tempForm")
        },
        storeForm(state, { form }) {
            state.form = form
            utilService.saveToStorage('tempForm',form)
        },
        setOrders(state, { orders }) {
            state.orders = orders
        },
        updatedOrder(state, { order }) {
            const idx = state.orders.findIndex(Order => Order._id === order._id)
            state.orders[idx] = order
        }
    },
    actions: {
        async sendForm(context, { form }) {
            try {
                const currForm = await stayService.saveForm(form)
                return currStay
            }
            catch {
                console.log('Cannot send form', err)
                throw err
            }
        },
        async loadOrders(context) {
            try {
                const orders = await orderService.query()
                context.commit({ type: 'setOrders', orders })
            } catch (err) {
                console.log('orderStore: Error in loadOrders', err)
                throw err
            }
        },
        async updateOrder({ commit }, { updatedOrder }) {
            try {
                updatedOrder = JSON.parse(updatedOrder)
                const order = await orderService.save(updatedOrder)
                commit({ type: 'updatedOrder', order })
            } catch (err) {
                console.log('cannot update order status', err)
                throw err
            }
        }
    },
}