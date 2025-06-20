var snakeLoc = [];
var foodLoc;

function mainBox() {
    let change = true;
    for(let i = 0 ; i < 20 ; i++) {
        change = !change;
        for(let j = 0 ; j < 20 ; j++) {
            change = !change;
            let box = document.createElement('div')
            let alpha = document.getElementsByClassName('container')[0]
            if(change) {
                box.setAttribute('class' , 'main-box')
                alpha.appendChild(box)
            } else {
                box.setAttribute('class' , 'main-box change')
                alpha.appendChild(box)
            }
        }
    }
}

function hasDuplicates(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) {
      return true; // duplicate found
    }
    seen.add(item);
  }
  return false; // no duplicates
}

function endGame() {
  if (!document.querySelector('.game-over')) {
    const msg = document.createElement('div');
    msg.className = 'game-over';
    msg.innerText = 'Game Over!';
    document.querySelector('.gameSet').appendChild(msg)
  }
  setTimeout(()=>{
    window.location.reload()
  },300)
}

function snakeMouth(){
    let random = Math.floor(Math.random() * 400)
    document.querySelectorAll('.main-box')[random].innerHTML = '<div class="snake-body"></div>'
    return random
}

function generateFood() {
    let random2 = Math.floor(Math.random() * 400)
    for(let i = 0 ; i<snakeLoc.length ; i++){
        if(random2 == snakeLoc[i]){
            random2 = Math.floor(Math.random() * 400)
            i = -1
        }
    }
    document.querySelectorAll('.main-box')[random2].innerHTML = '<div class="food"></div>'
    return random2
}

function moveUp() {
    if((snakeLoc[0]-20) == foodLoc){
        snakeLoc.unshift(foodLoc)
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        foodLoc = generateFood();
    } else {
        let newSnake = [...snakeLoc]
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '';
        snakeLoc[0] -= 20;
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        for(let i = 1 ; i < snakeLoc.length ; i++){
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '';
            snakeLoc[i] = newSnake[i-1]
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '<div class="snake-body"></div>';
        }
    }
    if(hasDuplicates(snakeLoc)){
        endGame()
    }
}

function moveDown() {
    if((snakeLoc[0]+20) == foodLoc){
        snakeLoc.unshift(foodLoc)
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        foodLoc = generateFood();
    } else {
        let newSnake = [...snakeLoc]
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '';
        snakeLoc[0] += 20;
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        for(let i = 1 ; i < snakeLoc.length ; i++){
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '';
            snakeLoc[i] = newSnake[i-1]
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '<div class="snake-body"></div>';
        }
    }
    if(hasDuplicates(snakeLoc)){
        endGame()
    }
}

function moveLeft() {
    if((snakeLoc[0]-1) == foodLoc){
        snakeLoc.unshift(foodLoc)
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        foodLoc = generateFood();
    } else {
        let newSnake = [...snakeLoc]
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '';
        snakeLoc[0] -= 1;
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        for(let i = 1 ; i < snakeLoc.length ; i++){
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '';
            snakeLoc[i] = newSnake[i-1]
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '<div class="snake-body"></div>';
        }
    }
    if(hasDuplicates(snakeLoc)){
        endGame()
    }
}

function moveRight() {
    if((snakeLoc[0]+1) == foodLoc){
        snakeLoc.unshift(foodLoc)
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        foodLoc = generateFood();
    } else {
        let newSnake = [...snakeLoc]
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '';
        snakeLoc[0] += 1;
        document.querySelectorAll('.main-box')[snakeLoc[0]].innerHTML = '<div class="snake-body"></div>';
        for(let i = 1 ; i < snakeLoc.length ; i++){
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '';
            snakeLoc[i] = newSnake[i-1]
            document.querySelectorAll('.main-box')[snakeLoc[i]].innerHTML = '<div class="snake-body"></div>';
        }
    }
    if(hasDuplicates(snakeLoc)){
        endGame()
    }
}

(function main(){

    mainBox();
    
    snakeLoc.push(snakeMouth())
    foodLoc = generateFood();
    
    let upBorder = []
    let downBorder = []
    let leftBorder = []
    let rightBorder = []
    for(let i = 0 ; i < 20 ; i++) {
        upBorder.push(i)
        downBorder.push(399-i)
        leftBorder.push(i*20)
        rightBorder.push((i*20)+19)
    } 
    
    let up = true;
    let down = true;
    let left = true;
    let right = true;
    
    let currentInterval = null;
    
    document.addEventListener('keypress', (e) => {
        
        if (e.key === 'w' && up) {
            clearInterval(currentInterval);
            if(left == false || right == false){moveUp()}
            currentInterval = setInterval(() => {
                if (upBorder.includes(snakeLoc[0])) return endGame();
                moveUp();
                down = false; 
                up = left = right = true;
            }, 200);
        }
        
        if (e.key === 's' && down) {
            clearInterval(currentInterval);
            if(left == false || right == false){moveDown()}
            currentInterval = setInterval(() => {
                if (downBorder.includes(snakeLoc[0])) return endGame();
                moveDown();
                up = false; 
                down = left = right = true;
            }, 200);
        }
        
        if (e.key === 'a' && left) {
            clearInterval(currentInterval);
            if(up == false || down == false){moveLeft()}
            currentInterval = setInterval(() => {
                if (leftBorder.includes(snakeLoc[0])) return endGame();
                moveLeft();
                right = false; 
                up = down = left = true;
            }, 200);
        }
        
        if (e.key === 'd' && right) {
            clearInterval(currentInterval);
            if(up == false || down == false){moveRight()}
            currentInterval = setInterval(() => {
                if (rightBorder.includes(snakeLoc[0])) return endGame();
                moveRight();
                left = false; 
                up = down = right = true;
            }, 200);
        }
    });

    document.addEventListener('click', (e) => {
        
        if (e.target.innerText === 'up' && up) {
            clearInterval(currentInterval);
            if(left == false || right == false){moveUp()}
            currentInterval = setInterval(() => {
                if (upBorder.includes(snakeLoc[0])) return endGame();
                moveUp();
                down = false; 
                up = left = right = true;
            }, 200);
        }
        
        if (e.target.innerText === 'down' && down) {
            clearInterval(currentInterval);
            if(left == false || right == false){moveDown()}
            currentInterval = setInterval(() => {
                if (downBorder.includes(snakeLoc[0])) return endGame();
                moveDown();
                up = false; 
                down = left = right = true;
            }, 200);
        }
        
        if (e.target.innerText === 'left' && left) {
            clearInterval(currentInterval);
            if(up == false || down == false){moveLeft()}
            currentInterval = setInterval(() => {
                if (leftBorder.includes(snakeLoc[0])) return endGame();
                moveLeft();
                right = false; 
                up = down = left = true;
            }, 200);
        }
        
        if (e.target.innerText === 'right' && right) {
            clearInterval(currentInterval);
            if(up == false || down == false){moveRight()}
            currentInterval = setInterval(() => {
                if (rightBorder.includes(snakeLoc[0])) return endGame();
                moveRight();
                left = false; 
                up = down = right = true;
            }, 200);
        }
    });

})()
