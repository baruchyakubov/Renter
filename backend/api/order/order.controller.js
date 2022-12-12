const authService = require('../auth/auth.service.js')
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service.js')
const orderService = require('./order.service.js')

async function getOrders(req, res) {
  try {
    const queryParams = req.query
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    const orders = (!loggedinUser.isAdmin || queryParams['0'] === 'orders-view') ? await orderService.queryUserOrders(loggedinUser._id) : await orderService.query(loggedinUser._id)
    res.json(orders)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addOrder(req, res) {
  const order = req.body
  try {
    const addedOrder = await orderService.add(order)
    socketService.emitToUser({ type: 'send-order', data: addedOrder, userId: addedOrder.hostId })
    res.json(addedOrder)
  } catch (err) {
    res.status(500).send(err)
  }
}


async function updateOrder(req, res) {
  try {
    const order = req.body
    const updatedOrder = await orderService.update(order)
    socketService.emitToUser({ type: 'set-order-status', data: order, userId: order.buyer._id })
    res.json(updatedOrder)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  addOrder,
  updateOrder,
  getOrders
}