// VIRTUAL - this should be extended for each move
class BattleMove {
    constructor (
        name,
        speed,
        description,
        baseAccy = 0.75,
        maxTargets = 1,
        targetsMustBeAdjacent = true,
        shouldTargetEnemies = true,
        shouldTargetAllies = false
        ) {
        this.name = name
        this.speed = speed
        this.description = description
        this.maxTargets = maxTargets
        this.targetsMustBeAdjacent = targetsMustBeAdjacent
        this.source = null
        this.targets = null
        this.isDoneExecuting = true
    }

    static maxAccy = 0.95

    prepare (source, targets) {
        this.source = source
        this.targets = targets
        this.isDoneExecuting = false
    }

    // virtual. Should execute the move and return a string that summarizes what happened.
    // This can span multiple game input loops. set "isDoneExecuting" when done.
    execute() {
        console.error("execute() not implemented for this BattleMove subclass.")
        this.isDoneExecuting = true
        return "nothing happens because this BattleMove isn't implemented yet."

    }

    getMaxTargets() { return this.maxTargets}
    getTargetsMustBeAdjacent() { return this.targetsMustBeAdjacent}
    isDoneExecuting() { return this.isDoneExecuting}

    testHit(target) {
        // compute accy based on the move, and the speeds of the parties involved. Capped at maxAccy.
        const toHit = Math.min(baseAccy * this.source.speed / target.speed, BattleMove.maxAccy)
        return (Math.random() <= toHit)
    }
}