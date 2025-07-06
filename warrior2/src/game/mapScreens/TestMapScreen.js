class TestMapScreen extends MapScreen {
    constructor(gameContext) {
        const mapString = MapGenerator.generateTestMap()
        const gameMap = GameMap.createFromMapString(mapString)
        gameMap.addActorAt(gameContext.player, new XYCoord(2, 2))
        gameMap.addActorAt(new Actor(), new XYCoord(4, 4))
        super(gameContext, gameMap)
    }

}