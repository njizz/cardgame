class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}
class Deck {
    constructor() {
        this.cards = [];    
    }      
    createDeck() {
        let suits = ['C', 'D', 'H', 'S'];
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j], values[j]));
            }
        }
    }
    shuffleDeck() {
       let location1, location2, tmp;
       for (let i = 0; i < 1000; i++) {
           location1 = Math.floor((Math.random() * this.cards.length));
           location2 = Math.floor((Math.random() * this.cards.length));
           tmp = this.cards[location1];
           this.cards[location1] = this.cards[location2];
           this.cards[location2] = tmp;
        }
    }
}
class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
    }
}
class Board {
    constructor() {
        this.cardsInMiddle = [];
        this.players = [];
        this.flop = [];
        this.turn = [];
        this.river = [];
    }
    enterPlayer(name){
      this.players.push(new Player(name));
    }
    deal() {
        let d = new Deck();
        d.createDeck();
        d.shuffleDeck();
        var i;
        var x;
        for (i=0; i<this.players.length; i++){
          this.players[i].playerCards = d.cards.slice(i*2, (i*2 + 2));
          x= (i*2 + 2)
        }   
        this.flop = d.cards.slice(x, x+3);
        this.turn = d.cards.slice(x+3, x+4);
        this.river = d.cards.slice(x+4, x+5);
    }
}
let gameBoard = new Board();
gameBoard.enterPlayer('Aaron');
gameBoard.enterPlayer('Ben');
gameBoard.enterPlayer('Jim');
gameBoard.enterPlayer('Nathan');

var i = 1

function CreateCard(suit, rank){
  var div = document.createElement('div');
  var img = document.createElement('img');
  var spanR = document.createElement('span');
  var spanS = document.createElement('span');
  img.id = 'card' + i;
  img.src = suit + rank + '.png';
	document.getElementById('table').appendChild(img);
  target=document.getElementById('card' + i);
  target.style.width='20%';
  target.style.height='20%';
  i++
}

function DealCards() {
  switch(i) {
    case 1:
      gameBoard.deal();
      console.log(gameBoard.players);
      console.log(gameBoard.flop);
      console.log(gameBoard.turn);
      console.log(gameBoard.river);
      CreateCard(gameBoard.flop[0].suit, gameBoard.flop[0].rank);
      CreateCard(gameBoard.flop[1].suit, gameBoard.flop[1].rank);
	    CreateCard(gameBoard.flop[2].suit, gameBoard.flop[2].rank);
      target=document.getElementById('dealButton');
      target.value='Deal Turn';
      break;
    case 4:
      CreateCard(gameBoard.turn[0].suit, gameBoard.turn[0].rank);
      target=document.getElementById('dealButton');
      target.value='Deal River';
      break;
    case 5:
      CreateCard(gameBoard.river[0].suit, gameBoard.river[0].rank);
      target=document.getElementById('dealButton');
      target.value='Next Round';
      break;
    case 6:
      target=document.getElementById('dealButton');
      target.value='Deal Flop';
      for (x = 1; x < i; x++) {
	      var element = document.getElementById('card' + x);
        document.getElementById('table').removeChild(element);
      }
      i = 1
      break;
  }
} 
