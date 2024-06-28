class BattleScreen extends Screen {
    constructor(gameContext, gameMap) {
        super(gameContext)
        this.gameMap = gameMap
    }

    handleKeyPress(Key) {
        if (Key == 'KeyA') {
            gameContext.ui.log("You attack!")
        } else if (Key == 'KeyD') {
            gameContext.ui.log("You defend")
        } else {
            return
        }

        this.updateDisplay()
    }

    updateDisplay() {
        this.gameContext.ui.refreshLogs()
    }

}