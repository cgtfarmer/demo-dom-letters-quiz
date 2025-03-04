const NOTIFICATION_DURATION_MILLIS = 1000;

const domElements = {
  question: document.querySelector('#question'),
  answerInput: document.querySelector('#answer-input'),
  guesses: document.querySelector('#guesses'),
  correct: document.querySelector('#correct'),
  incorrect: document.querySelector('#incorrect'),
  accuracy: document.querySelector('#accuracy'),
  correctMsg: document.querySelector('#correct-msg'),
  incorrectMsg: document.querySelector('#incorrect-msg')
};

const state = {
  currentCard: undefined,
  guessCount: undefined,
  correctGuessCount: undefined,
  incorrectGuessCount: undefined,
  currentGuessAccuracy: undefined
};

const flashCards = [
  { q: 'A', a: 'a' },
  { q: 'B', a: 'b' },
  { q: 'C', a: 'c' },
  { q: 'D', a: 'd' },
  { q: 'E', a: 'e' },
  { q: 'F', a: 'f' },
  { q: 'G', a: 'g' },
  { q: 'H', a: 'h' },
  { q: 'I', a: 'i' },
  { q: 'J', a: 'j' },
  { q: 'K', a: 'k' },
  { q: 'L', a: 'l' },
  { q: 'M', a: 'm' },
  { q: 'N', a: 'n' },
  { q: 'O', a: 'o' },
  { q: 'P', a: 'p' },
  { q: 'Q', a: 'q' },
  { q: 'R', a: 'r' },
  { q: 'S', a: 's' },
  { q: 'T', a: 't' },
  { q: 'U', a: 'u' },
  { q: 'V', a: 'v' },
  { q: 'W', a: 'w' },
  { q: 'X', a: 'x' },
  { q: 'Y', a: 'y' },
  { q: 'Z', a: 'z' }
];

function main() {
  reset();
}

function reset() {
  state.guessCount = 0;
  state.correctGuessCount = 0;
  state.incorrectGuessCount = 0;
  state.currentGuessAccuracy = 1;
  domElements.answerInput.value = null;

  hideNotifications();

  state.currentCard = getRandomCard();
  renderState();
}

function getRandomCard() {
  const randomIndex = getRandomInt(0, flashCards.length);
  console.log(`Random Index: ${randomIndex}`);

  return flashCards[randomIndex];
}

function renderState() {
  domElements.question.innerHTML = state.currentCard.q;
  domElements.guesses.innerHTML = state.guessCount;
  domElements.correct.innerHTML = state.correctGuessCount;
  domElements.incorrect.innerHTML = state.incorrectGuessCount;
  domElements.accuracy.innerHTML = Math.round(state.currentGuessAccuracy * 100);
}

function guess() {
  hideNotifications();

  state.guessCount += 1;

  if (!answerIsCorrect()) {
    handleIncorrectGuess()

    return;
  }

  handleCorrectGuess();
}

function handleCorrectGuess() {
  state.correctGuessCount += 1;

  domElements.answerInput.value = null;

  domElements.correctMsg.hidden = false;
  setTimeout(hideNotifications, NOTIFICATION_DURATION_MILLIS);

  state.currentGuessAccuracy = (state.correctGuessCount / state.guessCount);

  state.currentCard = getRandomCard();

  renderState();
}

function handleIncorrectGuess() {
  state.incorrectGuessCount += 1;

  domElements.answerInput.value = null;

  domElements.incorrectMsg.hidden = false;

  setTimeout(hideNotifications, NOTIFICATION_DURATION_MILLIS);

  state.currentGuessAccuracy = (state.correctGuessCount / state.guessCount);

  renderState();
}

function answerIsCorrect() {
  console.log(`question=${state.currentCard.q}, answer=${state.currentCard.a}, userInput=${domElements.answerInput.value}`);

  if (!domElements.answerInput.value) return false;

  const sanitizedInput = domElements.answerInput.value.toLowerCase();

  return (sanitizedInput == state.currentCard.a);
}

function hideNotifications() {
  domElements.correctMsg.hidden = true;
  domElements.incorrectMsg.hidden = true;
}

function getRandomInt(min, max) {
  // min = inclusive, max = exclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  // min = inclusive, max = inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();
