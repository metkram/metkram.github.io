class Game {
  constructor() {
    this.snake = new Snake();
    this.field = new Field();
    this.food = new Food(this.snake.snakeCoordinates);
    document.body.append(this.field.field);
    this.field.fieldRender(this.snake.snakeCoordinates, this.food.position);
    setInterval(() => this.step(), 500);
  }

  step() {
    // randomDiv[this.snakeCoordinates[1][1] * 10 + this.snakeCoordinates[1][0]].className = "block";
    //this.blocks[this.snakeCoordinates[this.snakeCoordinates.length - 1][1] * 10 + this.snakeCoordinates[this.snakeCoordinates.length - 1][0]].className = "empty-block";
    //corner turn
    // if (this.snakeCoordinates[0][0] == 0 && this.snakeCoordinates[0][1] == 0) {
    //   this.direction = [1, 0];
    // } else if (this.snakeCoordinates[0][0] == 9 && this.snakeCoordinates[0][1] == 0) {
    //   this.direction = [0, 1];
    // } else if (this.snakeCoordinates[0][0] == 9 && this.snakeCoordinates[0][1] == 9) {
    //   this.direction = [-1, 0];
    // } else if (this.snakeCoordinates[0][0] == 0 && this.snakeCoordinates[0][1] == 9) {
    //   this.direction = [0, -1];
    // }

    //move all coordinates
    for (let i = this.snake.snakeCoordinates.length - 1; i > 0 ; i--) {
      this.snake.snakeCoordinates[i][0] = this.snake.snakeCoordinates[i - 1][0];
      this.snake.snakeCoordinates[i][1] = this.snake.snakeCoordinates[i - 1][1];
      // console.log(this.snakeCoordinates[i][0], this.snakeCoordinates[i][1]);
    }
    // console.log("");
    this.snake.snakeCoordinates[0][0] += this.snake.direction[0];
    this.snake.snakeCoordinates[0][1] += this.snake.direction[1];
    //hit the tail
    for (let i = 1; i < this.snake.snakeCoordinates.length; i++) {
      if (this.snake.snakeCoordinates[0][0] == this.snake.snakeCoordinates[i][0] && this.snake.snakeCoordinates[0][1] == this.snake.snakeCoordinates[i][1]) {
        alert("hit the tail");
        this.snake.direction = [0, -1];
        this.snake.snakeCoordinates = [[0, 5], [0, 6], [0, 7], [1, 7], [1, 8]];
        this.food = new Food(this.snake.snakeCoordinates);
      }
    }
    //teleport move
    if (this.snake.snakeCoordinates[0][0] == -1) {
      this.snake.snakeCoordinates[0][0] = 9;
    }
    if (this.snake.snakeCoordinates[0][0] == 10) {
      this.snake.snakeCoordinates[0][0] = 0;
    }
    if (this.snake.snakeCoordinates[0][1] == 10) {
      this.snake.snakeCoordinates[0][1] = 0;
    }
    if (this.snake.snakeCoordinates[0][1] == -1) {
      this.snake.snakeCoordinates[0][1] = 9;
    }
    this.field.fieldRender(this.snake.snakeCoordinates, this.food.position);
    //eat food
    if (this.snake.snakeCoordinates[0][0] == this.food.position[0] && this.snake.snakeCoordinates[0][1] == this.food.position[1]) {
      this.eatFood();
    }

    // if (this.snake.snakeCoordinates[0][0] == this.food.position[0] && this.snake.snakeCoordinates[0][1] == this.food.position[1]) {
    //   this.snake.snakeCoordinates = this.snake.snakeCoordinates.concat([this.food.position]);
    //   this.food = new Food(this.snake.snakeCoordinates);
    //   //this.snakeCoordinates.push(this.snakeCoordinates[this.snakeCoordinates.length - 1]);
    //   // console.log(this.snake.snakeCoordinates);
    // }


    // this.position = this.snakeCoordinates[0][1] * 10 + this.snakeCoordinates[0][0];
    //rendering of snake coordinates

    // for (let i = 0; i < this.snakeCoordinates.length; i++) {
    //   if (i == 0) {
    //     this.blocks[this.snakeCoordinates[0][1] * 10 + this.snakeCoordinates[0][0]].className = "head-snake-block";
    //   } else {
    //     this.blocks[this.snakeCoordinates[i][1] * 10 + this.snakeCoordinates[i][0]].className = "snake-block";
    //   }
    // }
    // for (let i of this.snakeCoordinates) {
    //   randomDiv[i[1] * 10 + i[0]].className = "snake-block";
    // }
  }

  eatFood() {
      this.snake.snakeCoordinates = this.snake.snakeCoordinates.concat([this.food.position]);
      this.food = new Food(this.snake.snakeCoordinates);
      // console.log(this.food.position);
      //this.snakeCoordinates.push(this.snakeCoordinates[this.snakeCoordinates.length - 1]);
      // console.log(this.snake.snakeCoordinates);
  }

  changeDirection(event) {//if quichly press buttons snake can start move against its direction and it'll generate "hit the tail situation"
    switch(event) {
      case "ArrowUp":
        // console.log(this.snake);
        if (this.snake.direction[0] == 0 && this.snake.direction[1] == 1) break;
        this.snake.direction = [0, -1];
        break;
      case "ArrowDown":
        if (this.snake.direction[0] == 0 && this.snake.direction[1] == -1) break;
        this.snake.direction = [0, 1];
        break;
      case "ArrowLeft":
        if (this.snake.direction[0] == 1 && this.snake.direction[1] == 0) break;
        this.snake.direction = [-1, 0];
        break;
      case "ArrowRight":
        if (this.snake.direction[0] == -1 && this.snake.direction[1] == 0) break;
        this.snake.direction = [1, 0];
        break;
    }
  }
}

