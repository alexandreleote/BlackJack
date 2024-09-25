// Déclaration des variables nécessaires au jeu
let cards = [] 
let sum = 0
let hasBlackJack = false
let isAlive = false
let message =""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById ("sum-el")
let cardsEl = document.getElementById("cards-el")

let player = {
    name: "Alexandre",
    chips: 150
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": " + player.chips + "€"


// Fonctions pour faire fonctionner le jeu du BlackJack

// Fonction qui calcule la valeur des cartes que l'on tire
function getRandomCard() {
    let randomCard = Math.floor(Math.random()*13) + 1
    if(randomCard > 10) { // Si on tire un 10, Valet, Dame ou Roi on retourne la valeur 10
        return 10
    } else if (randomCard === 1) { // Pour cet exemple de jeu BlackJack premier niveau on fait en sorte que l'As vaut 11 tout le temps, pas de possibilité de split le jeu encore
        return 11
    } else {
        return randomCard
    }
}

// Fonction qui permet de démarrer le jeu et initialise la valeur des cartes au moment où on clique et non avant
function startGame () {
    isAlive = true // On définit que le joueur est en vie
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard] // On stocke la valeur des cartes initialisées
    sum = firstCard + secondCard
    renderGame()
}

// On lance la fonction à la suite pour évaluer la main du joueur et savoir si on tire ou non une nouvelle carte
function renderGame() {
    cardsEl.textContent = "Cards: " 
    for(let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if(sum <= 20) {
        message = "Do you want to draw a new card ?"
    } else if (sum === 21) {
        message = "Woohoo ! You've got BlackJack !"
        hasBlackJack = true
    } else {
        message = "Too bad ! You are out of the game !"
        isAlive = false
    }
    messageEl.textContent = message
}

// Fonction pour pouvoir ajouter une nouvelle carte lorsque l'on est en dessous de 21 et toujours en vie
function newCard() { 
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

