class GoblinActor extends Actor {
    constructor(position = new XYCoord(0,0)) {
        super(
            "Goblin",
            "Goblin",
            "Fighter",
            10,
            0,
            0,
            position,
            new FGThing("g", Colors.brown),
            new BattleSprite(
                [
                    "          ",
                    "          ",
                    "          ",
                    "          ",
                    "    Ʉ     ",
                    "  (/V\\0   ",
                    "    ǁ     "
                ]
            )

        )
    }
}