/** represents an RGB color **/
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

