const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function login(username, password) {
  logger.debug(`auth.service - login with username: ${username}`)

  const user = await userService.getByUsername(username)
  if (!user) return Promise.reject('Invalid username or password')

  // TODO: un-comment for real login
  // const match = await bcrypt.compare(password, user.password)
  // if (!match) return Promise.reject('Invalid username or password')
  await _checkIfAdmin(user)
  delete user.password
  user._id = user._id.toString()
  return user
}

async function _checkIfAdmin(user) {
  try {
    const collection = await dbService.getCollection('stay')
    const stay = await collection.findOne({'host._id': ObjectId(user._id) })
    if (stay) user.isAdmin = true
    else user.isAdmin = false
  }
  catch (err){
    console.log(err);
  }
}

async function signup({ username, password, fullname, imgUrl, isAdmin }) {
  const saltRounds = 10

  logger.debug(
    `auth.service - signup with username: ${username}, fullname: ${fullname}`
  )
  if (!username || !password || !fullname)
    return Promise.reject('Missing required signup information')

  const userExist = await userService.getByUsername(username)
  if (userExist) return Promise.reject('Username already taken')

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({
    username,
    password: hash,
    fullname,
    imgUrl,
    isAdmin,
  })
}

function getLoginToken(user) {
  const userInfo = {
    _id: user._id,
    fullname: user.fullname,
    isAdmin: user.isAdmin,
  }
  return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json)
    return loggedinUser
  } catch (err) {
    console.log('Invalid login token')
  }
  return null
}

module.exports = {
  signup,
  login,
  getLoginToken,
  validateToken,
}
