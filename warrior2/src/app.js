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

class FGThing {
  constructor(
    symbol = "@",
    color = new Color(1,1,1)
  ) {
    this.symbol = symbol
    this.color = color
  }
}

class MapSquare {
  constructor(
    symbol = ".",
    color = new Color(0.5, 0.5, 0.5),
    backgroundColor = new Color(0.0, 0.0, 0.0),
    light = new Color(1.0, 1.0, 1.0),
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
        this.grid[x][y] = mapSquare
    }
}

function createMap() {
    gameMap = new GameMap(50, 50)
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            gameMap.setSquare(x, y, new MapSquare)
        }
    }
    return gameMap
}

mainGameMap = createMap()

/** GAME **/

// Global variables
playerX = 5
playerY = 5

// Startup:
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
    }

    paintMap(mainGameMap)
};

function movePlayer(x, y) {
    // TODO check map to see if square is passable
    playerX += x
    playerY += y
}

function paintMap(currentMap) {
    player = new FGThing()
    floor = new MapSquare()
    playerSquare = new MapSquare()
    playerSquare.setFGObject(player)
    blankSquare = new MapSquare(".", new Color(0,0,0), new Color(0,0,0))

    framebuffer = ""
    xZero = playerX - 10
    yZero = playerY - 10
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        mapX = xZero + x
        mapY = yZero + y
        if (x == 10 && y == 10) {
          framebuffer += playerSquare.getHTML()
        } else if (mapX < currentMap.sizeX && mapX >= 0 && mapY < currentMap.sizeY && mapY >= 0){
          framebuffer += currentMap.getSquare(mapX, mapY).getHTML()
        } else {
          framebuffer += blankSquare.getHTML()
        }
      }
      framebuffer += "<br/>"
    }
    pElement = document.getElementById('frame')
    pElement.innerHTML = framebuffer
}

