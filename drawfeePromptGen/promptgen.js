const genButton = () => document.getElementById("generatebutton")
const nounDisplay = () => document.getElementById("noun")
const prefixDisplay = () => document.getElementById("prefix")
const suffixDisplay = () => document.getElementById("suffix")

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
    "Joey Wheeler",
    "Yugi",
    "Seto Kaiba",
    "Mai Valentine",
    "Yogi",
    "Jacob",
    "Julia",
    "Nathan",
    "Karina",
    "Shrek",
    "Garfield",
    "Odie",
    "Donkey",
    "Jotaro",
    "Ryunosuke Naruhodo",
    "Ryu",
    "Ken",
    "Jimmy",
    "Frog",
    "Crab",
    "Goblin",
    "ChillChuck",
    "Laios",
    "Marcille",
    "Goofy",
    "Todd",
    "Possum",
    "Raymond",
    "Michael",
    "Mickey",
    "Kermit",
    "Elmo",
    "Adam Skate The Infinity",
    "Legoshi",
]

const beforeAdjectives = [
    "flat",
    "smooth",
    "buff",
    "SFW",
    "Jojo's Bizarre",
    "evil",
    "small",
    "big",
    "Jacob",
    "Nuesday",
    "sad",
    "haunted",
    "icky",
    "oily",
    "stinky",
    "dangerous",
    "cat",
    "magical girl",
    "cheesy five-layer",
    "epic",
    "Final Fantasy",
    "cursed",
    "Michigan J.",
    "girlfail",
    "boyfail",
    "Twitch streamer",
    "influencer",
    "Pope",
    "undead",
    "scared",
    "bodybuilder",
    "shaved",
]

const afterAdjectives = [
    "with legs",
    "gajinka",
    "fursona",
    "from memory",
    "vs. boobs",
    "and Doggy Daddy",
    "full of vampires",
    "catboy",
    "made from cheese",
    "Animal Crossing",
    "The Second",
    ", Esquire",
    "-field",
    "in mortal peril",
    "Beastars",
    "from Mario",
    "with cheese",
    "but good",
    "but worse",
    "with a beard",
]

function addPrefix(input) {
    let index = Math.floor(Math.random() * (beforeAdjectives.length))
    return input + ' ' + beforeAdjectives[index] 
}

function addSuffix(input) {
    let index = Math.floor(Math.random() * (afterAdjectives.length))
    return input + ' ' + afterAdjectives[index] 
}

function setPromptColor(amount) {
    let huePre = Math.floor(Math.random() * 255)
    prefixDisplay().style.color = 'hsl(' + huePre + ',100%, 40%)'
    let hueSuf = Math.floor(Math.random() * 255)
    suffixDisplay().style.color = 'hsl(' + hueSuf + ',100%, 40%)'
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
    var noun = nouns[nounIndex]
    var prefix = ""
    var suffix = ""

    let maxAdjectives = 3

    let rand = Math.random()
    let weightedRand = Math.pow(rand, 6)
    let scaledRand = weightedRand * maxAdjectives
    let numberOfAdjectives = Math.floor(scaledRand)

    for (let i = 0; i<=numberOfAdjectives; i++) {
        if ((Math.floor(Math.random() * (afterAdjectives.length + beforeAdjectives.length))) < beforeAdjectives.length) {
            prefix = addPrefix(prefix)
        } else {
            suffix = addSuffix(suffix)
        }
    }

    setPromptColor()
    nounDisplay().textContent = noun
    prefixDisplay().textContent = prefix
    suffixDisplay().textContent = suffix
}

genButton().addEventListener("click", generate)