const screen = () => document.getElementById("screen")
const inputField = () => document.getElementById("in")
const enter = () => document.getElementById("enter")

// state
let run = true
let nextLabel = null
let isMenu = false
let isInput = false
let menuMap = null
let inputVal = null

let Str1
let A
let B
let C
let D
let E
let F
let G
let H
let I
let J
let K
let L
let M
let N
let O
let P
let Q
let R
let S
let T
let U
let V
let W
let X
let Y
let Z

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

function handleEnter() {
    disableEnter()
    if (isMenu) {
        const entry = inputField().value
        console.log(entry)
        if (entry === null) {
            enableEnter()
            return
        }
        inputField().value = null
        const entryLbl = menuMap.get(entry)
        console.log(entryLbl)
        if (entryLbl === null) {
            enableEnter()
            return
        }
        nextLabel = entryLbl
        isMenu = false
    } else if (isInput) {
        const entry = inputField().value
        inputField().value = null
        if (entry === null) {
            enableEnter()
            return
        }
        inputVal = entry
        isInput = false
    }
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

function pause(lbl) {
    run = false
    nextLabel = lbl
    enableEnter()
}

function menu(lbl, title, ...args) {
    clrHome()
    menuMap = new Map()
    disp(title)
    for (let i=0; i<args.length; i+=2) {
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
