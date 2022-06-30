const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector("#score")
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2
let timerId
let score = 0

const userStart = [230, 10]
let currentPos = userStart

const ballStart = [270, 40]
let ballCurrent = ballStart

class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

function addBlocks(){
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

function drawUser() {
    user.style.left = currentPos[0] + 'px'
    user.style.bottom = currentPos[1] + 'px'
}

function drawBall() {
    ball.style.left = ballCurrent[0] + 'px'
    ball.style.bottom = ballCurrent[1] + 'px'
}

function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft' :
            if(currentPos[0] > 0) {
                currentPos[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if(currentPos[0] < boardWidth - blockWidth) {
                currentPos[0] += 10
                drawUser()
            }
            break;
    }
}

function moveBall() {
    ballCurrent[0] += xDirection
    ballCurrent[1] += yDirection
    drawBall()
    checkCollision()
}

document.addEventListener('keydown', moveUser)

timerId = setInterval(moveBall, 30)

function checkCollision() {
    for(let i = 0; i < blocks.length; i++) {
        if(
            (ballCurrent[0] > blocks[i].bottomLeft[0] && ballCurrent[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrent[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrent[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            allBlocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            if(blocks.length == 0){
                scoreDisplay.innerHTML = 'You win'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    if(ballCurrent[0] >= (boardWidth - ballDiameter) || 
       ballCurrent[1] >= (boardHeight - ballDiameter) ||
        ballCurrent[0] <= 0
        ) {
        changeDirection()
    }

    if((ballCurrent[0] > currentPos[0] && ballCurrent[0] < currentPos[0] + blockWidth) &&
      (ballCurrent[1] > currentPos[1] && ballCurrent[1] < currentPos[1] + blockHeight)
      ) {
          changeDirection()
      }

    if(ballCurrent[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if(xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if(xDirection === -2 && yDirection === 2) {
        xDirection = -2
        return
    }
}
