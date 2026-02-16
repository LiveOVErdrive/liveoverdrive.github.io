
class Emulator {
    constructor(screen, inputField, enterButton, basicFile) {
        // DOM elements representing the I/O hardware
        this.screen = screen
        this.inputField = inputField
        this.enterButton = enterButton

        // a string representation of the basic file. NOT the .8XP file.
        this.file = basicFile.split('\n')

        // records current position in the BASIC file
        this.pc = 0

        // flags whether the main run loop should continue to run
        this.run = false

        // Strings Str1-Str9
        this.strings = new Map()
        for(let i=1; i<=9; i++) {
            this.strings.set('Str' + i, '')
        }
        // Variables A-Z
        this.vars = new Map()
        for(let i='A'; i<='Z'; i++) {
            this.vars.set(i, 0)
        }

        enterButton().addEventListener("click", this.handleEnter)
    }

    runLoop() {
        while(this.run) {
            const line = file[pc]
            this.parseLine(line)
            this.pc = this.pc+=1
            if (this.pc >= (this.file.length))
                this.run = false
        }
    }

    parseLine(line) {
        if (line.startsWith("ClrHome"))
            console.log("ClrHome")
        else if (line.startsWith("Disp"))
            console.log("ClrHome")
        else
            console.log("command not implemented: " + line)
    }

    handleEnter() {
        this.run = true
        this.runLoop()
    }
}

/*
function runLoop() {
    while(run) {
        console.log("runloop lbl " + nextLabel)
        basicGame(nextLabel)
    }
}
function disableEnter() {
    enter().setAttribute("disabled", true)
}

function enableEnter() {
    enter().removeAttribute("disabled")
}

function clearInput() {
    inputField().value = null
}

function handleEnter() {
    disableEnter()
    if (isMenu) {
        const entry = inputField().value
        if (entry === null) {
            enableEnter()
            return
        }
        const entryLbl = menuMap.get(entry)
        if (entryLbl === null) {
            enableEnter()
            return
        }
        nextLabel = entryLbl
        isMenu = false
    } else if (isInput) {
        const entry = inputField().value
        if (entry === null) {
            enableEnter()
            return
        }
        inputVal = entry
        isInput = false
    }
    clearInput()
    run = true
    runLoop()
}

enter().addEventListener("click", handleEnter)
const space = "&nbsp"
const newline = "<br>"

function clrHome() {
    screen().innerHTML = ""
}

function disp(...texts) {
    texts.forEach(text => {
        const regex = / /g;
        const htmlSpaceString = ("" + text).replaceAll(regex, space)
        screen().innerHTML = screen().innerHTML + htmlSpaceString + newline
    })
}

function goto(lbl) {
    nextLabel = lbl
}

function pause(lbl) {
    run = false
    nextLabel = lbl
    enableEnter()
}

function menu(lbl, title, ...args) {
    clrHome()
    menuMap = new Map()
    disp(title)
    for (        this.i=0; i<args.length; i+=2) {
        const text = args[i]
        const entryLbl = args[i+1]
        const index = i/2+1
        menuMap.set(""+index, entryLbl)
        disp(index + ". " + text)
    }
    isMenu = true
    pause(lbl)
}

function input(lbl, title) {
    disp(title)
    pause(lbl)
}

function inputGet() {
    return inputVal
}

function randInt(low, high) {
    return Math.floor(Math.random()*(high-low+1))+low
}

function end() {
    run = false
    disableEnter()
}
*/