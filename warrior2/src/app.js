// Warrior II Browser Game

/** GRAPHICS **/

class Color {
  constructor(r=0.5, g=0.5, b=0.5) {
    this.r = r
    this.g = g
    this.b = b
  }

  getHexCode() {
    const redHex = Math.min(Math.ceil(0xff * this.r), 0xff).toString(16)
    const greenHex = Math.min(Math.ceil(0xff * this.g), 0xff).toString(16)
    const blueHex = Math.min(Math.ceil(0xff * this.b), 0xff).toString(16)
    return "#" + redHex + greenHex + blueHex
  }

  multiply(otherColor) {
    return new Color(
      this.r * otherColor.r,
      this.g * otherColor.g,
      this.b * otherColor.b,
    )
  }

  add(otherColor) {
    return new Color(
      this.r + otherColor.r,
      this.g + otherColor.g,
      this.b + otherColor.b,
    )
  }
}

class Colors {
  static black = new Color(0,0,0)
  static white = new Color(1,1,1)
  static darkGray = new Color(0.2,0.2,0.2)
  static gray = new Color(0.5,0.5,0.5)
  static brown = new Color(0.25,0.2,0.15)
}

class FGThing {
  constructor(
    symbol = "@",
    color = Colors.white
  ) {
    this.symbol = symbol
    this.color = color
  }
}

class MapSquare {
  constructor(
    symbol = ".",
    color = Colors.gray,
    backgroundColor = Colors.black,
    light = Colors.white,
    passable = true
  ) {
    this.symbol = symbol
    this.color = color
    this.backgroundColor = backgroundColor
    this.light = light
    this.passable = passable
  }

  copy(mapSquare) {
    return new MapSquare(this.symbol, this.color, this.backgroundColor, this.light)
  }

  addLight(additionalLight) {
    this.light.add(additionalLight)
  }

  setFGObject(fGThing) {
    this.symbol = fGThing.symbol
    this.color = fGThing.color
  }

  getHTML() {
    return '<span style="color: ' + this.color.multiply(this.light).getHexCode() +
           '; background-color: ' + this.backgroundColor.multiply(this.light).getHexCode() + '">'
           + this.symbol + ' </span>'
  }
}

class Tiles {
    static caveWall = new MapSquare("#", Colors.white, Colors.gray, Colors.white, false)
    static caveFloor = new MapSquare(".", Colors.gray, Colors.brown)
    static blankSquare = new MapSquare(".", Colors.black, Colors.black)
}

/** GameMap **/

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
}

function createMap() {
    const mapGenStrings = [
        "0000000000000000000000000000000000000000",
        "0111111111111110000000011111110000000000",
        "0111111111111110000000011111110000000000",
        "0111111111111111111111111111110000000000",
        "0111111111111110000000011111110000000000",
        "0111111111111110000000011111110000000000",
        "0111111111111110000000000010000000000000",
        "0000000000000000000000000010000000000000",
        "0000000000000000000000000010000000000000",
        "0000000000000000000000000010000000000000",
        "0000000000000000000000000010000000000000",
        "0000000000000000000000000010000000000000",
        "0000000000000000000000011111110000000000",
        "0000000000000000000000011111110000000000",
        "0000000000000000000000011111110000000000",
        "0000000000000000000000011111110000000000",
        "0000000000000000000000011111110000000000",
        "0000000000000000000000011111110000000000",
        "0000000000000000000000011111110000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
        "0000000000000000000000000000000000000000",
    ]
    const mapTileConversionMap = new Map()
    mapTileConversionMap.set('0',Tiles.caveWall)
    mapTileConversionMap.set('1',Tiles.caveFloor)
    gameMap = new GameMap(mapGenStrings[0].length, mapGenStrings.length)
    for (let y = 0; y < gameMap.sizeY; y++) {
        for (let x = 0; x < gameMap.sizeX; x++) {
            const thisChar = mapGenStrings[y].charAt(x)
            const thisTile = mapTileConversionMap.get(thisChar)
            gameMap.setSquare(x, y, thisTile)
        }
    }
    return gameMap
}

