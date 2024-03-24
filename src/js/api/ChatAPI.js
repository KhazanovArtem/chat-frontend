
export default class ChatAPI {
    constructor(url, eventHandlers) {
      this.ws = new WebSocket(url);
      this.ws.addEventListener('open', this.onOpen.bind(this))
      this.ws.addEventListener('message', this.onMessage.bind(this))
      this.eventHandlers = eventHandlers;
    }
  
    onRegister(user) {
      const data = {type: 'register', user}
      const json = JSON.stringify(data);
      this.ws.send(json)
    }
  
    onOpen(e) {
      this.eventHandlers.onOpenConnection?.call(this, e.returnValue)
    }
  
    onClose() {
      const data = {type: 'exit'}
      const json = JSON.stringify(data);
      this.ws.send(json)
    }
  
  
    onSendMsg(msg) {
      const data = {type: 'send', data: msg.msg}
      const json = JSON.stringify(data)
      this.ws.send(json)
    }
  
    onMessage(e) {
      const data = JSON.parse(e.data)
  
      switch (data.type) {
        case 'error':
          this.eventHandlers.onError?.call(this, {msg:data.reason, command:data.command})
          break;
        case 'ok':
          console.log('ok', data.command)
          if (data.command === 'register') {
            this.eventHandlers.addCurrentUser?.call(this, data.user)
          } else if (data.command === 'exit') {
            console.log('exit')
            this.eventHandlers.leaveChat.call(this)
          }
          break;
        case 'users':
          this.eventHandlers.onRenderChat?.call(this, data.users)
          break;
        case 'message':
          this.eventHandlers.drawMessage?.call(this, {from: data.from, msg: data.data, created: data.created})
      }
  
    }
  }