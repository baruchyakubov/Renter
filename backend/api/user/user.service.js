const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection('user')
    var users = await collection.find(criteria).toArray()
    users = users.map((user) => {
      delete user.password
      user.isHappy = true
      user.createdAt = ObjectId(user._id).getTimestamp()
      return user
    })
    return users
  } catch (err) {
    logger.error('cannot find users', err)
    throw err
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password

    return user
  } catch (err) {
    logger.error(`while finding user ${userId}`, err)
    throw err
  }
}
async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    logger.error(`while finding user ${username}`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection('user')
    await collection.deleteOne({ _id: ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user) {
  try {
    // peek only updatable fields!
    const userToSave = {
      _id: ObjectId(user._id),
      fullname: user.fullname,
      wishList: user.wishList,
      imgUrl: user.imgUrl,
      isAdmin: user.isAdmin
    }
    const collection = await dbService.getCollection('user')
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user) {
  try {
    const collection = await dbService.getCollection('user')
    await collection.insertOne(user)
    return user
  } catch (err) {
    logger.error('cannot insert user', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [
      {
        username: txtCriteria,
      },
      {
        fullname: txtCriteria,
      },
    ]
  }
  if (filterBy.minBalance) {
    criteria.balance = { $gte: filterBy.minBalance }
  }
  return criteria
}
