
const upLeftButton = () => document.getElementById("upleft")
const upButton = () => document.getElementById("up")
const upRightButton = () => document.getElementById("upright")
const leftButton = () => document.getElementById("left")
const middleButton = () => document.getElementById("middle")
const rightButton = () => document.getElementById("right")
const downLeftButton = () => document.getElementById("downleft")
const downButton = () => document.getElementById("down")
const downRightButton = () => document.getElementById("downright")
const mapView = () => document.getElementById("mapview")

const room = new Room()
mapView().innerHTML = room.toHTMLString();

function handleMovement(x,y) {
    room.attemptMove(x,y)
    mapView().innerHTML = room.toHTMLString();
}

function handleUpLeft() {
    handleMovement(-1,-1)
}
function handleUp() {
    handleMovement(0,-1)
}
function handleUpRight() {
    handleMovement(1,-1)
}
function handleLeft() {
    handleMovement(-1,0)
}
function handleMiddle() {
    handleMovement(0,0)
}
function handleRight() {
    handleMovement(1,0)
}
function handleDownLeft() {
    handleMovement(-1,1)
}
function handleDown() {
    handleMovement(0,1)
}
function handleDownRight() {
    handleMovement(1,1)
}



upLeftButton().addEventListener("click", handleUpLeft)
upButton().addEventListener("click", handleUp)
upRightButton().addEventListener("click", handleUpRight)
leftButton().addEventListener("click", handleLeft)
middleButton().addEventListener("click", handleMiddle)
rightButton().addEventListener("click", handleRight)
downLeftButton().addEventListener("click", handleDownLeft)
downButton().addEventListener("click", handleDown)
downRightButton().addEventListener("click", handleDownRight)