// Array que guarda as cartas do jogo
let cards = [
    { id: 1, icon: '🍎' },
    { id: 2, icon: '🍉' },
    { id: 3, icon: '🍌' },
    { id: 4, icon: '🍊' },
    { id: 5, icon: '🍇' },
    { id: 6, icon: '🍓' },
    { id: 7, icon: '🍒' },
    { id: 8, icon: '🍍' }
];

// Duplica as cartas para formar pares
cards = cards.concat(cards);

// Embaralha as cartas
shuffleArray(cards);

// Função para embaralhar o array de cartas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let flippedCards = [];
let matchedCards = [];

const gameContainer = document.getElementById('game-container');

// Função para iniciar o jogo
function startGame() {
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const front = document.createElement('span');
        front.classList.add('front');
        front.innerHTML = card.icon;

        const back = document.createElement('span');
        back.classList.add('back');

        cardElement.appendChild(front);
        cardElement.appendChild(back);

        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
}

// Função para virar as cartas
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

// Função para verificar se as cartas viradas são iguais
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                alert('Parabéns, você venceu!');
            }, 500);
        }
    } else {
        // Fixa as cartas viradas por um momento
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

// Iniciar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', startGame);
