const screen = () => document.getElementById("screen")
const inputField = () => document.getElementById("in")
const enter = () => document.getElementById("enter")

const emulator = new Emulator(screen, inputField, enter, warriorBasic)