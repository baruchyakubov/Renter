import stays from '../data/stay.json' assert {type: 'json'}
import users from '../data/user.json' assert {type: 'json'}
import { utilService } from './util.service'
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}
const gStays = stays
const gUsers = users




function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType))
    if (!entities || !entities.length) {
        if(entityType === 'stay') entities = gStays
        if(entityType === 'user') entities = gUsers
        if(entityType === 'Orders') entities = _createOrders()
    // if (!entities && entityType === 'user' || !entities.length && entityType === 'user') entities = []
    // if (!entities && entityType === 'stay' || !entities.length && entityType === 'stay') {
    //     entities = gStays
        utilService.saveToStorage(entityType, entities)
    }
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function _createOrders(){
    return [
        {
        "_id": "o1225",
        "hostId": "622f3401e36c59e6164fabab",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "15/10/2025",
        "endDate": "17/10/2025",
        "guests": {
          "adults": 2,
          "kids": 1
        },
        "stay": {
          "_id": "h102",
          "name": "House Of Uncle My",
          "price": 80.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
      },
      {
        "_id": "sdfs",
        "hostId": "622f3401e36c59e6164fabab",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "15/10/2025",
        "endDate": "17/10/2025",
        "guests": {
          "adults": 2,
          "kids": 1
        },
        "stay": {
          "_id": "h102",
          "name": "House Of Uncle My",
          "price": 80.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
      },
      {
        "_id": "sfsd",
        "hostId": "622f3401e36c59e6164fabab",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "15/10/2025",
        "endDate": "17/10/2025",
        "guests": {
          "adults": 2,
          "kids": 1
        },
        "stay": {
          "_id": "h102",
          "name": "House Of Uncle My",
          "price": 80.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
      },
      {
        "_id": "sfs",
        "hostId": "u102",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "15/10/2025",
        "endDate": "17/10/2025",
        "guests": {
          "adults": 2,
          "kids": 1
        },
        "stay": {
          "_id": "asdad",
          "name": "House Of Uncle My",
          "price": 80.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
      },
      {
        "_id": "asdas",
        "hostId": "u102",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "15/10/2025",
        "endDate": "17/10/2025",
        "guests": {
          "adults": 2,
          "kids": 1
        },
        "stay": {
          "_id": "h102",
          "name": "House Of Uncle My",
          "price": 80.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
      },
      {
        "_id": "asdasd",
        "hostId": "u102",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "15/10/2025",
        "endDate": "17/10/2025",
        "guests": {
          "adults": 2,
          "kids": 1
        },
        "stay": {
          "_id": "h102",
          "name": "House Of Uncle My",
          "price": 80.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
      },
      {
        "_id": "90asd90a",
        "hostId": "u102",
        "createdAt": 9898989,
        "buyer": {
          "_id": "u101",
          "fullname": "User 1"
        },
        "totalPrice": 160,
        "startDate": "15/10/2025",
        "endDate": "17/10/2025",
        "guests": {
          "adults": 2,
          "kids": 1
        },
        "stay": {
          "_id": "h102",
          "name": "House Of Uncle My",
          "price": 80.00
        },
        "msgs": [],
        "status": "pending" // pending, approved
      }
    ]
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = JSON.parse(JSON.stringify(newEntity))
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        if (!entities || !entities.length) {
            entities = []
            _save(entityType, entities)
        }
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}