class Snake {
  constructor() {
    this.snakeCoordinates = [[0, 5], [0, 6], [0, 7], [1, 7], [1, 8]];
    this.direction = [0, -1];
    // this.field = new Field();
    // this.field = document.createElement("div");
    // this.field.id = "field";
    // for (let i = 0; i < 100; i++) {
    //   let block = document.createElement("div");
    //   block.className = "empty-block";
    //   block.innerHTML = i;
    //   this.field.append(block);
    // }
    // this.blocks = this.field.querySelectorAll("div");

    // this.food = new Food(this.snakeCoordinates);
    // this.posX = 0;
    // this.posY = 5;
    // this.tail = [[this.posX, this.posY + 1], [this.posX, this.posY + 2]];
    // this.position = this.snakeCoordinates[0][1] * 10 + this.snakeCoordinates[0][0];
    // for (let i = 0; i < this.snakeCoordinates.length; i++) {
    //   if (i == 0) {
    //     this.blocks[this.snakeCoordinates[i][1] * 10 + this.snakeCoordinates[i][0]].className = "head-snake-block";
    //     continue;
    //   }
    //   this.blocks[this.snakeCoordinates[i][1] * 10 + this.snakeCoordinates[i][0]].className = "snake-block";
    // }


    // document.body.append(this.field.field);
    // this.field.fieldRender(this.snakeCoordinates, this.food.position);
    // for (let i of this.tail) {
    //   randomDiv[10 * i[1] + i[0]].className = "block-black";
    // }
  }

  // fieldRender() {
  //   for (let i = 0; i < 100; i++) {
  //     this.blocks[i].className = "empty-block";
  //   }
  //   this.blocks[this.food.position[1] * 10 + this.food.position[0]].className = "food-block";
  //   for (let i = 1; i < this.snakeCoordinates.length; i++) {
  //     this.blocks[this.snakeCoordinates[i][1] * 10 + this.snakeCoordinates[i][0]].className = "snake-block";
  //   }
  //   this.blocks[this.snakeCoordinates[0][1] * 10 + this.snakeCoordinates[0][0]].className = "head-snake-block";
  //
  //   console.log(this.snakeCoordinates.length);
  // }

