class Tiles {
    static blankSquare = new MapSquare(".", Colors.black, Colors.black, Colors.black, false)
    static caveWall = new MapSquare("#", Colors.lightGray, Colors.gray, Colors.white, false)
    static caveFloor = new MapSquare(".", Colors.gray, Colors.darkBrown)
    static road = new MapSquare(".", Colors.lightBrown, Colors.brown)
    static grass = new MapSquare("\"", Colors.lightGreen, Colors.green)
}
