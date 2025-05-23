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
}

function collectPollen() {
  gameData.pollen += gameData.pollenperclick
  document.getElementById("nbPollen").innerHTML = "Pollen: " + gameData.pollen
}

function makeHoney() {
  if (gameData.pollen >= gameData.honeyCost) {
    gameData.pollen -= gameData.honeyCost
    gameData.honey += 1
    document.getElementById("nbHoney").innerHTML = "Honey: " + gameData.honey
    document.getElementById("nbPollen").innerHTML = "Pollen: " + gameData.pollen
    logToConsole("Made honey");
  }
}

function sellHoney() {
  if (gameData.honey >= 1) {
    gameData.honey -= 1
    gameData.money += gameData.honeyValue
    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money
    document.getElementById("nbHoney").innerHTML = "Honey: " + gameData.honey
    logToConsole("Sold honey");
  }
}

function buyBee() {
  if (gameData.money >= gameData.beeCost) {
    gameData.money -= gameData.beeCost
    gameData.bees += 1
    gameData.pollenPerBees += 1
    document.getElementById("nbMoney").innerHTML = "Money: $" + gameData.money;
    document.getElementById("bees").innerHTML = gameData.bees;
    document.getElementById("PollenPerSec").innerHTML = "Pollen Per Second: " + gameData.pollenPerBees;
    logToConsole("Bought a bee");
  }
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
    document.getElementById("PollenPerSec").innerHTML = "Pollen Per Second: " + gameData.pollenPerBees;
    logToConsole("Game loaded");
  }
}

loadGame();

function logToConsole(message) {
  const consoleDiv = document.getElementById("gameConsole");
  const timestamp = new Date().toLocaleTimeString();
  consoleDiv.innerHTML += `> ${message}<br />`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}
