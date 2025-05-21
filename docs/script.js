let pollen = 0;
let honey = 0;
let money = 0;
let bees = 0;

function updateUI() {
  document.getElementById("pollen").innerText = pollen;
  document.getElementById("honey").innerText = honey;
  document.getElementById("money").innerText = money;
  document.getElementById("bees").innerText = bees;
}

function collectPollen() {
  pollen++;
  updateUI();
}

function makeHoney() {
  if (pollen >= 10) {
    let batches = Math.floor(pollen / 10);
    pollen -= batches * 10;
    honey += batches;
    updateUI();
  } else {
  }
}

function sellHoney() {
  if (honey > 0) {
    money += honey * 5;
    honey = 0;
    updateUI();
  } else {
  }
}

function buyBee() {
  if (money >= 50) {
    money -= 50;
    bees++;
    updateUI();
  } else {
  }
}

setInterval(() => {
  pollen += bees;
  updateUI();
}, 2000);