  // step() {
  //   // randomDiv[this.snakeCoordinates[1][1] * 10 + this.snakeCoordinates[1][0]].className = "block";
  //   //this.blocks[this.snakeCoordinates[this.snakeCoordinates.length - 1][1] * 10 + this.snakeCoordinates[this.snakeCoordinates.length - 1][0]].className = "empty-block";
  //   //corner turn
  //   if (this.snakeCoordinates[0][0] == 0 && this.snakeCoordinates[0][1] == 0) {
  //     this.direction = [1, 0];
  //   } else if (this.snakeCoordinates[0][0] == 9 && this.snakeCoordinates[0][1] == 0) {
  //     this.direction = [0, 1];
  //   } else if (this.snakeCoordinates[0][0] == 9 && this.snakeCoordinates[0][1] == 9) {
  //     this.direction = [-1, 0];
  //   } else if (this.snakeCoordinates[0][0] == 0 && this.snakeCoordinates[0][1] == 9) {
  //     this.direction = [0, -1];
  //   }
  //
  //   //move all coordinates
  //   for (let i = this.snakeCoordinates.length - 1; i > 0 ; i--) {
  //     this.snakeCoordinates[i][0] = this.snakeCoordinates[i - 1][0];
  //     this.snakeCoordinates[i][1] = this.snakeCoordinates[i - 1][1];
  //     console.log(this.snakeCoordinates[i][0], this.snakeCoordinates[i][1]);
  //   }
  //   console.log("");
  //   this.snakeCoordinates[0][0] += this.direction[0];
  //   this.snakeCoordinates[0][1] += this.direction[1];
  //   //hit the tail
  //   for (let i = 1; i < this.snakeCoordinates.length; i++) {
  //     if (this.snakeCoordinates[0][0] == this.snakeCoordinates[i][0] && this.snakeCoordinates[0][1] == this.snakeCoordinates[i][1]) {
  //       alert("hit the tail");
  //       this.direction = [0, -1];
  //       this.snakeCoordinates = [[0, 5], [0, 6], [0, 7], [1, 7], [1, 8]];
  //       this.food = new Food(this.snakeCoordinates);
  //     }
  //   }
  //   //teleport move
  //   if (this.snakeCoordinates[0][0] == -1) {
  //     this.snakeCoordinates[0][0] = 9;
  //   }
  //   if (this.snakeCoordinates[0][0] == 10) {
  //     this.snakeCoordinates[0][0] = 0;
  //   }
  //   if (this.snakeCoordinates[0][1] == 10) {
  //     this.snakeCoordinates[0][1] = 0;
  //   }
  //   if (this.snakeCoordinates[0][1] == -1) {
  //     this.snakeCoordinates[0][1] = 9;
  //   }
  //   this.field.fieldRender(this.snakeCoordinates, this.food.position);
  //   //eat food
  //   if (this.snakeCoordinates[0][0] == this.food.position[0] && this.snakeCoordinates[0][1] == this.food.position[1]) {
  //     this.snakeCoordinates = this.snakeCoordinates.concat([this.food.position]);
  //     this.food = new Food(this.snakeCoordinates);
  //     //this.snakeCoordinates.push(this.snakeCoordinates[this.snakeCoordinates.length - 1]);
  //     console.log(this.snakeCoordinates);
  //   }



    // this.position = this.snakeCoordinates[0][1] * 10 + this.snakeCoordinates[0][0];
    //rendering of snake coordinates

