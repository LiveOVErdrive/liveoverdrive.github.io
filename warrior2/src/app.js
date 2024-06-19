// Warrior II Browser Game

ui = new UI()

// TODO store game state stuff like this somewhere that makes sense.

function setPlayerPosition(x, y) {
    playerX = x
    playerY = y
}

function movePlayer(x, y) {
    if (mainGameMap.getSquare(playerX + x, playerY + y).passable == true) {
        setPlayerPosition(playerX + x, playerY + y)
    } else {
        ui.log("Umph! You run into a wall!<br/>")
    }
}

function placePlayerInRoom(gameMap) {
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
mainGameMap = GameMap.createFromMapString(demoMap)
placePlayerInRoom(mainGameMap)
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

// todo this should go somewhere map or graphics related probably
function paintMap(currentMap) {
    // todo store player somewhere better
    player = new FGThing()
    viewPortX = 24
    viewPortY = 24

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
    ui.updateMap(frameBuffer)
}

