class Player {
  constructor(
    name = "Bruh",
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
    this.attack = 10
    this.defence = 5
    this.magic = 5
    this.resistance = 2
    this.speed = 10
    this.positionX = positionX
    this.positionY = positionY
    this.map = map
  }

  getName() { return this.name }

  setPosition(x,y) {
    this.positionX = x
    this.positionY = y
  }
}