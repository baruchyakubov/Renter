import { storageService } from './async-storage.service'
import { httpService } from './http.service'




export const orderService = {
    query,
    save
}
import { authService } from './auth.service'

window.orderService = orderService
const STORAGE_KEY = '/Order'

async function query() {
    try{
       return httpService.get(STORAGE_KEY)
        // const orders = await storageService.query(STORAGE_KEY)
        // const loggedInUser = authService.getLoggedinUser()
        // const Orders = orders.filter(order =>{
        //    return loggedInUser._id === order.hostId
        // })
        // return Orders
    }
    catch(err) {
        throw err
    }
    // return httpService.get(`user`)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        // savedOrder = await storageService.put(STORAGE_KEY, order)
        savedOrder = await httpService.put(`order/${order._id}`, order)

    } else {
        order.status= 'pending'
        order.createdAt = Date.now()
        // savedStay = await storageService.post(STORAGE_KEY, order)
        savedOrder = await httpService.post(STORAGE_KEY, order)
    }
    return savedOrder
}





