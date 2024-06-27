class GameContext {
    constructor() {
        this.ui = new UI(this)
        this.turnCount = 0
        this.player = new Player(this)
        this.viewPortSize = new XYCoord(40,24)
    }

    nextTurn() {
        this.turnCount++
    }
}