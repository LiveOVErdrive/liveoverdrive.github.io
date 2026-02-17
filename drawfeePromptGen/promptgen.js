const genButton = () => document.getElementById("generatebutton")
const promptDisplay = () => document.getElementById("prompt")

const nouns = [
    "snakes",
    "dog",
    "vampire",
    "moose",
    "Donkey Kong",
    "Mario",
    "Lucario",
    "Johnny Bravo",
    "Augie Doggy",
]

const beforeAdjectives = [
    "flat",
    "smooth",
    "buff",
    "sfw",
    "Jojo's Bizarre",
    "evil",
    "small",
    "big",
    "Jacob",
    "Newsday",
    "sad",
    "haunted",
    "icky",
    "oily",
    "stinky",
    "dangerous"
]

const afterAdjectives = [
    "with legs",
    "gajinka",
    "fursona",
    "from memory",
    "vs. boobs",
    "and Doggy Daddy",
    "full of vampires",
]

function addPrefix(input) {
    let index = Math.floor(Math.random() * (beforeAdjectives.length))
    return beforeAdjectives[index] + ' ' + input
}

function addSuffix(input) {
    let index = Math.floor(Math.random() * (afterAdjectives.length))
    return input + ' ' + afterAdjectives[index] 
}

function setPromptColor(amount) {
    let hue = Math.floor(Math.random() * 255)
    promptDisplay().style.color = 'hsl(' + hue + ',100%, 40%)'
}

function addAdjective(input) {
    if ((Math.floor(Math.random() * (afterAdjectives.length + beforeAdjectives.length))) < beforeAdjectives.length) {
        return addPrefix(input)
    } else {
        return addSuffix(input)
    }
}

function generate() {
    let nounIndex = Math.floor(Math.random() * (nouns.length))
    var prompt = nouns[nounIndex]

    let maxAdjectives = 4

    let rand = Math.random()
    let weightedRand = Math.pow(rand, 6)
    let scaledRand = weightedRand * maxAdjectives
    let numberOfAdjectives = Math.floor(scaledRand)

    for (let i = 0; i<=numberOfAdjectives; i++) {
        prompt = addAdjective(prompt)
    }

    setPromptColor()
    promptDisplay().textContent = prompt
}

genButton().addEventListener("click", generate)