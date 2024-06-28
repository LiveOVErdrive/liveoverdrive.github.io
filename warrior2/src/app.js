// Warrior II Browser Game

// Global Context
gameContext = new GameContext()

// Startup:
const testMapScreen = new TestMapScreen(gameContext)
const battleScreen = new BattleScreen(gameContext)
let currentScreen = battleScreen
currentScreen.updateDisplay()

// Game Loop: ticks on a keypress
document.onkeypress = function (e) {
    e = e || window.event;
    const keyCode = e.code
    currentScreen.handleKeyPress(keyCode)
};
