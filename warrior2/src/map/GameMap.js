class GameMap {
    constructor(x,y) {
        this.sizeX = x
        this.sizeY = y
        this.grid = []
        for (let i = 0; i<y; i++) {
          this.grid[i] = []
        }
    }

    getSquare(x, y) {
        return this.grid[y][x]
    }

    setSquare(x, y, mapSquare) {
        this.grid[y][x] = mapSquare
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
