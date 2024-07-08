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
        const visibleMapSize = new XYCoord(this.gameContext.viewPortSize.x / 2, this.gameContext.viewPortSize.y)
        const xZero = gameContext.player.position.x - this.gameContext.viewPortSize.x / 4
        const yZero = gameContext.player.position.y - this.gameContext.viewPortSize.y / 2

        // fill in the map
        const ui = this.gameContext.ui
        ui.resetFrame()
        for (let x = 0; x < visibleMapSize.x; x++) {
            for (let y = 0; y < visibleMapSize.y; y++) {
                const mapCoord = new XYCoord(xZero + x, yZero + y)
                let mapSquare = Tiles.blankSquare
                if (this.gameMap.coordinatesInBounds(mapCoord)) {
                    mapSquare = this.gameMap.getSquare(mapCoord).copy()
                    const actor = this.gameMap.getActorAt(mapCoord)
                    if (actor != null) {
                        mapSquare.setFGObject(actor.fGThing)
                    } else if (gameContext.player.position.equals(mapCoord)) {
                        mapSquare.setFGObject(gameContext.player.fGThing)
                    }
                }
                const colorChars = mapSquare.getColorChars()
                const frameCoords = [new XYCoord(x*2,y), new XYCoord(x*2 + 1,y)]
                ui.paintOverFrameChar(frameCoords[0], colorChars[0])
                ui.paintOverFrameChar(frameCoords[1], colorChars[1])
            }
        }
        ui.paintFrame()
    }


}