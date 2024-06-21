class Actor {
  constructor(
    name = "Foo",
    race = "Human",
    job = "Warrior",
    maxHp = 10,
    maxMp = 10,
    xP = 0,
    positionX = 0,
    positionY = 0,
    fGThing = new FGThing("@", Colors.pureBlue)
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
    this.fGThing = fGThing
  }

  setPosition(x,y) {
    this.positionX = x
    this.positionY = y
  }

  move(x, y, map) {
    if (map.getSquare(this.positionX + x, this.positionY + y).passable == true) {
      this.setPosition(this.positionX + x, this.positionY + y)
    }
  }

  runAI(map) {
    const xMove = randInt(3)-1
    const yMove = randInt(3)-1
    this.move(xMove, yMove, map)
  }
}