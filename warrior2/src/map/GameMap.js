class GameMap {
    constructor(x,y,player) {
        this.sizeX = x
        this.sizeY = y
        this.grid = []
        for (let i = 0; i<y; i++) {
          this.grid[i] = []
        }
        this.player = player
        this.actors = []
    }

    getSquare(x, y) {
        if (x>=this.sizeX || x<0 || y>=this.sizeY || y<0) {
            return Tiles.blankSquare
        }
        return this.grid[y][x]
    }

    setSquare(x, y, mapSquare) {
        this.grid[y][x] = mapSquare
    }

    addActorAt(actor, x, y) {
        actor.positionX = x
        actor.positionY = y
        this.actors.push(actor)
    }

    runAllActorsAI() {
        for (const actor of this.actors) {
            actor.runAI(this)
        }
    }

    getActorAt(x,y) {
        for (const actor of this.actors) {
            if (actor.positionX == x && actor.positionY == y) {
                return actor
            }
        }
        return null
    }

    tileIsOpen(x,y) {
        for (const actor of this.actors) {
            if (actor.positionX == x && actor.positionY == y) {
                return false
            }
        }
        return getSquare(x, y).passable
    }

    static createFromMapString(mapGenStringArray) {
        const gameMap = new GameMap(mapGenStringArray[0].length, mapGenStringArray.length)
        for (let y = 0; y < gameMap.sizeY; y++) {
            for (let x = 0; x < gameMap.sizeX; x++) {
                const thisChar = mapGenStringArray[y].charAt(x)
                const thisTile = mapTileConversionMap.get(thisChar)
                gameMap.setSquare(x, y, thisTile)
            }
        }
        return gameMap
    }
}
