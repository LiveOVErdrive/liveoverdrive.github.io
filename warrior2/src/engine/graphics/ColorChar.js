/**
 * ColorChar is the basic graphical unit of the main display window. It represents a
 * single character with a color and a background color.
 */
class ColorChar {
    constructor(
        symbol = " ",
        color = Colors.white,
        bgColor = null
    ) {
        if (symbol.length > 1) {
            throw new Error("ColorChar can only represent a single character")
        }
        this.symbol = symbol
        this.color = color
        this.bgColor = bgColor
    }

    getHtml() {
        return Util.addHtmlColor(
            `${this.getSymbolHtml()}`,
            this.color.getHexCode(),
            this.bgColor.getHexCode()
        )
    }

    getSymbolHtml() {
        if (this.symbol === " ") { return Util.htmlSpace() }
        return this.symbol
    }

    paintOverWith(otherColorChar) {
        this.symbol = otherColorChar.symbol
        this.color = otherColorChar.color
        // treat null as transparent
        if (otherColorChar.bgColor !== null) {
            this.bgColor = otherColorChar.bgColor
        }
    }

    reset() {
        this.symbol = " ",
        this.color = Colors.white
        this.bgColor = Colors.black
    }

    hasSameColor(colorChar) {
        return (this.color === colorChar.color && this.bgColor == colorChar.bgColor)
    }
}