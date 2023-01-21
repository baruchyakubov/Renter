import { httpService } from './http.service'

export const orderService = {
    query,
    save
}

const URL_KEY = 'Order'

async function query(from) {
    try {
        return httpService.get(URL_KEY , from)
    }
    catch (err) {
        throw err
    }
}

async function save(order) {
    try {
        var savedOrder
        if (order._id) {
            savedOrder = await httpService.put(`order/${order._id}`, order)

        } else {
            order.status = 'pending'
            order.createdAt = Date.now()
            savedOrder = await httpService.post(URL_KEY, order)
        }
        return savedOrder
    } catch (err) {
        throw err
    }
}





