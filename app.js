/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, previousRoll;
var winScore = "50";

function setWinningScore() {
   winScore = document.getElementById('rInput').value;
   console.log(winScore);
   document.getElementById('currentWinScore').textContent = 'Current win score: ' + winScore;
}
document.querySelector('.input-button').addEventListener('click', setWinningScore);

// Initialize new game function

function init() {
gamePlaying = true;
scores = [0, 0] ;
roundScore = 0;
activePlayer = 0;
document.querySelector('.dice-one').style.display = 'none';
document.querySelector('.dice-two').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

init();

function nextPlayer() {
   //next player
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
  
}

// "Roll" button

document.querySelector('.btn-roll').addEventListener('click', function(){
   if(gamePlaying) {
      // 1. Random number
      diceOne = Math.floor(Math.random() * 6) + 1;
      diceTwo = Math.floor(Math.random() * 6) + 1;
      // 2. Display the result
      var diceDOMone = document.querySelector('.dice-one');
      var diceDOMtwo = document.querySelector('.dice-two');
      diceDOMone.style.display = 'block';
      diceDOMone.src = 'img/dice-'+ diceOne +'.png';
      diceDOMtwo.style.display = 'block';
      diceDOMtwo.src = 'img/dice-'+ diceTwo +'.png';
      // 3. Update the round score IF the rolled number was not a 1
         if (diceOne !== 1 && diceTwo !==1) {
            //add score
            roundScore += (diceOne+diceTwo);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
         }  else {
            nextPlayer();
      }
   }
});

// "hold" button

document.querySelector('.btn-hold').addEventListener('click', function(){
   if(gamePlaying) {
      // add current score to global score
      scores[activePlayer] += roundScore;
      // update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores [activePlayer];
      // check if player won the game
      if (scores[activePlayer] >= winScore) {
         document.querySelector('#name-' +  activePlayer).textContent = 'Winner!';
         document.querySelector('.dice-one').style.display = 'none'; // better to create an 'active' class
         document.querySelector('.dice-two').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         gamePlaying = false;
      } else {
         nextPlayer();
      }
   }
});

// "new game" button
document.querySelector('.btn-new').addEventListener('click', init);












