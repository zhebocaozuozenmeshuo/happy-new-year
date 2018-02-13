! function() {
  var view = e('section.message')
  let model = {
    init: function() {
      var APP_ID = 'Y4cImvJF6K2B35fwe9AMiY3t-gzGzoHsz'
      var APP_KEY = '9znAEnL15d2J6wfoRWHzlSHB'
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    // 获取数据
    fetch: function() {
      var query = new AV.Query('Message');
      return query.find() // Promise 对象
    },
    // 保存数据
    save: function(name, content) {
      var Message = AV.Object.extend('Message')
      var message = new Message()
      return message.save({'name': name, 'content': content }) // Promise 对象
    }
  }
  var controller = {
    view: null,
    model: null,
    messageList: null,
    form: null,
    init: function(view, model) {
      this.view = view
      this.model = model
      this.messageList = find(view, '#messageList')
      this.form = find(view, 'form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },

    loadMessages: function() {
      var query = new AV.Query('Message');
      this.model.fetch()
        .then(
          (messages) => {
            // 成功获得实例
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
              let li = document.createElement('li')
              li.innerText = `${item.name}: ${item.content}`
              this.messageList.append(li)
            })
          }
        )
    },
    bindEvents: function() {
      this.form.addEventListener('submit', (event) => {
        event.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function() {
      let myForm = this.form
      let name = myForm.querySelector('input[name=name]').value
      let content = myForm.querySelector('input[name=content]').value
      this.model.save(name, content)
        .then(function(object) {
          let item = object.attributes
          let li = document.createElement('li')
          li.innerText = `${item.name}: ${item.content}`
          let messageList = e('#messageList')
          messageList.append(li)
          myForm.querySelector('input[name=content]').value = ''
        })
    },
  }
  controller.init(view, model)
}.call()









// // 创建 TestObject 表
// var X = AV.Object.extend('Harold2')
// // 在表中创建一行数据
// var o = new X()
// // 数据内容是 Hello World! 保存
// // 如果保存成功了 运行 alert
// o.save({
//   xx: 'Fuck World!'
// }).then(function(object) {
//   log(object)
//   alert('LeanCloud Rocks!')
// })
