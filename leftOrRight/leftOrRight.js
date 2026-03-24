const display = () => document.getElementById("lorr")

const left = "← Left"
const right = "Right →"

const msPerWeek = 1000*60*60*24*7

const week = Math.floor(Date.now()/msPerWeek)

var text = right
if (week%2 == 1) {
    text = left
}

display().textContent = text
