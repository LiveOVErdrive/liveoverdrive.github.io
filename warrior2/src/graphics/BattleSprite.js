class BattleSprite {
    constructor() {
        const spriteString = [
            "          ",
            " \\  o     ",
            "  \\/V0    ",
            "    ǁ     ",
            "    ǁ     "
        ]
        this.sprite = []
        for (let row of spriteString) {
            this.sprite.push(Util.addHtmlColor(Util.truncateStringAndPadTo(row, BattleSprite.getDimensions().x).replaceAll(" ", Util.htmlSpace()), Colors.white.getHexCode(), Colors.black.getHexCode()))
        }
    }

    getRow(n) {
        return this.sprite[n] || Util.htmlSpace().repeat(BattleSprite.getDimensions().x)
    }

    static getDimensions() {
        return new XYCoord(10,5)
    }

    // TODO: let the color of the weapons and armor reflect the item color for player characters in the future.
}