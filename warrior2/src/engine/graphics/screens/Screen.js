// VIRTUAL : should be extended for each type of screen that can
// be displayed.
class Screen {
    constructor(gameContext) {
        /** @type {GameContext} */
        this.gameContext = gameContext
    }

    handleKeyPress() {
        console.warn("handleKeyPress not implemented for this subclass")
    }

    updateDisplay() {
        console.warn("updateDisplay not implemented for this subclass")
    }
}