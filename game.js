document.getElementById('dealCards').addEventListener('click', function() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
    const game = new CardGame(numPlayers);
    game.resetGame(); // Clears the game state and HTML
    game.dealCards();
});

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.imagePath = this.getImagePath();
    }

    getImagePath() {
        let suitLetter = this.suit.charAt(0).toLowerCase();
        let rankLetter = this.rank.toLowerCase();
        
        // Special case for Ten cards
        if (this.rank === '10') {
            rankLetter = 't';
        }
        
        if (this.rank === 'Joker') {
            // Assuming Joker images are named '1j.svg' for Red Joker and '2j.svg' for Black Joker
            return `Cards/${this.suit === 'Red' ? '1j' : '2j'}.svg`;
        } else {
            // Construct the path with the special case for Ten cards
            return `Cards/${rankLetter}${suitLetter}.svg`;
        }
    }
    
}


class CardGame {
    constructor(numPlayers) {
        this.numPlayers = numPlayers;
        this.resetGame(); // Initialize the game state
    }

    createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];
        
        suits.forEach(suit => {
            ranks.forEach(rank => {
                deck.push(new Card(rank, suit));
                deck.push(new Card(rank, suit)); // Add the card twice for two decks
            });
        });
    
        // Add Jokers - 2 Black Jokers and 2 Red Jokers
        deck.push(new Card('Joker', 'Black'));
        deck.push(new Card('Joker', 'Black'));
        deck.push(new Card('Joker', 'Red'));
        deck.push(new Card('Joker', 'Red'));
    
        // Shuffle the deck
        deck = deck.sort(() => Math.random() - 0.5);
        return deck;
    }

    resetGame() {
        this.deck = this.createDeck();
        this.pile = [];
        this.players = [];
        // Clear the display of previously dealt cards
        document.querySelectorAll('.playerHand').forEach(hand => hand.innerHTML = '');
    }

    dealCards() {
        this.resetGame(); // Ensure a fresh state before dealing new cards
        for (let i = 0; i < this.numPlayers; i++) {
            this.players[i] = { hand: this.deck.splice(0, 13) };
        }
        console.log("Cards dealt. Current deck size:", this.deck.length);
        this.displayCards(); // Display cards for each player
    }

    displayCards() {
        this.players.forEach((player, index) => {
            const playerHandDiv = document.getElementById(`player${index + 1}`);
            playerHandDiv.innerHTML = ''; // Clear previous cards
            if (this.numPlayers > 2 && (index === 2 || index === 3)) {
                playerHandDiv.classList.add('vertical');
                playerHandDiv.style.flexDirection = 'column';
            } else {
                playerHandDiv.classList.remove('vertical');
                playerHandDiv.style.flexDirection = 'row';
            }
            player.hand.forEach(card => {
                const cardImg = document.createElement('img');
                cardImg.src = card.imagePath;
                cardImg.alt = `${card.rank} of ${card.suit}`;
                cardImg.classList.add('card');
                playerHandDiv.appendChild(cardImg);
            });
        });
    }

}
