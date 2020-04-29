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
        this.reveal = false
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

var tc = 0

function CreateTableCard(suit, rank,name){
  var img = document.createElement('img');
  img.className = 'card';
  img.id = 'card' + tc;
  img.src = suit + rank + '.png';
	document.getElementById('table').appendChild(img);
  target=document.getElementById('card' + tc);
  target.style.width='20%';
  target.style.height='20%';
  tc++
}

function CreatePlayerCard(suit, rank, name, c){
  var img = document.createElement('img');
  img.className = 'playercard';
  img.id = name + 'card' + c;
  img.src = suit + rank + '.png';
	document.getElementById(name).appendChild(img);
  target=document.getElementById(name + 'card' + c);
  target.style.width='45%';
  target.style.height='45%';
}

function CreateCardBack(name, c){
  var img = document.createElement('img');
  img.className = 'playercard';
  img.id = name + 'card' + c;
  img.src = 'back.png';
	document.getElementById(name).appendChild(img);
  target=document.getElementById(name + 'card' + c);
  target.style.width='45%';
  target.style.height='45%';
}

function DealCards() {
  switch(tc) {
    case 0:
      gameBoard.deal();
      console.log(gameBoard.players);
      console.log(gameBoard.flop);
      console.log(gameBoard.turn);
      console.log(gameBoard.river);
      for(p = 0; p < gameBoard.players.length; p++){
        n = gameBoard.players[p].playerName;
        for(c = 0; c < 2; c++){
          s = gameBoard.players[p].playerCards[c].suit;
          r = gameBoard.players[p].playerCards[c].rank;
          if (gameBoard.players[p].reveal == false){
            CreatePlayerCard(s, r, n, c + 1);
          } else {
            CreateCardBack(n, c + 1);
          }
        }
      }
      tc = 1
      target=document.getElementById('dealButton');
      target.value='Deal Flop';
      break;
    case 1:
      CreateTableCard(gameBoard.flop[0].suit, gameBoard.flop[0].rank);
      CreateTableCard(gameBoard.flop[1].suit, gameBoard.flop[1].rank);
	    CreateTableCard(gameBoard.flop[2].suit, gameBoard.flop[2].rank);
      target=document.getElementById('dealButton');
      target.value='Deal Turn';
      break;
    case 4:
      CreateTableCard(gameBoard.turn[0].suit, gameBoard.turn[0].rank);
      target=document.getElementById('dealButton');
      target.value='Deal River';
      break;
    case 5:
      CreateTableCard(gameBoard.river[0].suit, gameBoard.river[0].rank);
      target=document.getElementById('dealButton');
      target.value='Next Round';
      break;
    case 6:
      target=document.getElementById('dealButton');
      target.value='Deal Flop';
      gameBoard.deal();
      console.log(gameBoard.players);
      console.log(gameBoard.flop);
      console.log(gameBoard.turn);
      console.log(gameBoard.river);
      for (x = 1; x < tc; x++) {
	      var element = document.getElementById('card' + x);
        document.getElementById('table').removeChild(element);
      }
      for(p = 0; p < gameBoard.players.length; p++){
        n = gameBoard.players[p].playerName;
        for(c = 0; c < 2; c++){
          y = c + 1;
          var element = document.getElementById(n + 'card' + y);
          document.getElementById(n).removeChild(element);
          s = gameBoard.players[p].playerCards[c].suit;
          r = gameBoard.players[p].playerCards[c].rank;
          if (gameBoard.players[p].reveal == false){
            CreatePlayerCard(s, r, n, c + 1);
          } else {
            CreateCardBack(n, c + 1);
          }
        }
      }
      tc = 1
      break;
  }
} 

let gameBoard = new Board();
gameBoard.enterPlayer('Aaron');
gameBoard.enterPlayer('Ben');
gameBoard.enterPlayer('Jim');
gameBoard.enterPlayer('Nathan');

/****************************
 * Declare DB varibles
 ****************************/
var db = openDatabase("PokerDB","1.0","", 2*1024*1024)

/******************************
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM players', [], function(tx, results) {
      var len=results.rows.length;
      var i;
      for(i=0; i<len; i++) {
        //Set values coming from the database
        console.log(results.rows.item(i).card2);
        var p = document.createElement('p');
        p.innerText = results.rows.item(i).card2
        document.getElementById('table').appendChild(p);
      }
    });
  }); 
*/
 
