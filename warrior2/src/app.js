// Warrior II Browser Game

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