    // for (let i = 0; i < this.snakeCoordinates.length; i++) {
    //   if (i == 0) {
    //     this.blocks[this.snakeCoordinates[0][1] * 10 + this.snakeCoordinates[0][0]].className = "head-snake-block";
    //   } else {
    //     this.blocks[this.snakeCoordinates[i][1] * 10 + this.snakeCoordinates[i][0]].className = "snake-block";
    //   }
    // }
    // for (let i of this.snakeCoordinates) {
    //   randomDiv[i[1] * 10 + i[0]].className = "snake-block";
    // }
}

class Food {
  constructor(coordinates) {
    this.position = this.newFood(coordinates);
  }
  newFood(snakeCoordinates) { //have to find solution how to exclude next step block, maybe it's not necessary
    let foodCoordinates = [];

    for (let i = 0; i < 10; i++) {
      for (let u = 0; u < 10; u++) {
        let isPossible = true;
        for (let coordinate of snakeCoordinates) {
          if (coordinate[0] == i && coordinate[1] == u) isPossible = false;
        }
        if (isPossible) foodCoordinates.push([i, u]);
      }
    }

    // let x = Math.round(Math.random() * 9), y = Math.round(Math.random() * 9);
    // for (let coodrinate of snakeCoordinates) {
    //   if (coodrinate[0] == x && coodrinate[1] == y) {
    //     console.log("one more time", x, y);
    //     let tempFood = this.newFood(snakeCoordinates);
    //     x = tempFood[0];
    //     y = tempFood[1];
    //   }
    // }
    // console.log(foodCoordinates);
    return foodCoordinates[Math.floor(Math.random() * foodCoordinates.length)];
  }
}

class Field {
  constructor() {
    this.field = document.createElement("div");
    this.field.id = "field";
    for (let i = 0; i < 100; i++) {
      let block = document.createElement("div");
      block.className = "empty-block";
      // block.innerHTML = i;
      this.field.append(block);
    }
    this.blocks = this.field.querySelectorAll("div");
  }

  fieldRender(snakeCoordinates, foodPosition) {
    for (let i = 0; i < 100; i++) {
      this.blocks[i].className = "empty-block";
    }
    this.blocks[foodPosition[1] * 10 + foodPosition[0]].className = "food-block";
    for (let i = 1; i < snakeCoordinates.length; i++) {
      this.blocks[snakeCoordinates[i][1] * 10 + snakeCoordinates[i][0]].className = "snake-block";
    }
    this.blocks[snakeCoordinates[0][1] * 10 + snakeCoordinates[0][0]].className = "head-snake-block";

    // console.log(snakeCoordinates.length);
  }
}

// function changeDirection(event) {
//   switch(event.code) {
//     case "ArrowUp":
//       console.log("up");
//       if (game.snake.snakeCoordinates[0][1] > game.snake.snakeCoordinates[1][1] || game.snake.snakeCoordinates[0][1] == 0) break;
//       game.snake.direction = [0, -1];
//       break;
//     case "ArrowDown":
//       if (game.snake.snakeCoordinates[0][1] < game.snake.snakeCoordinates[1][1] || game.snake.snakeCoordinates[0][1] == 9) break;
//       game.snake.direction = [0, 1];
//       break;
//     case "ArrowLeft":
//       if (game.snake.snakeCoordinates[0][0] > game.snake.snakeCoordinates[1][0] || game.snake.snakeCoordinates[0][0] == 0) break;
//       game.snake.direction = [-1, 0];
//       break;
//     case "ArrowRight":
//       if (game.snake.snakeCoordinates[0][0] < game.snake.snakeCoordinates[1][0] || game.snake.snakeCoordinates[0][0] == 9) break;
//       game.snake.direction = [1, 0];
//       break;
//   }
// }

let game = new Game();
document.addEventListener("keydown", function(event){
  game.changeDirection(event.code);
});
// document.addEventListener("keydown", changeDirection);


// function randomBlock() {
//   let randomNum = Math.round(Math.random() * 100);
//   return randomNum;
// }
//setInterval(() => randomDiv[randomBlock()].className = "block-black", 100);
//console.log(newSnake.food.position);
