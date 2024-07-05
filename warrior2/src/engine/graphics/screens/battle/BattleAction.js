class BattleAction {
    constructor (
        actor,
        move
    ) {
        this.actor = actor
        this.move = move
    }

    getSpeed() {
        return this.actor.speed + this.move.speed
    }

    execute() {
        this.move.execute()
    }
}