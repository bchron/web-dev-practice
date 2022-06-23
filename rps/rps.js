const cpuChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let cpuChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice() {
    const randomNum = Math.floor(Math.random() * 3) + 1
    console.log(randomNum)

    if(randomNum === 1){
        cpuChoice = 'rock'
    }
    if(randomNum === 2){
        cpuChoice = 'paper'
    }
    if(randomNum === 3){
        cpuChoice = 'scissors'
    }
    cpuChoiceDisplay.innerHTML = cpuChoice
}

function getResult(){
    if(cpuChoice === userChoice){
        result = 'its a draw'
    }
    if(cpuChoice === 'rock' && userChoice == 'paper'){
        result = 'you win'
    }
    if(cpuChoice === 'scissors' && userChoice == 'rock'){
        result = 'you win'
    }
    if(cpuChoice === 'paper' && userChoice == 'scissors'){
        result = 'you win'
    }
    if(cpuChoice === 'rock' && userChoice == 'scissors'){
        result = 'you lose'
    }
    if(cpuChoice === 'paper' && userChoice == 'rock'){
        result = 'you lose'
    }
    if(cpuChoice === 'scissors' && userChoice == 'paper'){
        result = 'you lose'
    }

    resultDisplay.innerHTML = result    
}