const stayService = require('./stay.service.js')
const authService = require('../auth/auth.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

async function getStays(req, res) {
  try {

    const queryParams = req.query
    console.log(queryParams);
    const stays = await stayService.query(queryParams)
    res.json(stays)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getStayById(req, res) {
  try {
    const stayId = req.params.id
    const stay = await stayService.getById(stayId)
    res.json(stay)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addStay(req, res) {
  const stay = req.body
  try {
    const addedstay = await stayService.add(stay)
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    broadcast({ type: 'something-changed', userId: loggedinUser._id })
    res.json(addedstay)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateStay(req, res) {
  try {
    const stay = req.body
    const updatedStay = await stayService.update(stay)
    res.json(updatedstay)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeStay(req, res) {
  try {
    const stayId = req.params.id
    const removedId = await stayService.remove(stayId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const stayId = req.params.id
  const review = req.body
  try {
    const addedReview = await stayService.addReview(review, stayId)
    res.send(addedReview)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay,
  addReview,
}
