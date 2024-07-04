class MinotaurActor extends Actor {
    constructor(position = new XYCoord(0,0)) {
        super(
            "Minotaur",
            "Minotaur",
            "Fighter",
            20,
            0,
            0,
            position,
            new FGThing("M", Colors.brown),
            new BattleSprite(
                [
                    "          ",
                    "          ",
                    " ψ  Ɏ     ",
                    " | Ƹ00Ʒ   ",
                    " |/ AA \\  ",
                    " |  ǁǁ   ",
                    " |  ǁǁ   ",
                ]
            )

        )
    }
}