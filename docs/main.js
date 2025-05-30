class Game {
  constructor() {
    this.data = {
      pollen: 0,
      pollenperclick: 1,
      honey: 0,
      honeyCost: 15,
      honeyValue: 3,
      marketingLevel: 0,
      marketingCost: 150,
      marketingCostGrowth: 1.8,
      money: 0,
      bees: 0,
      beeCost: 75,
      beeCostGrowth: 1.3,
      pollenPerBees: 0,
      queens: 0,
      queenCost: 750,
      queenCostGrowth: 1.45,
      queenMultiplier: 1.5,
    };

    this.initializeGame();
  }

  initializeGame() {
    document.getElementById("collectPollenButton")?.addEventListener("click", () => this.collectPollen());
    document.getElementById("makeHoneyButton")?.addEventListener("click", () => this.makeHoney());
    document.getElementById("sellHoneyButton")?.addEventListener("click", () => this.sellHoney());
    document.getElementById("marketingButton")?.addEventListener("click", () => this.makeMarketing());
    document.getElementById("buyBeeButton")?.addEventListener("click", () => this.buyBee());
    document.getElementById("buyQueenButton")?.addEventListener("click", () => this.buyQueen());

    setInterval(() => this.autoCollectPollen(), 1000);
    setInterval(() => this.saveGame(), 30000);

    this.loadGame();
  }

  collectPollen() {
    this.data.pollen += this.data.pollenperclick;
    this.updateDisplay();
  }

  makeHoney() {
    const maxHoney = Math.floor(this.data.pollen / this.data.honeyCost);
    if (maxHoney > 0) {
      this.data.pollen -= maxHoney * this.data.honeyCost;
      this.data.honey += maxHoney;
      this.updateDisplay();
      this.logToConsole(`Made ${maxHoney} honey`);
    }
  }

  sellHoney() {
    const maxSell = this.data.honey;
    if (maxSell > 0) {
      this.data.honey -= maxSell;
      this.data.money += maxSell * this.data.honeyValue;
      this.updateDisplay();
      this.logToConsole(`Sold ${maxSell} honey`);
    }
  }

  makeMarketing() {
    if (this.data.money >= this.data.marketingCost) {
      this.data.money -= this.data.marketingCost;
      this.data.marketingLevel += 1;
      this.data.honeyValue += 0.5;
      this.data.marketingCost = Math.ceil(this.data.marketingCost * this.data.marketingCostGrowth);
      this.updateDisplay();
      this.logToConsole(`Invested in marketing. Honey now sells for $${this.formatNumber(this.data.honeyValue)}`);
    }
  }

  buyBee() {
    if (this.data.money >= this.data.beeCost) {
      this.data.money -= this.data.beeCost;
      this.data.bees += 1;
      this.data.pollenPerBees += 1;
      this.data.beeCost = Math.floor(this.data.beeCost * this.data.beeCostGrowth);
      this.recalculatePollenPerBees();
      this.updateDisplay();
      this.logToConsole("Bought a bee");
    }
  }

  buyQueen() {
    if (this.data.money >= this.data.queenCost) {
      this.data.money -= this.data.queenCost;
      this.data.queens += 1;
      this.data.queenCost = Math.floor(this.data.queenCost * this.data.queenCostGrowth);
      this.recalculatePollenPerBees();
      this.updateDisplay();
      this.logToConsole("Bought a queen");
    }
  }

  recalculatePollenPerBees() {
    this.data.pollenPerBees = this.data.bees * (1 + (this.data.queens * 0.5));
    this.updateDisplay();
  }

  autoCollectPollen() {
    this.data.pollen += this.data.pollenPerBees;
    this.updateDisplay();
  }

  saveGame() {
    localStorage.setItem("beekeepSave", JSON.stringify(this.data));
  }

  loadGame() {
    const savedGame = localStorage.getItem("beekeepSave");
    if (savedGame) {
      this.data = JSON.parse(savedGame);
      this.recalculatePollenPerBees();
      this.updateDisplay();
      this.logToConsole("Game loaded");
    }
  }

  updateDisplay() {
    document.getElementById("nbPollen").innerHTML = "Pollen: " + this.formatNumber(this.data.pollen);
    document.getElementById("nbHoney").innerHTML = "Honey: " + this.formatNumber(this.data.honey);
    document.getElementById("nbMoney").innerHTML = "Money: $" + this.formatNumber(this.data.money);
    document.getElementById("bees").innerHTML = this.data.bees;
    document.getElementById("queens").innerHTML = this.data.queens;
    document.getElementById("PollenPerSec").innerHTML = "Pollen Per Second: " + this.formatNumber(this.data.pollenPerBees);
    document.getElementById("marketingLevel").innerHTML = "Level: " + this.data.marketingLevel;
    document.getElementById("honeyValue").innerHTML = "Price per honey: $" + this.formatNumber(this.data.honeyValue);
    document.getElementById("marketingCost").innerHTML = "Cost: $" + this.formatNumber(this.data.marketingCost);
    document.getElementById("beeCost").innerHTML = "Cost: $" + this.formatNumber(this.data.beeCost);
    document.getElementById("queenCost").innerHTML = "Cost: $" + this.formatNumber(this.data.queenCost);
  }

  logToConsole(message) {
    const consoleDiv = document.getElementById("gameConsole");
    consoleDiv.innerHTML += `> ${message}<br />`;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  }

  formatNumber(num) {
    if (num < 1000) return num;
    const units = ['K', 'M', 'B', 'T'];
    const order = Math.floor(Math.log10(num) / 3);
    const unitName = units[order - 1];
    const value = num / Math.pow(1000, order);
    return value.toFixed(1) + unitName;
  }
}

const game = new Game();