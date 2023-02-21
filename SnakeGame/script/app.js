function init() {

  const grid = document.querySelector('.grid')
  const button = document.querySelector('button')
  const score = document.querySelector('.score')

  
  //elements
  const snakeStart = [324, 323, 322]
  let snake = snakeStart

  let currentFood
  // console.log(Array.isArray(snake))
  
  
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
  function startGame(){
    
    //reset
    reset()
    //snake's starting to move in grid

    //if snake and food is on the same cell-function
    snakeEat()

    // if snake index is out of the width -> gameOver()펑션

    //add food
    addFood()
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
      // totalScore++
      // scoreButton.innerText = totalScore
      // score.innerHTML
      
      // add +1 in snake array 
      // const snake = [0]
      // snake.push([snake])
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
  
  //! snake direction
  function moveSnake(e){
    const right = 39
    const left = 37
    const up = 38
    const down = 40
    
    removeSnake()
    
    if (e.keyCode === right && width !== 1){
      snake.unshift(snake[0] + 1)
      snake.pop()

    } else if (e.keyCode === left){
      snake.unshift(snake[0] - 1)
      snake.pop()

    } else if (e.keyCode === up){
      // snake -= width
      snake.unshift(snake[0] - 20)
      snake.pop()

    } else if (e.keyCode === down){
      // snake +=  width
      snake.unshift(snake[0] + 20)
      snake.pop()

    } else {
      console.log()
    }
    console.log(snake)

    addSnake()
    snakeEat()
  }


  
  //! add Food ( Random )
  function addFood(){
    const food = Math.floor(Math.random() * totalCell)
    currentFood = cells[food]
    currentFood.classList.add('food')
    console.log(currentFood.dataset['index'])
  }
  // function removeFood(){
  //   cells.classList.remove('food')
  // }
  function removeFood() {
    cells.forEach(cell => {
      cell.classList.remove('food')
    })
  }







  document.addEventListener('keydown', moveSnake)
  button.addEventListener('click', startGame)

  createGrid()
} 

window.addEventListener('DOMContentLoaded', init)