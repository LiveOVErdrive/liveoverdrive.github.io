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
    "Agumon",
    "Garurumon",
    "Greymon",
    "Gatomon",
    "Angemon",
    "Angewomon",
    "Wizardmon",
    "Leomon",
    "Beelzemon",
    "Wolf",
    "Trunks",
    "Goku",
    "Vegeta",
    "Freiza",
    "Bulma",
    "Android 18",
    "Krillin",
    "Gohan",
    "Mug",
    "Goofy",
    "Scooby Doo",
    "Shaggy",
    "Velma",
    "Fred",
    "Daphne",
    "Dragon",
    "Flygon",
    "Bulbasaur",
    "Venusaur",
    "Snorlax",
    "Greninja",
    "Pikachu",
    "Mewtwo",
    "Goofy",
    "Gumby",
    "Zombie",
    "Gandalf",
    "Frodo",
    "Grover",
    "Cookie Monster",
    "Animal",
    "Yoda",
    "Link",
    "Zelda",
    "Ganondorf",
    "lawyer",
    "salaryman",
    "Queen",
    "King",
    "Knight",
    "Devil",
    "Dean Winchester",
    "Castiel",
    "Football Player",
    "Sandwich",
    "Wine Aunt",
    "Caillou",
    "Spheal",
    "Grinch",
    "Onceler",
    "Lorax",
    "Willy Wonka",
    "Charlie the Unicorn",
    "Story from North America",
    "Smurf",
    "Homestar",
    "StrongBad",
    "Ghost",
    "Pokemon",
    "Barbie",
    "Mech",
    "Kaiju",
    "Cowboy",
    "Astarion",
    "Gale",
    "Karlach",
    "Shadowheart",
    "Lae'zel",
    "Capybara",
    "Hyena",
    "Elephant",
    "Miss Piggy",
    "Poop Emoji",
    "Seinfeld",
    "George Costanza",
    "Kramer",
    "Niles",
    "Frasier",
    "Homer Simpson",
    "Bart Simpson",
    "Marge Simpson",
    "Peter Griffin",
    "Brian Griffin",
    "Bob Belcher",
]

const beforeAdjectives = [
    "flat",
    "anime",
    "elven",
    "smooth",
    "buff",
    "SFW",
    "Jojo's Bizarre",
    "salaryman",
    "colossal",
    "evil",
    "small",
    "big",
    "Sir",
    "Jacob-",
    "sugar free",
    "Nuesday",
    "sad",
    "haunted",
    "icky",
    "oily",
    "stinky",
    "dangerous",
    "cat",
    "magical girl",
    "The Loathesome",
    "mechanical",
    "cheesy five-layer",
    "epic",
    "construction worker",
    "Final Fantasy",
    "cursed",
    "Michigan J.",
    "girlfail",
    "kaiju",
    "boyfail",
    "Twitch streamer",
    "influencer",
    "Pope",
    "Super-",
    "undead",
    "scared",
    "bodybuilder",
    "shaved",
    "were-",
    "soft alpha",
    "untenable",
    "silly",
    "yassified",
    "Clip Studio",
    "cozy",
    "tired",
    "divorced dad",
    "bumpy",
    "incorporeal",
    "noble",
    "classic",
    "hairy",
    "spikey",
    "grandiose",
    "opera",
    "friendly",
    "chibi",
    "foul",
    "ghost",
    "golden",
    "silver",
    "old",
    "antique",
    "chef",
    "Ratatouille",
    "dehydrated",
    "satiated",
    "calm",
    "stoner",
    "wired",
    "nervous",
    "weird",
    "necromancer",
    "odd",
    "keyhole",
    "Family Guy",




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
    "and Toad",
    ", Esquire",
    "-field",
    "in mortal peril",
    "the Frog",
    "Beastars",
    "from Mario",
    "with cheese",
    "but good",
    "but worse",
    "with a beard",
    "-Doo",
    "Pro",
    "-hunter",
    "GX",
    ", Ace Attorney"
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