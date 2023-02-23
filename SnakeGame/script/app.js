function init() {

  const grid = document.querySelector('.grid')
  const button = document.querySelector('button')

  
  //elements
  const snakeStart = [305, 306]
  let snake = snakeStart
  let currentFood
  let score = 0
  let activeSnake
  let snakeDirection = 'right'

  //Grid Elements
  const width = 20
  const totalCell = width * width
  const cells = []

  //! Creating Grid
  function createGrid() {
    for (let i = 0; i < totalCell; i++){
      const cell = document.createElement('div')
      cell.dataset.index = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addFood(currentFood)
    addSnake()
  }
  
  //!게임 시작
  function defaultBtn() {
    button.innerText = 'Restart!'
    reset()
    addFood()
    addSnake()
  }

  function startGame(e){
    button.innerText = `score! ${score}`
    addSnake
    snakeMovementTimer()
  }
  
  function gameOver(){
    clearInterval(activeSnake)
    alert('Game Over!')
    defaultBtn()
  }
  
  function reset() {
    removeSnake()
    removeFood()
  }
  
  //! when snake and food is on the same cell
  function snakeEat(){

    if (cells[snake[0]].classList.contains('food')) {
      console.log('catch')
      removeFood()
      addFood()
      score += 10
      button.innerText = `score! ${score}`
      snake.push(snake[0])
    }
  }


  //! add snake
  function addSnake(){
    snake.forEach(snakeCell => {
      cells[snakeCell].classList.add('snake')
    })
  }
  
  function removeSnake(){
    snake.forEach(snakeCell => {
      cells[snakeCell].classList.remove('snake')
    })
  }

  function snakeMovementTimer() {
    activeSnake = setInterval(() => {
      removeSnake()
      moveSnake()
    }, 2000 / 10)

  }

  function changeSnakeDirection(e){

    const right = 39
    const left = 37
    const up = 38
    const down = 40

    if (e.keyCode === right) {
      snakeDirection = 'right'
    } else if (e.keyCode === left) {
      snakeDirection = 'left'
    } else if (e.keyCode === up) {
      snakeDirection = 'up'
    } else if (e.keyCode === down) {
      snakeDirection = 'down'
    }
  }
  

  function moveSnake(){
      
    if (snakeDirection === 'right' && snake[0] % width === width - 1){
      gameOver()
    } else if (snakeDirection === 'left' && snake[0] % width === 0){
      gameOver()
    } else if (snakeDirection === 'up' && snake[0] < width){
      gameOver()
    } else if (snakeDirection === 'down' && snake[0] + width >= totalCell){
      gameOver()
    } else {
      removeSnake()
      snake.pop()
      if (snakeDirection === 'right'){
        console.log('snake', snake[0] + 1)
        snake.unshift(snake[0] + 1)
      } else if (snakeDirection === 'left'){
        snake.unshift(snake[0] - 1)
      } else if (snakeDirection === 'up'){
        snake.unshift(snake[0] - width)
      } else if (snakeDirection === 'down'){
        snake.unshift(snake[0] + width)
      } 
      if (cells[snake[0]].classList.contains('snake')) {
        gameOver()
      }
      addSnake()
    }
    console.log(snake)
    snakeEat()
  }



  
  //! add Food ( Random )
  function addFood(){
    const food = Math.floor(Math.random() * totalCell)
    currentFood = cells[food]
    currentFood.classList.add('food')
    console.log(currentFood.dataset['index'])
  }

  function removeFood() {
    cells.forEach(cell => {
      cell.classList.remove('food')
    })
  }







  document.addEventListener('keydown', changeSnakeDirection)
  button.addEventListener('click', startGame)

  createGrid()
} 

window.addEventListener('DOMContentLoaded', init)