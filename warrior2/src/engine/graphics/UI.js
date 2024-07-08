class UI {
    constructor(gameContext) {
        this.gameContext = gameContext
        this.frame = document.getElementById('frame')
        this.logWindow = document.getElementById('log')
        this.logs = []
        this.maxLogLines = 16
        this.frameBuffer = []
        for (let x = 0; x < gameContext.viewPortSize.x; x++) {
            this.frameBuffer[x] = []
            for (let y = 0; y < gameContext.viewPortSize.y; y++) {
                this.frameBuffer[x][y] = new ColorChar()
            }
        }
    }

    /**
     * 
     * @param {XYCoord} xYCoord 
     * @returns {ColorChar}
     */
    getFrameChar(xYCoord) {
        return this.frameBuffer[xYCoord.x][xYCoord.y]
    }

    /**
     * 
     * @param {XYCoord} xYCoord 
     * @param {ColorChar} colorChar 
     */
    paintOverFrameChar(xYCoord, colorChar) {
        this.frameBuffer[xYCoord.x][xYCoord.y].paintOverWith(colorChar)
    }

    resetFrame() {
        for (let x = 0; x < gameContext.viewPortSize.x; x++) {
            for (let y = 0; y < gameContext.viewPortSize.y; y++) {
                this.frameBuffer[x][y].reset()
            }
        }
    }

    paintFrame() {
        let htmlFrameBuffer = ""
        let currentBlock = ""
        let firstOfBlock = null
        const printTheBlock = () => {
            htmlFrameBuffer += Util.addHtmlColor(
                `${currentBlock}`,
                firstOfBlock.color.getHexCode(),
                firstOfBlock.bgColor.getHexCode()
            )
        }
        const newBlock = (thisChar) => {
            currentBlock = thisChar.getSymbolHtml()
            firstOfBlock = thisChar
        }
        const clearBlock = () => {
            currentBlock = ""
            firstOfBlock = null
        }
        for (let y = 0; y < gameContext.viewPortSize.y; y++) {
            for (let x = 0; x < gameContext.viewPortSize.x; x++) {
                //htmlFrameBuffer += this.getFrameChar(new XYCoord(x, y)).getHtml()
                const thisChar = this.getFrameChar(new XYCoord(x, y))
                if (firstOfBlock === null) {
                    newBlock(thisChar)
                } else if (firstOfBlock.hasSameColor(thisChar)) {
                    currentBlock += thisChar.getSymbolHtml()
                } else {
                    printTheBlock()
                    newBlock(thisChar)
                }
            }
            printTheBlock()
            clearBlock()
            htmlFrameBuffer += "<br>"
        }
        this.frame.innerHTML = htmlFrameBuffer
    }

    log(text) {
        this.logs.push(new Message(gameContext.turnCount, text))
        this.refreshLogs()
    }

    refreshLogs() {
        while (this.logs.length > this.maxLogLines) {
            this.logs.shift()
        }
        let logHTML = ""
        for (let i = this.logs.length - 1; i >= 0; i--) {
            let color = "gray"
            if (this.logs[i].turn == gameContext.turnCount) {
                color = "white"
            }
            logHTML += '<span style="color: ' + color + '">' + this.logs[i].turn + " " + this.logs[i].text + "</span>" + "<br/>"
        }
        this.setLog(logHTML)
    }

    setLog(html) {
        this.logWindow.innerHTML = html
    }
}

class Message {
    constructor(turn, text) {
        this.turn = turn
        this.text = text
    }
}