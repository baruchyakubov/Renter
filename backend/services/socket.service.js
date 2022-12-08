// const asyncLocalStorage = require('./als.service')
const logger = require('./logger.service')
const toyService = require('../api/stay/stay.service')
var gIo = null

function setupSocketAPI(http, session) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })

  gIo.on('connection', (socket) => {
    socket.userId = socket.id

    socket.on('disconnect', (socket) => {
      console.log('Someone disconnected')
    })

    socket.on('chat topic', (topic) => {
      if (socket.myTopic === topic) return
      if (socket.myTopic) {
        socket.leave(socket.myTopic)
      }
      socket.join(topic)
      socket.myTopic = topic
    })
    socket.on('send-order', (hostId) => {
      if (socket.userId !== hostId) return
    })

    socket.on('chat newMsg', (msg) => {
      console.log('Emitting Chat msg', msg)
      gIo.to(socket.myTopic).emit('chat addMsg', msg)
      toyService.addMsg(socket.myTopic, msg) //save history bonus
    })

    socket.on('user-typing', (user) => {
      console.log(`${user} is typing...`)
      broadcast({
        type: 'user-typing',
        data: user,
        room: socket.myTopic,
        userId: socket.userId,
      })
    })

    socket.on('user-watch', (userId) => {
      socket.join('watching:' + userId)
    })

    socket.on('set-user-socket', (userId) => {
      logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
      socket.userId = userId
      console.log(socket.userId);
    })

    //for fun delete toy in other browsers
    socket.on('delete toy', (toyId) => {
      broadcast({ type: 'delete-toy', data: toyId, userId: socket.userId })
    })
    socket.on('unset-user-socket', () => {
      logger.debug('user logged out succesfully')
      delete socket.userId
    })
  })
}

// socket.emit
// socket.broadcast
// gIo.emit
// emits to all sockets:
// gIo.emit('chat addMsg', msg)

function emitTo({ type, data, label }) {
  if (label) gIo.to('watching:' + label).emit(type, data)
  else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
  logger.debug('Emiting to user socket: ' + userId)
  const socket = await _getUserSocket(userId)
  if (socket) socket.emit(type, data)
  else {
    console.log('User socket not found')
    _printSockets()
  }
}

// Send to all sockets BUT not the current socket
async function broadcast({ type, data, room = null, userId }) {
  const excludedSocket = await _getUserSocket(userId)
  if (room && excludedSocket) {
    logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
    excludedSocket.broadcast.to(room).emit(type, data)
  } else if (excludedSocket) {
    logger.info(`Broadcast to all excluding user: ${userId}`)
    excludedSocket.broadcast.emit(type, data)
  } else if (room) {
    logger.info(`Emit to room: ${room}`)
    gIo.to(room).emit(type, data)
  } else {
    logger.info(`Emit to all`)
    gIo.emit(type, data)
  }
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s) => s.userId == userId)
  return socket
}
async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets()
  return sockets
}

async function _printSockets() {
  const sockets = await _getAllSockets()
  console.log(`Sockets: (count: ${sockets.length}):`)
  sockets.forEach(_printSocket)
}

function _printSocket(socket) {
  console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
  setupSocketAPI,
  emitTo,
  emitToUser,
  broadcast,
}
