class GameContext {
    constructor() {
        /** @type {XYCoord} @public */
        this.viewPortSize = new XYCoord(80,24)
        /** @type {UI} @public */
        this.ui = new UI(this)
        /** @type {number} @public */
        this.turnCount = 0
        /** @type {Player} @public */
        this.player = new Player(this)
    }

    nextTurn() {
        this.turnCount++
    }
}