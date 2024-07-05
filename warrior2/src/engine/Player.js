class Player extends Actor {
    constructor(gameContext) {
        // todo // This is dumb. Does JS not have named params.
        // todo // Come up with a better way to do this. Will need for monsters.
        super(
            "Foo",
            "Human",
            "Warrior",
            10,
            10,
            0,
            new XYCoord(8, 2),
            new FGThing("@", Colors.white)
        )
        this.gameContext = gameContext
    }

    runAI(gameMap) { /* do nothing */ }

    move(xYCoord, gameMap) {
        const targetCoord = this.position.plus(xYCoord)
        if (gameMap.tileIsOpen(targetCoord)) {
            this.position = targetCoord
        } else {
            this.gameContext.ui.log("Umph! You run into a wall!")
        }
    }
}