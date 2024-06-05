// Warrior II Browser Game

// Global variables
playerX = 5
playerY = 5

// Startup:
paintMap()

// Game Loop: ticks on a keypress
document.onkeypress = function (e) {
    e = e || window.event;
    key = e.keyCode

    if (key == 97) {
        playerX -= 1
    } else if (key == 100) {
        playerX += 1
    } else if (key == 119) {
        playerY -= 1
    } else if (key == 120) {
        playerY += 1
    } else if (key == 113) {
        playerY -= 1
        playerX -= 1
    } else if (key == 101) {
        playerX += 1
        playerY -= 1
    } else if (key == 122) {
        playerX -= 1
        playerY += 1
    } else if (key == 99) {
        playerX += 1
        playerY += 1
    }

    paintMap()
};

function paintMap() {
    framebuffer = ""
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        if (x == playerX && y == playerY) {
          framebuffer += '<span style="color: red; background-color: green">@ </span>'
        } else {
          framebuffer += '<span style="color: black; background-color: green">. </span>'
        }
      }
      framebuffer += "<br/>"
    }
    pElement = document.getElementById('frame')
    pElement.innerHTML = framebuffer
}



