    // todo this class needs to be a singleton
class UI {
  constructor() {
    this.frame = document.getElementById('frame')
    this.logWindow = document.getElementById('log')
    this.logs = []
  }

  log(text) {
    this.logs.push(new Message(turnCount, text))
    this.refreshLogs()
  }

  refreshLogs() {
    let logHTML = ""
    for (let i = this.logs.length-1; i>=0 && i>=this.logs.length-10; i--) {
      let color = "gray"
      if (this.logs[i].turn == turnCount) {
        color = "white"
      }
      logHTML += '<span style="color: ' + color + '">' + this.logs[i].turn + " " + this.logs[i].text + "</span>" + "<br/>"
    }
    this.logWindow.innerHTML = logHTML
  }

  updateFrame(html) {
    this.frame.innerHTML = html
  }

}

class Message {
  constructor(turn, text) {
    this.turn = turn
    this.text = text
  }
}