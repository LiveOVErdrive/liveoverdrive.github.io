    // todo this class needs to be a singleton
class UI {
  constructor(gameContext) {
    this.gameContext = gameContext
    this.frame = document.getElementById('frame')
    this.logWindow = document.getElementById('log')
    this.logs = []
    this.maxLogLines = 16
  }

  log(text) {
    this.logs.push(new Message(gameContext.turnCount, text))
    this.refreshLogs()
  }

  refreshLogs() {
    while(this.logs.length > this.maxLogLines) {
      this.logs.shift()
    }
    let logHTML = ""
    for (let i = this.logs.length-1; i>=0; i--) {
      let color = "gray"
      if (this.logs[i].turn == gameContext.turnCount) {
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