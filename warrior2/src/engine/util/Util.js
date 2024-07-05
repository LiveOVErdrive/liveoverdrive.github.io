class Util {
    static randInt(max) {
        return Math.floor(Math.random() * max)
    }

    static addHtmlColor(text, fgColor, bgColor) {
        return `<span style="color: ${fgColor}; background-color: ${bgColor}">${text}</span>`
    }

    static htmlSpace() {
        return "&nbsp;"
    }

    static truncateStringAndPadTo(string, width) {
        const truncatedString = string.substring(0,width)
        return truncatedString + Util.htmlSpace().repeat(width-truncatedString.length)
    }
}

