class MapScreen extends Screen {
  constructor(gameContext, gameMap) {
      super(gameContext)
      this.gameMap = gameMap
  }

  handleKeyPress(Key) {
    if (Key == 'KeyA' || Key == 'Numpad4') {
        gameContext.player.move(Directions.W, this.gameMap)
    } else if (Key == 'KeyD' || Key == 'Numpad6') {
        gameContext.player.move(Directions.E, this.gameMap)
    } else if (Key == 'KeyW' || Key == 'Numpad8') {
        gameContext.player.move(Directions.N, this.gameMap)
    } else if (Key == 'KeyX' || Key == 'Numpad2') {
        gameContext.player.move(Directions.S, this.gameMap)
    } else if (Key == 'KeyQ' || Key == 'Numpad7') {
        gameContext.player.move(Directions.NW, this.gameMap)
    } else if (Key == 'KeyE' || Key == 'Numpad9') {
        gameContext.player.move(Directions.NE, this.gameMap)
    } else if (Key == 'KeyZ' || Key == 'Numpad1') {
        gameContext.player.move(Directions.SW, this.gameMap)
    } else if (Key == 'KeyC' || Key == 'Numpad3') {
        gameContext.player.move(Directions.SE, this.gameMap)
    } else if (Key == 'KeyS' || Key == 'Numpad5') {
        // gameContext.player wait: Do nothing but tick the clock
    } else {
        // Not a Key we use: Do nothing and DON'T tick the clock
        return
    }

    this.gameMap.runAllActorsAI()
    this.updateDisplay()
    this.gameContext.nextTurn()

  }

  updateDisplay() {
    this.paintMap(this.gameMap)
    this.gameContext.ui.refreshLogs()
  }

  paintMap() {
    this.gameContext.viewPortSize.x = 40
    this.gameContext.viewPortSize.y = 24

    const mapBuffer = []
    const xZero = gameContext.player.position.x - this.gameContext.viewPortSize.x/2
    const yZero = gameContext.player.position.y - this.gameContext.viewPortSize.y/2

    // fill in the map
    for (let y = 0; y < this.gameContext.viewPortSize.y; y++) {
      mapBuffer[y] = []
      for (let x = 0; x < this.gameContext.viewPortSize.x; x++) {
        const mapCoord = new XYCoord(xZero + x, yZero + y)
        if (this.gameMap.coordinatesInBounds(mapCoord)){
          mapBuffer[y][x] = this.gameMap.getSquare(mapCoord).copy()
          const actor = this.gameMap.getActorAt(mapCoord)
          if (actor != null) {
            mapBuffer[y][x].setFGObject(actor.fGThing)
          } else if (gameContext.player.position.equals(mapCoord)) {
            mapBuffer[y][x].setFGObject(gameContext.player.fGThing)
          }
        } else {
          mapBuffer[y][x] = Tiles.blankSquare
        }
      }
    }

    // TODO fill in the FG objects from list

    // TODO do the lighting

    // Write the html framebuffer
    let frameBuffer = ""
    for (let y = 0; y < this.gameContext.viewPortSize.y; y++) {
      for (let x = 0; x < this.gameContext.viewPortSize.x; x++) {
        frameBuffer += mapBuffer[y][x].getHTML()
      }
      frameBuffer += "<br/>"
    }
    gameContext.ui.updateFrame(frameBuffer)
  }


}