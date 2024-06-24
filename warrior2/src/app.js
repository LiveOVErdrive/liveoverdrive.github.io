// Warrior II Browser Game

// "Services"
ui = new UI()

// Global variables
turnCount = 0
player = new Player()

// Startup:
mainGameMap = GameMap.createFromMapString(demoMap,player)
mainGameMap.addActorAt(new Actor(), new XYCoord(4,4))
paintMap(mainGameMap)

// Game Loop: ticks on a keypress
document.onkeypress = function (e) {
    e = e || window.event;
    key = e.keyCode

    if (key == 97) {         // a
        player.move(Directions.W, mainGameMap)
    } else if (key == 100) { // d
        player.move(Directions.E, mainGameMap)
    } else if (key == 119) { // w
        player.move(Directions.N, mainGameMap)
    } else if (key == 120) { // x
        player.move(Directions.S, mainGameMap)
    } else if (key == 113) { // q
        player.move(Directions.NW, mainGameMap)
    } else if (key == 101) { // e
        player.move(Directions.NE, mainGameMap)
    } else if (key == 122) { // z
        player.move(Directions.SW, mainGameMap)
    } else if (key == 99) {  // c
        player.move(Directions.SE, mainGameMap)
    } else {
        return
    }

    mainGameMap.runAllActorsAI()
    turnCount++
    paintMap(mainGameMap)
};

// todo this should go somewhere map or graphics related probably
function paintMap(currentMap) {
    viewPortX = 24
    viewPortY = 24

    mapBuffer = []
    xZero = player.position.x - viewPortX/2
    yZero = player.position.y - viewPortY/2

    // fill in the map
    for (let y = 0; y < viewPortY; y++) {
      mapBuffer[y] = []
      for (let x = 0; x < viewPortX; x++) {
        const mapCoord = new XYCoord(xZero + x, yZero + y)
        if (currentMap.coordinatesInBounds(mapCoord)){
          mapBuffer[y][x] = currentMap.getSquare(mapCoord).copy()
          const actor = currentMap.getActorAt(mapCoord)
          if (actor != null) {
            mapBuffer[y][x].setFGObject(actor.fGThing)
          } else if (player.position.equals(mapCoord)) {
            mapBuffer[y][x].setFGObject(player.fGThing)
          }
        } else {
          mapBuffer[y][x] = Tiles.blankSquare
        }
      }
    }

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
    ui.updateStats(player)
}

