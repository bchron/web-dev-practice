const cardArray =  [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector("#grid")
const result = document.querySelector("#result")
let cardChosen = []
let cardsChosenID = []
const cardsWon = []

function createBoard() {
    for(let i = 0; i < 12; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img')
    
    if(cardsChosenID[0] == cardsChosenID[1]){
        cards[cardsChosenID[0]].setAttribute('src', 'images/blank.png')
        cards[cardsChosenID[1]].setAttribute('src', 'images/blank.png')
    }
    if(cardChosen[0] == cardChosen[1]){
        cards[cardsChosenID[0]].setAttribute('src', 'images/white.png')
        cards[cardsChosenID[1]].setAttribute('src', 'images/white.png')
        cards[cardsChosenID[0]].removeEventListener('click')
        cards[cardsChosenID[1]].removeEventListener('click')
        cardsWon.push(cardChosen)
    } else {
        cards[cardsChosenID[0]].setAttribute('src', 'images/blank.png')
        cards[cardsChosenID[1]].setAttribute('src', 'images/blank.png')

    }

    result.textContent = cardsWon.length
    cardChosen = []
    cardsChosenID = []

    if(cardsWon.length == cardArray.length / 2){
        result.textContent = 'Congratz you win'
    }
}

function flipCard() {
    let cardID = this.getAttribute('data-id')
    cardChosen.push(cardArray[cardID].name)
    cardsChosenID.push(cardID)
    this.setAttribute('src', cardArray[cardID].img)
    if(cardChosen.length == 2) {
        setTimeout(checkMatch, 500)
    }
}
createBoard()
