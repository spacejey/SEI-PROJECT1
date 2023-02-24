function init() {

  const grid = document.querySelector('.grid')
  const button = document.querySelector('button')
  const scoreBtn = document.querySelector('.scoreBtn')
  const audio = document.querySelector('.myAudio')
  const eatingSound = document.querySelector('#eatingSound')
  const endGame = document.querySelector('#endGame')
  
  //elements
  const snakeStart = [305, 306]
  let snake = snakeStart
  let currentFood
  let score = 0
  let activeSnake
  let snakeDirection = 1
  let speed = 300
  scoreBtn.style.display = 'none'
  

  
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
    playSound()
  }

  function playSound(){
    audio.autoplay = true
    audio.play()
  }
  playSound()


  //!게임 시작
  function startGame(){
    button.style.display = 'none'
    scoreBtn.style.display = 'block'
    scoreBtn.innerText = `score! ${score}`
    addSnake()
    snakeMovementTimer()
  }
  
  
  function gameOver(){
    clearInterval(activeSnake)
    confirm('Game Over!')
    location.reload()
  }



  //! when snake and food is on the same cell
  function snakeEat(){
    if (snake.length % 5 === 0){
      speedUp()
    } 
    if (cells[snake[0]].classList.contains('food')) {
      eatingSound.src = './audio/eatingSound.mp3'
      eatingSound.play()
      removeFood()
      addFood()
      score += 10
      scoreBtn.innerText = `score! ${score}`
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
    }, speed)
  }

  function speedUp() {
    clearInterval(activeSnake)
    speed *= 0.98
    activeSnake = setInterval(moveSnake, speed)
  }

  function changeSnakeDirection(e){
    e.preventDefault()
    const right = 39
    const left = 37
    const up = 38
    const down = 40

    if (e.keyCode === right && snakeDirection !== -1) {
      snakeDirection = 1
    } else if (e.keyCode === left && snakeDirection !== 1) {
      snakeDirection = -1
    } else if (e.keyCode === up && snakeDirection !== +width) {
      snakeDirection = -width
    } else if (e.keyCode === down && snakeDirection !== -width) {
      snakeDirection = +width
    }
  }
  

  function moveSnake(){
    if (snakeDirection === 1 && snake[0] % width === width - 1){
      gameOver()
    } else if (snakeDirection === -1 && snake[0] % width === 0){
      gameOver()
    } else if (snakeDirection === -width && snake[0] < width){
      gameOver()
    } else if (snakeDirection === +width && snake[0] + width >= totalCell){
      gameOver()
    } else if (cells[snake[0] + snakeDirection].classList.contains('snake')) {
      gameOver()
    } else {
      removeSnake()
      snake.pop()
      snake.unshift(snake[0] + snakeDirection)
      addSnake()
    }
    snakeEat()
  }



  
  //! add Food ( Random )
  function addFood(){
    const food = Math.floor(Math.random() * totalCell)
    currentFood = cells[food]
    currentFood.classList.add('food')
  }

  function removeFood() {
    cells.forEach(cell => {
      cell.classList.remove('food')
    })
  }








  document.addEventListener('keydown', changeSnakeDirection)
  button.addEventListener('click', startGame)
  button.addEventListener('click', playSound)


  createGrid()
} 

window.addEventListener('DOMContentLoaded', init)