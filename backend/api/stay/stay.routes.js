const express = require('express')
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay,
  addReview,
  getSearchedStays
} = require('./stay.controller')
const router = express.Router()

router.get('/', getStays)
router.get('/searchedStays', getSearchedStays)
router.get('/:id', getStayById)
router.post('/', addStay) //,

router.put('/:id', requireAuth, updateStay)

router.delete('/:id', removeStay) 
router.post('/:id/review', addReview)

module.exports = router
