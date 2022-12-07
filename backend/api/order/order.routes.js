const express = require('express')
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const {
  getOrders,
  updateOrder,
  addOrder,
} = require('./order.controller')
const router = express.Router()



router.get('/', requireAuth, getOrders)
router.post('/', addOrder) 
router.put('/:id', requireAuth, updateOrder)

module.exports = router