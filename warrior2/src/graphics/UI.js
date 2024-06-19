class UI {
  constructor() {
    this.mapWindow = document.getElementById('frame')
    this.statsWindow = document.getElementById('stats')
    this.logWindow = document.getElementById('log')
  }

  log(message) {
    this.logWindow.innerHTML = turnCount + " " + message + this.logWindow.innerHTML
  }

  updateMap(html) {
    this.mapWindow.innerHTML = html
  }

  updateStats(html) {
    this.statsWindow.innerHTML = html
  }
}