class XYCoord {
  constructor(x,y) {
    this.setXY(x,y)
  }

  setXY(x,y) {
    this.x = x
    this.y = y
  }

  set(xYCoord) {
    this.setXY(xYCoord.x, xYCoord.y)
  }

  equals(xYCoord) {
    return (this.x == xYCoord.x && this.y == xYCoord.y)
  }

  plus(xYCoord) {
    return new XYCoord(this.x + xYCoord.x, this.y + xYCoord.y)
  }

  static copyFrom(xYCoord) {
    return new XYCoord(xYCoord.x, xYCoord.y)
  }
}