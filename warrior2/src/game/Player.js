class Player {
  constructor(
    name = "Tav",
    race = "Human",
    job = "Warrior",
    maxHp = 10,
    maxMp = 10,
    xP = 0,
    positionX = 0,
    positionY = 0,
    map = demoMap,
  ) {
    this.name = name
    this.race = race
    this.job = job
    this.hp = maxHp
    this.maxHp = maxHp
    this.mp = maxMp
    this.maxMp = maxMp
    this.xp = xP
    this.positionX = positionX
    this.positionY = positionY
    this.map = map
  }

  setPosition(x,y) {
    this.positionX = x
    this.positionY = y
  }
}