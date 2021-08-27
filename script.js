'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const rollEl = document.querySelector('.btn--roll');
const newEl = document.querySelector('.btn--new');
const holdEl = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let currentScore0El = document.querySelector('#current--0');
let currentScore1El = document.querySelector('#current--1');

let currentScore, activePlayer, isPlaying, totalScore;

const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  isPlaying = true;
  diceEl.classList.add('hidden');
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollEl.addEventListener('click', function () {
  if (isPlaying) {
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdEl.addEventListener('click', function () {
  if (isPlaying) {
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    if (totalScore[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      isPlaying = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newEl.addEventListener('click', function () {
  init();
});
