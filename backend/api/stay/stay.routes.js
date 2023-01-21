const express = require('express')
const {
  requireAuth,
} = require('../../middlewares/requireAuth.middleware')
const {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay,
  getSearchedStays
} = require('./stay.controller')
const router = express.Router()

router.get('/', getStays)
router.get('/searchedStays', getSearchedStays)
router.get('/:id', getStayById)
router.post('/', addStay) //,

router.put('/:id', requireAuth, updateStay)

router.delete('/:id', removeStay) 

module.exports = router
