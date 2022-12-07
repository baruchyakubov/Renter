const authService = require('../auth/auth.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')
const orderService = require('./order.service.js')

async function getOrders(req, res) {
  try {
    console.log('gett');
    const loggedInUser = authService.getLoginToken()
    const orders = await orderService.query(loggedInUser._id)
    res.json(orders)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addOrder(req, res) {
  const order = req.body
  console.log(order);
  try {
    const addedOrder = await orderService.add(order)
    // const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // broadcast({ type: 'something-changed', userId: loggedinUser._id })
    res.json(addedOrder)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateOrder(req, res) {
//   try {
//     const stay = req.body
//     const updatedStay = await stayService.update(stay)
//     res.json(updatedstay)
//   } catch (err) {
//     res.status(500).send(err)
//   }
}

// db.theColl.find( { _id: ObjectId("4ecbe7f9e8c1c9092c000027") } )





module.exports = {
    addOrder,
    updateOrder,
    getOrders
}