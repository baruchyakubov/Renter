import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_SEND_ORDER } from './socket.service'




export const orderService = {
    query,
    save
}
import { authService } from './auth.service'

window.orderService = orderService
const URL_KEY = 'Order'

async function query() {
    try {
        return httpService.get(URL_KEY)
        // const orders = await storageService.query(URL_KEY)
        // const loggedInUser = authService.getLoggedinUser()
        // const Orders = orders.filter(order =>{
        //    return loggedInUser._id === order.hostId
        // })
        // return Orders
    }
    catch (err) {
        throw err
    }
    // return httpService.get(`user`)
}

async function save(order) {
    try {
        var savedOrder
        if (order._id) {
            // savedOrder = await storageService.put(URL_KEY, order)
            savedOrder = await httpService.put(`order/${order._id}`, order)

        } else {
            order.status = 'pending'
            order.createdAt = Date.now()
            // savedStay = await storageService.post(URL_KEY, order)
            savedOrder = await httpService.post(URL_KEY, order)
        }
        return savedOrder
    } catch (err) {
        throw err
    }
}





