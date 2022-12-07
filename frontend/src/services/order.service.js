import { storageService } from './async-storage.service'




export const orderService = {
    query,
    save
}
import { authService } from './auth.service'

window.orderService = orderService
const STORAGE_KEY = 'Orders'

async function query() {
    try{
        const orders = await storageService.query(STORAGE_KEY)
        const loggedInUser = authService.getLoggedinUser()
        const Orders = orders.filter(order =>{
           return loggedInUser._id === order.hostId
        })
        return Orders
    }
    catch(err) {
        throw err
    }
    // return httpService.get(`user`)
}

async function save(order) {
    var savedStay
    if (order._id) {
        savedStay = await storageService.put(STORAGE_KEY, order)
        // savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        savedStay = await storageService.post(STORAGE_KEY, order)
        // savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}



