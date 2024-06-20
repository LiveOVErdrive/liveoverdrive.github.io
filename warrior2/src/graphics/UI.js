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

  updateStats(player) {
    const yellow = 'style="color: yellow"'
    let html = '' +
    `<span>${player.name} the ${player.race} ${player.job}</span><br><br>` +
    `<span ${yellow}>ATK:</span> ${player.attack}<br>` +
    `<span ${yellow}>DEF:</span> ${player.defence}<br>` +
    `<span ${yellow}>MAG:</span> ${player.magic}<br>` +
    `<span ${yellow}>RES:</span> ${player.resistance}<br>` +
    `<span ${yellow}>SPD:</span> ${player.speed}<br>`

    this.statsWindow.innerHTML = html
  }
}