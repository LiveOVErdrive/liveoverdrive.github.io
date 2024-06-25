class Actor {
  constructor(
    name = "Foo",
    race = "Human",
    job = "Warrior",
    maxHp = 10,
    maxMp = 10,
    xP = 0,
    position = new XYCoord(0,0),
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
    this.position = position
    this.fGThing = fGThing
  }

  setPosition(xYCoord) {
    this.position.set(xYCoord)
  }

  isAt(xYCoord) {
    return this.position.equals(xYCoord)
  }

  move(xYCoord, gameMap) {
    const targetCoord = this.position.plus(xYCoord)
    if (gameMap.getSquare(targetCoord).passable == true) {
      this.position = targetCoord
    }
  }

  walkTowardDestination(destinationCoord, gameMap) {
    // TODO fix this - it just falls through to random
    // vectorMap stores the movement vector for the actor to START their walk to a given
    // square, based on the BFS to come.
    const vectorMap = []
    for (let y = 0; y < gameMap.size.y; y++) {
      vectorMap[y] = []
      for (let x = 0; x < gameMap.size.x; x++) {
        vectorMap[y][x] = null
      }
    }

    // currentStep hold all the squares reachable on THIS iteration of the BFS
    let currentStep = []
    currentStep.push(XYCoord.copyFrom(this.position))
    vectorMap[this.position.y][this.position.x] = new XYCoord(0,0)
    // nextStep will hold all the unvisited squares reachable from the currentStep squares
    let nextStep = []
    let distanceHardCap = 1000
    // check each adjacent square to see if we can go there and if we have gone there
    while (currentStep.length > 0 && distanceHardCap > 0) {
      distanceHardCap--
      for (const step of currentStep) {
        const stepVector = vectorMap[step.y][step.x]
        if (step.equals(destinationCoord)) {
          // success end case : we've found the shortest path to the dest.
          this.move(stepVector, gameMap)
          return
        }
        for ( let y = -1; y<2; y++ ) {
          for ( let x = -1; x<2; x++ ) {
            const adjCoord = new XYCoord(step.x + x, step.y + y)
            if (gameMap.coordinatesInBounds(adjCoord)) {
              const currentVector = vectorMap[adjCoord.y][adjCoord.x] 
              if (currentVector === null && gameMap.tileIsOpen(adjCoord)) {
                nextStep.push(adjCoord)
                if (step.equals(this.position)) {
                  // if this is the first time through, we fill in the first-step vector
                  vectorMap[adjCoord.y][adjCoord.x] = new XYCoord(x,y)
                } else {
                  // copy the first-step vector from the previous step
                  vectorMap[adjCoord.y][adjCoord.x] = stepVector
                }
              }
            }
          }
        }
      }
      currentStep = nextStep
      nextStep = []
    }
    // fail case: we didn't find a way to the target. Just go anywhere for now.
    this.moveRandom(gameMap)
  }

  moveRandom(gameMap) {
    const moveVector = new XYCoord(randInt(3)-1, randInt(3)-1)
    this.move(moveVector, gameMap)
  }

  runAI(gameMap) {
    this.walkTowardDestination(new XYCoord(20,4), gameMap)
  }
}