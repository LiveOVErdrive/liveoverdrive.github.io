class Player extends Actor {
  constructor() {
    // todo // This is dumb. Does JS not have named params.
    // todo // Come up with a better way to do this. Will need for monsters.
    super(
      "Foo",
      "Human",
      "Warrior",
      10,
      10,
      0,
      new XYCoord(8,2),
      new FGThing("@", Colors.white)
    )
  }

  runAI(gameMap) { /* do nothing */ }

}