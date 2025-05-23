let gameData = {
  pollen: 0,
  pollenperclick: 1,
  honey: 0,
  honeyCost: 10,
  honeyValue: 5,
  money: 0,
  bees: 0,
  beeCost: 50,
  pollenPerBees: 0,
  queens: 0,
  queenCost: 500,
  queenMultiplier: 2,
}

function collectPollen() {
  gameData.pollen += gameData.pollenperclick
  document.getElementById("nbPollen").innerHTML = "Pollen: " + gameData.pollen
}

function makeHoney() {
  const maxHoney = Math.floor(gameData.pollen / gameData.honeyCost);
  if (maxHoney > 0) {
    gameData.pollen -= maxHoney * gameData.honeyCost;
    gameData.honey += maxHoney;

    document.getElementById("nbHoney").innerHTML = "Honey: " + gameData.honey;
    document.getElementById("nbPollen").innerHTML = "Pollen: " + gameData.pollen;
    logToConsole(`Made ${maxHoney} honey`);
  }
}


function sellHoney() {
  const maxSell = gameData.honey;
  if (maxSell > 0) {
    gameData.honey -= maxSell;
    gameData.money += maxSell * gameData.honeyValue;

    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("nbHoney").innerHTML = "Honey: " + gameData.honey;
    logToConsole(`Sold ${maxSell} honey`);
  }
}


function buyBee() {
  const maxBees = Math.floor(gameData.money / gameData.beeCost);
  if (maxBees > 0) {
    gameData.bees += maxBees;
    gameData.money -= maxBees * gameData.beeCost;
    recalculatePollenPerBees();

    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("bees").innerHTML = gameData.bees;
    logToConsole(`Bought ${maxBees} bee(s)`);
  }
}


function buyQueen() {
  const maxQueens = Math.floor(gameData.money / gameData.queenCost);
  if (maxQueens > 0) {
    gameData.queens += maxQueens;
    gameData.money -= maxQueens * gameData.queenCost;
    recalculatePollenPerBees();

    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("queens").innerHTML = gameData.queens;
    logToConsole(`Bought ${maxQueens} queen(s)`);
  }
}


function recalculatePollenPerBees() {
  gameData.pollenPerBees = gameData.bees * Math.pow(gameData.queenMultiplier, gameData.queens);
  document.getElementById("PollenPerSec").innerHTML = "Pollen Per Second: " + gameData.pollenPerBees;
}


setInterval(() => {
  gameData.pollen += gameData.pollenPerBees;
  document.getElementById("nbPollen").innerHTML = "Pollen: " + gameData.pollen;
}, 1000);

function saveGame() {
  localStorage.setItem("beekeepSave", JSON.stringify(gameData));
  logToConsole("Game saved");
}

setInterval(saveGame, 30000);

function loadGame() {
  const savedGame = localStorage.getItem("beekeepSave");
  if (savedGame) {
    gameData = JSON.parse(savedGame);

    document.getElementById("nbPollen").innerHTML = "Pollen: " + gameData.pollen;
    document.getElementById("nbHoney").innerHTML = "Honey: " + gameData.honey;
    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("bees").innerHTML = gameData.bees;
    document.getElementById("queens").innerHTML = gameData.queens;
    document.getElementById("PollenPerSec").innerHTML = "Pollen Per Second: " + gameData.pollenPerBees;
    logToConsole("Game loaded");
    recalculatePollenPerBees();
  }
}

loadGame();

function logToConsole(message) {
  const consoleDiv = document.getElementById("gameConsole");
  consoleDiv.innerHTML += `> ${message}<br />`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}
