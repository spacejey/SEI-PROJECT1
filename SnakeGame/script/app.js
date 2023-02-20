function init() {

  const grid = document.querySelector('.grid')
  const button = document.querySelector('button')
  
  //엘레먼트 만들기

  const snakeStart = 234
  let snakeCurrent = snakeStart
  let currentFood
  let runSnake


  // 그리드 만들기
  const width = 20
  const totalCell = width * width
  const cells = []

  function createGrid() {
    for (let i = 0; i < totalCell; i++){
      const cell = document.createElement('div')
      cell.dataset.index = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addFood(currentFood)
    addSnake(snakeStart)
    
  }

  


  //게임 시작
  function startGame(){
    
    //리셋펑션으로 초기화
    reset() 
    //뱀이 일정 속도로 움직인다.
    // 뱀이 음식을 잡았을 때 펑션
    snakeWin()
    // if 뱀이 그리드 밖을 넘어갔을 때 펑션 -> gameOver()펑션
    //음식 펑션
    addFood()
    
  }

  // 뱀이 음식을 잡았을 때
  function snakeWin(){
    if (snakeCurrent === currentFood){
      //음식 색 바꾸기
      console.log('catch')
    } 
    //랜덤음식 추가
    //뱀 어레이 추가 push
  }

  //뱀 위치 추가
  function addSnake(position){
    cells[position].classList.add('snake')
  }
  function removeSnake(){
    cells[snakeCurrent].classList.remove('snake')
  }
  
  //뱀 움직이기
  function moveSnake(e){
    const right = 39
    const left = 37
    const up = 38
    const down = 40
    
    removeSnake()
    
    if (e.keyCode === right){
      snakeCurrent++
    } else if (e.keyCode === left){
      snakeCurrent--
    } else if (e.keyCode === up){
      snakeCurrent -= width
    } else if (e.keyCode === down){
      snakeCurrent += width
    } else {
      console.log()
    }
    console.log(snakeCurrent % width)
    addSnake(snakeCurrent)
  }
  // setInterval(addSnake, 1000 / 10)
  
  //랜덤 타겟 
  function addFood(){
    const food = Math.floor(Math.random() * totalCell)
    currentFood = cells[food]
    currentFood.classList.add('food')
  }





  document.addEventListener('keydown', moveSnake)
  button.addEventListener('click', startGame)

  createGrid()
} 

window.addEventListener('DOMContentLoaded', init)