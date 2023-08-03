const cardArray = [
    {
        name: 'burger',
        img: 'assets/img/burger.png',
    },
    {
        name: 'coffee',
        img: 'assets/img/coffee.png',
    },
    {
        name: 'croissant',
        img: 'assets/img/croissant.png',
    },
    {
        name: 'donut',
        img: 'assets/img/donut.png',
    },
    {
        name: 'french-fries',
        img: 'assets/img/french-fries.png',
    },
    {
        name: 'hot-dog',
        img: 'assets/img/hot-dog.png',
    },
    {
        name: 'ice-cream',
        img: 'assets/img/ice-cream.png',
    },
    {
        name: 'pizza',
        img: 'assets/img/pizza.png',
    },
    {
        name: 'soda',
        img: 'assets/img/soda.png',
    },
    {
        name: 'taco',
        img: 'assets/img/taco.png',
    },
    {
        name: 'burger',
        img: 'assets/img/burger.png',
    },
    {
        name: 'coffee',
        img: 'assets/img/coffee.png',
    },
    {
        name: 'croissant',
        img: 'assets/img/croissant.png',
    },
    {
        name: 'donut',
        img: 'assets/img/donut.png',
    },
    {
        name: 'french-fries',
        img: 'assets/img/french-fries.png',
    },
    {
        name: 'hot-dog',
        img: 'assets/img/hot-dog.png',
    },
    {
        name: 'ice-cream',
        img: 'assets/img/ice-cream.png',
    },
    {
        name: 'pizza',
        img: 'assets/img/pizza.png',
    },
    {
        name: 'soda',
        img: 'assets/img/soda.png',
    },
    {
        name: 'taco',
        img: 'assets/img/taco.png',
    }
]

cardArray.sort(() => 0.5 - Math.random());

document.querySelector('#items-qty').innerText = cardArray.length / 2;

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];
let stepsCount = 0;

// BOARD CREATING
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'assets/img/question.png');
        card.setAttribute('class', 'card-img');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}

createBoard();

// POPUP MESSAGE
function removeActiveClass() {
    document.querySelector('.message-popup').classList.remove('active')
} 

function showMessage(message) {
    document.querySelector('.message-popup').classList.add('active');
    document.querySelector('.message-text').innerHTML = message;
    setTimeout(removeActiveClass, 2000);
    stepsCount++;
}

// NEW SET BUTTON
const newSetBtn = document.querySelectorAll('.new-set');

newSetBtn.forEach((e) => {
    e.addEventListener('click', () => {
        document.location.reload();
    })
})


// MODAL
const winnerModal = document.querySelector('.winner-modal');
const winnerModalContent = document.querySelector('.winner-modal-content');

function showModal(modal) {
    modal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
}

winnerModalContent.addEventListener('click', (event) => {
    event.stopPropagation();
})

// MATCH CHECKING
function checkMatch() {
    const cardImages = document.querySelectorAll('.card-img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];

    if (cardsChosen[0] == cardsChosen[1] && optionOneId !== optionTwoId) {
        cardImages[optionOneId].setAttribute('src', 'assets/img/accept.png');
        cardImages[optionTwoId].setAttribute('src', 'assets/img/accept.png');
        cardImages[optionOneId].removeEventListener('click', flipCard);
        cardImages[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        showMessage('Great! +1 Score 😎');
    } else {
        function flipCardBack() {
            cardImages[optionOneId].setAttribute('src', 'assets/img/question.png');
            cardImages[optionTwoId].setAttribute('src', 'assets/img/question.png');
        }
        showMessage('Sorry, try next! 😉');
        setTimeout(flipCardBack, 2000);
    }

    resultDisplay.innerText = cardsWon.length;

    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == (cardArray.length / 2)) {
        document.querySelector('#stepsCount').innerText = stepsCount;
        showModal(winnerModal);
    }

    if (optionOneId == optionTwoId) {
        showMessage('You have clicked the same image! 🙂');
        cardsChosen = [];
        stepsCount--;
    }
}

// CARDS FLIP
function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

