class BattleScreen extends Screen {
    constructor(gameContext) {
        super(gameContext)
        this.round = 1
        const enemy1 = new Actor("goblin", "", "", 20, 0, 0, null, new FGThing("g", Colors.lightBrown))
        enemy1.hp = 17
        const enemy2 = new Actor("minotaur", "", "", 20, 0, 0, null, new FGThing("M", Colors.lightGreen))
        enemy2.hp = 4
        const enemy3 = new Actor("goblin", "", "", 20, 0, 0, null, new FGThing("g", Colors.lightBrown))
        enemy3.hp = 9
        const player1 = new Actor("Jerome", "", "", 20, 0, 0, null, new FGThing("@", Colors.white))
        player1.hp = 19
        const player2 = new Actor("Hidalgo", "", "", 20, 0, 0, null, new FGThing("@", Colors.pureBlue))
        player2.hp = 10
        this.players = [player1, player2]
        this.enemies = [enemy1, enemy2, enemy3]
        this.spriteWidth = 10
    }

    handleKeyPress(Key) {
        if (Key == 'KeyA') {
            this.log("You attack!")
        } else if (Key == 'KeyD') {
            this.log("You defend")
        } else {
            return
        }

        this.updateDisplay()
        this.round++
    }

    log(text) {
        this.gameContext.ui.log(`round ${this.round}: ${text}`)
    }

    updateDisplay() {
        this.displayCombatants()
        this.gameContext.ui.refreshLogs()
    }

    generateHealthBar(hp, totalHp) {
        const percent = hp / totalHp
        const fullLength = Math.floor(this.spriteWidth * percent)
        let color = "white"
        if (percent < 0.25) {
            color = "red"
        } else if (percent < 0.51) {
            color = "yellow"
        }
        return `<span style="color:${color};">` + "#".repeat(fullLength) + "-".repeat(this.spriteWidth - fullLength) + "</span>"
    }

    displayCombatants() {
        const totalRowsUsed = 22
        const rowsOfWhitespace = gameContext.viewPortSize.y - totalRowsUsed
        let frameBuffer = "<br>"
        frameBuffer += this.displayTeam(this.enemies)
        frameBuffer += "<br>" + ".".repeat(gameContext.viewPortSize.x * 2 - 1) + "<br>"
        frameBuffer += "<br>".repeat(rowsOfWhitespace)
        frameBuffer += this.displayTeam(this.players)
        frameBuffer += "<br>"
        this.gameContext.ui.updateFrame(frameBuffer)
    }

    displayTeam(combatantsArray) {
        let frameBuffer = ""
        let symbols = []
        let names = []
        let healthBars = []
        for (let combatant of combatantsArray) {
            const mapSquare = new MapSquare()
            mapSquare.setFGObject(combatant.fGThing)
            symbols.push(mapSquare.getHTML())
            names.push(Util.truncateStringAndPadTo(combatant.name, this.spriteWidth))
            healthBars.push(this.generateHealthBar(combatant.hp, combatant.maxHp))
        }
        frameBuffer += this.displayEvenlySpacedRow(healthBars, this.spriteWidth*combatantsArray.length)
        frameBuffer += this.displaySprites(combatantsArray)
        frameBuffer += this.displayEvenlySpacedRow(names, this.spriteWidth*combatantsArray.length)
        return frameBuffer
    }

    displayEvenlySpacedRow(textArray, printedChars = null) {
        let totalCharsOfText = 0
        if (printedChars === null) {
            for (let text of textArray) {
                totalCharsOfText += text.length
            }
        } else {
            totalCharsOfText = printedChars
        }
        const totalCharsOfWhitespace = gameContext.viewPortSize.x * 2 - 1 - totalCharsOfText
        let spacing = Math.floor(totalCharsOfWhitespace / (textArray.length + 1))
        let frameBuffer = ""
        for (let text of textArray) {
            frameBuffer += Util.htmlSpace().repeat(spacing) + text
        }
        frameBuffer += "<br/>"
        return frameBuffer
    }

    displaySprites(combatantsArray) {
        let buffer = ""
        for (let row=0; row<BattleSprite.getDimensions().y; row++) {
            const spriteRow = []
            for (let combatant of combatantsArray) {
                spriteRow.push(combatant.battleSprite.getRow(row))
            }
            buffer += this.displayEvenlySpacedRow(spriteRow, this.spriteWidth*combatantsArray.length)
        }
        return buffer
    }

}