const startButton = () => document.getElementById("startbutton")
const stopButton = () => document.getElementById("stopbutton")
const bpmField = () => document.getElementById("bpm")
const measureField = () => document.getElementById("measure")
const title = () => document.getElementById("title")
let titleHue = 0

stopButton().setAttribute('disabled', true)
bpmField().value = 120
measureField().value = 4


function bumpTitleColor(amount) {
    titleHue = titleHue + amount
    title().style.color = 'hsl(' + titleHue + ',100%, 50%)'
}

class SoundPool {
    constructor(poolSize, soundFile) {
        this.pool = []
        for (let i=0; i<=poolSize; i++) {
            this.pool.push(new Audio(soundFile))
        }
        this.index = 0
    }

    play() {
        this.pool[this.index].play()
        this.index = (this.index+1)%(this.pool.length)
    }
}

class Metro {
    constructor(bpMinute, bpMeasure) {
        this.bpMinute = bpMinute
        this.bpMeasure = bpMeasure
        const poolSize = bpMinute/40
        this.beatPool = new SoundPool(poolSize, './block-2.mp3')
        this.measurePool = new SoundPool(poolSize, './block-1.mp3')
        this.measureBeat = 0
    }

    tick() {
        if (this.measureBeat == 0) {
            this.measurePool.play()
            bumpTitleColor(100)
        } else {
            this.beatPool.play()
            bumpTitleColor(29)
        }
        this.measureBeat = (this.measureBeat+1)%this.bpMeasure
    }
}

let interval = null

function startNome() {
    const bpm = bpmField().value
    const bpMeasure = measureField().value
    const metro = new Metro(bpm, bpMeasure)
    startButton().setAttribute('disabled', true)
    stopButton().removeAttribute('disabled')
    interval = setInterval(() => metro.tick(), 60000/bpm)
}

function stopNome() {
    startButton().removeAttribute('disabled')
    stopButton().setAttribute('disabled', true)
    clearInterval(interval)
    title().style.color = 'black'
}

startButton().addEventListener("click", startNome)
stopButton().addEventListener("click", stopNome)


