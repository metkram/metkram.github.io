class Game {
  constructor() {
    this.torus = new Torus();
    this.cells = [];
  }
  theCreationOfAdam(e) {
    document.querySelector("#rules").hidden = true;
    if (e.target.className == "empty-cell") this.cells.push(e.target.innerText.split(","));
    this.torus.updateCells(this.cells, "alive");
    // console.log(this.cells);
  }
  step() {
    this.torus.nextRound();
    setTimeout(() => this.step(), 100);
    // console.log(new Date());
  }
}

class Torus {
  constructor() {
    this.gridOnPage();
    this.blocks = document.body.querySelectorAll(".empty-cell");
    this.cellsArray = this.newCellsArray();
  }
  get x() {
    return Math.floor(document.body.clientWidth / 12);
  }
  get y() {
    return Math.floor(document.body.clientHeight / 12);
  }
  newCellsArray() {
    let cells = [];
    for (let i = 0; i < this.y; i++) {
      for (let u = 0; u < this.x; u++) {
        let cell = {};
        cell.x = i;
        cell.y = u;
        cell.alive = false;
        cells.push(cell);
      }
    }
    return cells;
  }
  gridOnPage() {
    for (let i = 0; i < this.y; i++) {
      let line = document.createElement("div");
      line.className = "cell-line";
      for (let u = 0; u < this.x; u++) {
        let cell = document.createElement("div");
        cell.className = "empty-cell";
        cell.innerText = i + "," + u;
        line.append(cell);
      }
      document.body.append(line);
    }
    let rules = document.createElement("div");
    rules.id = "rules";
    rules.innerText = "Click on 15 random cells";
    document.body.append(rules);
  }
  renderMatrix() {
    for (let cell of this.cellsArray) {
      if (cell.alive) {
        this.blocks[cell.x * this.x + cell.y].classList.add("alive-cell");
      } else {
        this.blocks[cell.x * this.x + cell.y].className = "empty-cell";
      }
    }
  }
  updateCells(cells, status) {
    switch (status) {
      case "dead":
        for (let cell of cells) {
          this.cellsArray.find(item => item.x == cell[0] && item.y == cell[1]).alive = false;
        }
        break;
      case "alive":
        for (let cell of cells) {
          this.cellsArray.find(item => item.x == cell[0] && item.y == cell[1]).alive = true;
        }
        break;
    }
    this.renderMatrix();
  }
  getNeighbors(x, y) {
    let neighbors = [[x, y - 1], [x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1], [x + 1, y], [x + 1, y - 1]];
    return neighbors.filter(item => item[0] > -1 && item[1] > -1 && item[0] < this.y && item[1] < this.x);
  }
  nextRound() {
    let alive = [];
    let dead = [];
    for (let cell of this.cellsArray) {
      let count = 0;
      for (let neighbor of this.getNeighbors(cell.x, cell.y)) {
        if (this.cellsArray.find(item => item.x == neighbor[0] && item.y == neighbor[1]).alive) count++;
      }
      if (count == 3 && !cell.alive) {
        alive.push([cell.x, cell.y]);
      } else if ((count < 2 || count > 3) && cell.alive) {
        dead.push([cell.x, cell.y]);
      }
    }
    this.updateCells(alive, "alive");
    this.updateCells(dead, "dead");
  }
}

let newLife = new Game();
let add = function(e) {
  newLife.theCreationOfAdam(e);
  if (newLife.cells.length > 15) {
    newLife.step();
    document.removeEventListener("click", add);
  }
}
document.addEventListener("click", add);
