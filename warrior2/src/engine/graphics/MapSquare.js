class MapSquare {
    /**
     * 
     * @param {String} symbol 
     * @param {Color} color 
     * @param {Color} backgroundColor 
     * @param {Boolean} passable 
     */
    constructor(
        symbol = ".",
        color = Colors.gray,
        backgroundColor = Colors.black,
        passable = true
    ) {
        /** @type {String} */
        this.symbol = symbol
        /** @type {Color} */
        this.color = color
        /** @type {Color} */
        this.backgroundColor = backgroundColor
        /** @type {Boolean} */
        this.passable = passable
    }

    /**
     * 
     * @returns {MapSquare}
     */
    copy() {
        return new MapSquare(this.symbol, this.color, this.backgroundColor)
    }

    /**
     * 
     * @param {FGThing} fGThing 
     */
    setFGObject(fGThing) {
        this.symbol = fGThing.symbol
        this.color = fGThing.color
    }

    /**
     * @returns {ColorChar[]}
     */
    getColorChars() {
        return [
            new ColorChar(this.symbol, this.color, this.backgroundColor),
            new ColorChar(" ", this.color, this.backgroundColor)
        ]
    }
}
