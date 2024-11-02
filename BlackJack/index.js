import player from './data.js'

// Loading the stats of current game session
let gameProgress = JSON.parse(localStorage.getItem('gameProgress') || 0)
player.chips = gameProgress

// Variables needed for our game
let cards = [] 
let sum = 0
let hasBlackJack = false
let hasJackpot = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById ("sum-el")
let cardsEl = document.getElementById("cards-el")
let infoEl = document.querySelector('.info-el')
let playerEl = document.getElementById("player-el")
let startNewGame = document.querySelector('#start-game')
let drawNewCard = document.querySelector('#new-card')

startNewGame.addEventListener('click', startGame)
drawNewCard.addEventListener('click', newCard)

playerEl.textContent = player.name + ": " + player.chips + "€"


// Functions

// Calculation of the value of the drawn cards
function getRandomCard() {
    let randomCard = Math.floor(Math.random()*13) + 1
    if(randomCard > 10) { // Return 10 as value if 10, Jack, Queen or King is drawn
        return 10
    } else if (randomCard === 1) { // Ace is set to 11 for this example of BlackJack
        return 11
    } else {
        return randomCard
    }
}

// Initialize the cards only when we start the game
function startGame () {
    if (player.chips > 2) {
        player.chips -= 2
        playerEl.textContent = player.name + ": " + player.chips + "€"
        console.log("- " + player.chips)
        infoEl.textContent = "" // The alert info is set to nothing and only display when needed
        isAlive = true // We set that the player is alive
        let firstCard = getRandomCard() 
        let secondCard = getRandomCard() 
        cards = [firstCard, secondCard] // The value of the initialized cards is saved in the array
        sum = firstCard + secondCard
        renderGame() // We render the game
    } else {
        infoEl.textContent = "Sorry, it seems you've run out of chips !"

    }
}

// 
function renderGame() {
    cardsEl.textContent = "Cards: " 
    hasBlackJack= false // We make sure that the status is set to false so we don't bug our new card button
    for(let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if(sum <= 20) {
        message = "Do you want to draw a new card ?"
    } else if (sum === 21) {
        if (hasJackpot === true ) {
            message = "Wow ! Twice in a row ! Nice !"
            player.chips += 250
            hasJackpot = false
            playerEl.textContent = player.name + ": " + player.chips + "€"
            console.log("+ 250 | Total : " + player.chips)
            console.log("Jackpot reset")
        } else {
            message = "Woohoo ! You've got BlackJack !"
            hasBlackJack = true
            player.chips += 50
            playerEl.textContent = player.name + ": " + player.chips + "€"
            hasJackpot = true
            console.log("+ 50 | Total : " + player.chips)
            console.log("Jackpot : " + hasJackpot)
        }
    } else {
        message = "Too bad ! You are out of the game !"
        isAlive = false
        hasJackpot = false
        console.log("Jackpot : " + hasJackpot)
    }
    messageEl.textContent = message
    gameProgress = player.chips
    
    // Save game progress in localStorage
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress))
}

// If we are still in the game and did not hit BlackJack, then we can draw an extra card
function newCard() { 
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    } else if (isAlive === true && hasBlackJack === true) {
        infoEl.textContent = "Sorry, you've already won !"
        alert(infoEl.textContent)
    }
}

