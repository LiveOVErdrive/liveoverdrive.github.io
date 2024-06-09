// Warrior II Browser Game

// Global variables
playerX = 5
playerY = 5



class Color {
  constructor(r=0.5, g=0.5, b=0.5) {
    this.r = r
    this.g = g
    this.b = b
  }

  getHexCode() {
    const redHex = Math.min(Math.ceil(0xff * this.r), 0xff).toString(16)
    const greenHex = Math.min(Math.ceil(0xff * this.g), 0xff).toString(16)
    const blueHex = Math.min(Math.ceil(0xff * this.b), 0xff).toString(16)
    return "#" + redHex + greenHex + blueHex
  }

  multiply(otherColor) {
    return new Color(
      this.r * otherColor.r,
      this.g * otherColor.g,
      this.b * otherColor.b,
    )
  }

  add(otherColor) {
    return new Color(
      this.r + otherColor.r,
      this.g + otherColor.g,
      this.b + otherColor.b,
    )
  }
}

class FGThing {
  constructor(
    symbol = "@",
    color = new Color(1,1,1)
  ) {
    this.symbol = symbol
    this.color = color
  }
}

class MapSquare {
  constructor(
    symbol = ".",
    color = new Color(0.5, 0.5, 0.5),
    backgroundColor = new Color(0.0, 0.0, 0.0),
    light = new Color(1.0, 1.0, 1.0),
  ) {
    this.symbol = symbol
    this.color = color
    this.backgroundColor = backgroundColor
    this.light = light
  }

  copy(mapSquare) {
    return new MapSquare(this.symbol, this.color, this.backgroundColor, this.light)
  }

  addLight(additionalLight) {
    this.light.add(additionalLight)
  }

  setFGObject(fGThing) {
    this.symbol = fGThing.symbol
    this.color = fGThing.color
  }

  getHTML() {
    return '<span style="color: ' + this.color.multiply(this.light).getHexCode() +
           '; background-color: ' + this.backgroundColor.multiply(this.light).getHexCode() + '>'
           + this.symbol + '</span>'
  }
}



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
    player = new FGThing()
    floor = new MapSquare()
    playerSquare = floor.copy()
    playerSquare.setFGObject(player)

    framebuffer = ""
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        if (x == playerX && y == playerY) {
          //framebuffer += '<span style="color: white; background-color: darkgreen">@ </span>'
          framebuffer += playerSquare.getHTML()
        } else {
          //framebuffer += '<span style="color: black; background-color: darkgreen">. </span>'
          framebuffer += floor.getHTML()
        }
      }
      framebuffer += "<br/>"
    }
    pElement = document.getElementById('frame')
    pElement.innerHTML = framebuffer
}

