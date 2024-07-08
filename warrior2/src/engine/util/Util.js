class Util {
    static randInt(max) {
        return Math.floor(Math.random() * max)
    }

    static addHtmlColor(text, fgColor, bgColor) {
        const bgColorClause = (() => {
            if (bgColor !== null) {
                return ` background-color: ${bgColor}`
            }
            return ""
        })()
        const spaceEncodedText = text.replace(" ", Util.htmlSpace())
        return `<span style="color: ${fgColor};${bgColorClause}">${spaceEncodedText}</span>`
    }

    static htmlSpace() {
        return "&nbsp;"
    }

    static br() {
        return "<br>"
    }

    static truncateStringAndPadTo(string, width) {
        const truncatedString = string.substring(0,width)
        return truncatedString + Util.htmlSpace().repeat(width-truncatedString.length)
    }
}

