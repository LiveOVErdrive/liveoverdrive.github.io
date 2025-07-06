class Directions {
  static W = new XYCoord(-1,0)
  static E = new XYCoord(1,0)
  static N = new XYCoord(0,-1)
  static S = new XYCoord(0,1)
  static NW = this.N.plus(this.W)
  static NE = this.N.plus(this.E)
  static SW = this.S.plus(this.W)
  static SE = this.S.plus(this.E)
  static asList() {
    return [ W, E, N, S, NW, NE, SW, SE ]
  }
}