function randInt(max) {
    return Math.floor(Math.random()*max)
}

function randomMap() {
    gameMap = new GameMap(100, 100)
    // fill the map with wall
    for (let y = 0; y < gameMap.sizeY; y++) {
        for (let x = 0; x < gameMap.sizeX; x++) {
            gameMap.setSquare(x, y, Tiles.caveWall)
        }
    }
    let numberOfRooms=30
    for (let room = 0; room < numberOfRooms; room++) {
        let upperLeftX = randInt(89) + 1
        let upperLeftY = randInt(89) + 1
        let lowerRightX = upperLeftX + randInt(5)+3
        let lowerRightY = upperLeftY + randInt(5)+3
        console.log(upperLeftX, upperLeftY, lowerRightX, lowerRightY)
        for (let x = upperLeftX; x <= lowerRightX; x++) {
            for (let y = upperLeftY; y <= lowerRightY; y++) {
                console.log(x,y)
                gameMap.setSquare(x, y, Tiles.caveFloor)
            }
        }

    }
    return gameMap
}

function setPlayerPosition(x, y) {
    playerX = x
    playerY = y
}

function movePlayer(x, y) {
    if (mainGameMap.getSquare(playerX + x, playerY + y).passable == true) {
        setPlayerPosition(playerX + x, playerY + y)
    } else {
        log("Umph! You run into a wall!<br/>")
    }
}

function placePlayerInRoom() {
    for (let y = 0; y < mainGameMap.sizeY; y++) {
        for (let x = 0; x < mainGameMap.sizeX; x++) {
            if (gameMap.getSquare(x,y).passable) {
                setPlayerPosition(x,y)
                return
            }
        }
    }
}


/** GAME **/

// Global variables
playerX = 5
playerY = 5
turnCount = 0

// Startup:
mainGameMap = createMap()
placePlayerInRoom()
paintMap(mainGameMap)

// Game Loop: ticks on a keypress
document.onkeypress = function (e) {
    e = e || window.event;
    key = e.keyCode

    if (key == 97) {         // a
        movePlayer(-1, 0)
    } else if (key == 100) { // d
        movePlayer(1, 0)
    } else if (key == 119) { // w
        movePlayer(0, -1)
    } else if (key == 120) { // x
        movePlayer(0, 1)
    } else if (key == 113) { // q
        movePlayer(-1, -1)
    } else if (key == 101) { // e
        movePlayer(1, -1)
    } else if (key == 122) { // z
        movePlayer(-1, 1)
    } else if (key == 99) {  // c
        movePlayer(1, 1)
    } else {
        return
    }

    turnCount++
    paintMap(mainGameMap)
};

function log(message) {
    pElement = document.getElementById('log')
    pElement.innerHTML = turnCount + " " + message + pElement.innerHTML
}


function paintMap(currentMap) {
    // todo store player somewhere better
    player = new FGThing()
    viewPortX = 20
    viewPortY = 20

    mapBuffer = []
    xZero = playerX - viewPortX/2
    yZero = playerY - viewPortY/2

    // fill in the map
    for (let y = 0; y < viewPortY; y++) {
      mapBuffer[y] = []
      for (let x = 0; x < viewPortX; x++) {
        mapX = xZero + x
        mapY = yZero + y
        if (mapX < currentMap.sizeX && mapX >= 0 && mapY < currentMap.sizeY && mapY >= 0){
          mapBuffer[y][x] = currentMap.getSquare(mapX, mapY).copy()
        } else {
          mapBuffer[y][x] = Tiles.blankSquare
        }
      }
    }

    // fill in the player
    mapBuffer[playerY-yZero][playerX-xZero].setFGObject(player)

    // TODO fill in the FG objects from list

    // TODO do the lighting

    // Write the html framebuffer
    frameBuffer = ""
    for (let y = 0; y < viewPortY; y++) {
      for (let x = 0; x < viewPortX; x++) {
        frameBuffer += mapBuffer[y][x].getHTML()
      }
      frameBuffer += "<br/>"
    }
    pElement = document.getElementById('frame')
    pElement.innerHTML = frameBuffer
}

