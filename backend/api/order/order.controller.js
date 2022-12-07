const authService = require('../auth/auth.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')
const orderService = require('./order.service.js')

async function getOrders(req, res) {
  try {
    const loggedInUser = authService.getLoginToken()
    const orders = await orderService.query(loggedInUser._id)
    res.json(orders)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addOrder(req, res) {
  const order = req.body
  console.log(order)
  try {
    const addedOrder = await orderService.add(order)
    // const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // broadcast({ type: 'something-changed', userId: loggedinUser._id })
    res.json(addedOrder)
  } catch (err) {
    res.status(500).send(err)
  }
}


async function addReview(req, res) {
  var {loggedinUser} = req
  try {
      var review = req.body
      review.byUserId = loggedinUser._id
      review = await reviewService.add(review)
      
      // prepare the updated review for sending out
      review.byUserId = await userService.getById(review.byUserId)
      
      // Give the user credit for adding a review
      // var user = await userService.getById(review.byUserId)
      // user.score += 10

      // loggedinUser.score += 10
      // loggedinUser = await userService.update(loggedinUser)
      // review.byUser = loggedinUser

      // User info is saved also in the login-token, update it
      const loginToken = authService.getLoginToken(loggedinUser)
      res.cookie('loginToken', loginToken)

      // delete review.aboutUserId
      delete review.byUserId

      // socketService.broadcast({type: 'review-added', data: review, userId: loggedinUser._id})         
      // socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutUser._id})
      
      // const fullUser = await userService.getById(loggedinUser._id)
      // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

      res.send(review)

  } catch (err) {
      logger.error('Failed to add review', err)
      res.status(500).send({ err: 'Failed to add review' })
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