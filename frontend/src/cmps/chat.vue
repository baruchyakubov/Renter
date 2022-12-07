<template>
  <div class="container">
    <h1>About Us</h1>
    <p>We like You</p>
    <h2>Lets Chat About {{toy.name}}</h2>
 
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{msg.from}}:</span>{{msg.txt}}
      </li>
    </ul>
    <hr />
    <form @submit.prevent="sendMsg">
      <input @input="isTyping" type="text" v-model="msg.txt" placeholder="Your msg"/>
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import {socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC} from '../services/socket.service.js'
import authService from '../services/auth.service'

export default {
  props: {
    toy: Object,
  },
  data() {
    return {
      msg: {from: 'Guest', txt: ''},
      msgs: [],
      topic : '',
      counter:0
    }
  },
  created() {
    this.topic = this.toy._id
    const user = authService.getLoggedInUser()
      const from = (user && user.fullname) || 'Guest'
      this.msg.from = from
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
    socketService.on('chat-delete-msg', this.removeMsg)
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
    socketService.terminate()
  },
  methods: {
    isTyping(){
      if(this.counter === 1) return
      this.counter++
        socketService.emit('chat-send-isTyping', {from:this.msg.from , txt: 'is typing...'})
        setTimeout(() => {
          this.counter = 0
            },500)
    },
    addMsg(msg) {
      console.log(msg);
      this.msgs.push(msg)
    },
    removeMsg(){
      this.msgs.pop()
      
      console.log(this.counter);
    },
    sendMsg() {
      // console.log('Sending', this.msg)
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      // this.msg = {from, txt: ''}
    },
    changeTopic() {
      // socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    }
  }
}
</script>
