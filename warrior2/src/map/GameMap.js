class GameMap {
    constructor(sizeXYCoord,player) {
        this.size = sizeXYCoord
        this.grid = []
        for (let i = 0; i<this.size.y; i++) {
          this.grid[i] = []
        }
        this.player = player
        this.actors = []
    }

    getSquare(xYCoord) {
        if (this.coordinatesInBounds(xYCoord)) {
          return this.grid[xYCoord.y][xYCoord.x]
        }
        return Tiles.blankSquare
    }

    setSquare(xYCoord, mapSquare) {
        if (this.coordinatesInBounds(xYCoord)) {
          this.grid[xYCoord.y][xYCoord.x] = mapSquare
        } else {
          console.error("attempted to set OOB square")
        }
    }

    addActorAt(actor, xYCoord) {
        actor.position = xYCoord
        this.actors.push(actor)
    }

    runAllActorsAI() {
        for (const actor of this.actors) {
            actor.runAI(this)
        }
    }

    getActorAt(xYCoord) {
        for (const actor of this.actors) {
            if (actor.isAt(xYCoord)) {
                return actor
            }
        }
        return null
    }

    tileIsOpen(xYCoord) {
        return (this.getSquare(xYCoord).passable && this.getActorAt(xYCoord) == null)
    }

    coordinatesInBounds(xYCoord) {
      return (xYCoord.x >= 0
        && xYCoord.x < this.size.x
        && xYCoord.y >= 0
        && xYCoord.y < this.size.y)
    }

    static createFromMapString(mapGenStringArray) {
        const mapSize = new XYCoord(mapGenStringArray[0].length, mapGenStringArray.length)
        const gameMap = new GameMap(mapSize)
        for (let y = 0; y < gameMap.size.y; y++) {
            for (let x = 0; x < gameMap.size.x; x++) {
                const xYCoord = new XYCoord(x,y)
                const thisChar = mapGenStringArray[y].charAt(x)
                const thisTile = MapTileConversionMap.get(thisChar)
                gameMap.setSquare(xYCoord, thisTile)
            }
        }
        return gameMap
    }
}
