let gameData = {
  pollen: 0,
  pollenperclick: 1,
  honey: 0,
  honeyCost: 10,
  honeyValue: 5,
  marketingLevel: 0,
  marketingCost: 100,
  marketingCostGrowth: 1.5,
  money: 0,
  bees: 0,
  beeCost: 50,
  beeCostGrowth: 1.15,
  pollenPerBees: 0,
  queens: 0,
  queenCost: 500,
  queenCostGrowth: 1.25,
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

function makeMarketing() {
  if (gameData.money >= gameData.marketingCost) {
    gameData.money -= gameData.marketingCost;
    gameData.marketingLevel += 1;
    gameData.honeyValue += 1;
    gameData.marketingCost = Math.ceil(gameData.marketingCost * gameData.marketingCostGrowth);

    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("honeyValue").innerHTML = "Price per honey: $" + gameData.honeyValue;
    document.getElementById("marketingLevel").innerHTML = "Level: " + gameData.marketingLevel;
    document.getElementById("marketingCost").innerHTML = "Cost: $" + gameData.marketingCost;
    logToConsole(`Invested in marketing. Honey now sells for $${gameData.honeyValue}`);
  }
}


function buyBee() {
  if (gameData.money >= gameData.beeCost) {
    gameData.money -= gameData.beeCost
    gameData.bees += 1
    gameData.pollenPerBees += 1
    gameData.beeCost = Math.floor(gameData.beeCost * gameData.beeCostGrowth)
    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("bees").innerHTML = gameData.bees;
    document.getElementById("PollenPerSec").innerHTML = "Pollen Per Second: " + gameData.pollenPerBees;
    document.getElementById("beeCost").innerHTML = "Cost: $" + gameData.beeCost;
    logToConsole("Bought a bee");
  }
}


function buyQueen() {
  if (gameData.money >= gameData.queenCost) {
    gameData.money -= gameData.queenCost;
    gameData.queens += 1;
    gameData.queenCost = Math.floor(gameData.queenCost * gameData.queenCostGrowth);
    recalculatePollenPerBees();
    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("queens").innerHTML = gameData.queens;
    document.getElementById("queenCost").innerHTML = "Cost: $" + gameData.queenCost;
    logToConsole("Bought a queen");
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
