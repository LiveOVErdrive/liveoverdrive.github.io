class MapSquare {
    constructor(
        symbol = ".",
        color = Colors.gray,
        backgroundColor = Colors.black,
        light = Colors.white,
        passable = true
    ) {
        this.symbol = symbol
        this.color = color
        this.backgroundColor = backgroundColor
        this.light = light
        this.passable = passable
    }

    copy(mapSquare) {
        return new MapSquare(this.symbol, this.color, this.backgroundColor, this.light)
    }

    addLight(additionalLight) {
        this.light.add(additionalLight)
    }

    setFGObject(fGThing) {
        this.symbol = fGThing.symbol
        this.color = fGThing.color
    }

    getHTML() {
        return Util.addHtmlColor(
            `${this.symbol}${Util.htmlSpace()}`,
            this.color.multiply(this.light).getHexCode(),
            this.backgroundColor.multiply(this.light).getHexCode()
        )
    }
}
