// JavaScript source code

var MAX_ATTEMPTS = 3;

var currentSecretWord;
var scoreLoaded = false;

// create a player objet, to hold all the variables associated with a player--rr
var player = {
    name: "",
    score: 0,
    guesses: 0,
    finalScore: 0
}

// set the player object back to its defaults
function resetPlayer() {
    player.name = "";
    player.score = 0;
    player.guesses = 0;
    player.finalScore = 0;
}

// this function generates a random number and picks one of the items out of the array we declared above.
// the function returns a object with two properties which are strings (word, and hint);
function GetSecretWord() {
  
    max = secretWords.length;
  var rand = Math.random() * max;
  var randIndex = Math.floor(rand);
  return secretWords[randIndex];
}

// this function is currently assigned to the OnLoad event of the body of the document.  So when the OnLoad event fires off
// for the body of the html document, the code in this function will automatically execute.
function OnLoad() {
  currentSecretWord = GetSecretWord();
  document.getElementById('hintbox').innerHTML = "<p>" + currentSecretWord.hint + "</p>";
  player.guesses = MAX_ATTEMPTS;
  // Focus back on the text input for the next question. --Korey
  document.getElementById('txtGuess').focus();
}

function CheckWord() {
  var word = document.getElementById('txtGuess').value;

  if (word.toLowerCase() == currentSecretWord.word) {
    updateScore(true);
    displayResult(true);

    // Remove that question and go to another question.
    // Also, reset the text field to be blank. --Korey
    var completed = secretWords.indexOf(currentSecretWord);
    if (completed !== -1) {
      secretWords.splice(completed, 1);
    }
    document.getElementById('txtGuess').value = "";
    OnLoad();

  } else {
    updateScore(false);
    displayResult(false);

    // After wrong answer, focus and select the text in the text field. --Korey
    document.getElementById('txtGuess').select();
  }
}

function updateScore(result) {
  // display score div if not yet displayed
  if (scoreLoaded == false) {
    loadScoreDiv();
    scoreLoaded = true;
  }

  // logic for correct answer
  if (result) {
    player.score++;
  }
  // logic for incorrect answer
  else {
    player.guesses -= 1;
    if(player.guesses <= 0) {
      finalScore = player.score;
      player.score = 0;
    }
  }
  document.getElementById('scorebox').innerHTML = "Score: " + player.score;
}

function loadScoreDiv() {

  var scoreDiv = document.getElementById('scorebox');
  var topOffset = -60; //push the element above the viewport
  scoreDiv.style.top = topOffset;
  scoreDiv.style.display = "block";
  var loadScore = setInterval(function () {
    topOffset += 1;
    scoreDiv.style.top = topOffset + "px";
    if (topOffset >= 0) {
      clearInterval(loadScore);
    }
  }, 5);
}

function displayResult(result) {
  var resultDiv = document.getElementById('resultbox');
  var resultDivText = document.getElementById('resultText');
  var guessesDivText = document.getElementById('guessesText');
  var submitButton = document.getElementById('submit');
  var restartButton = document.getElementById('restart');
  resultDiv.style.display = 'block';
  submitButton.disabled = true;
  if (result) {
    resultDivText.innerHTML = 'Correct!';
    resultDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';

  } else {
    if (player.guesses > 0) {
      resultDivText.innerHTML = 'Incorrect!';
      guessesDivText.innerHTML = 'You have ' + player.guesses + ' guesses left.';
      resultDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    } else {
      resultDivText.innerHTML = 'GAME OVER';
      guessesDivText.innerHTML = 'Final Score: ' + player.finalScore;
      restartButton.style.display = "inline";
      return;
    }
  }
  setTimeout(function () {
    resultDivText.innerHTML = '';
    guessesDivText.innerHTML = '';
    resultDiv.style.display = 'none';
    submitButton.disabled = false;
  }, 2000);
}

function restartGame() {
  var resultDiv = document.getElementById('resultbox');
  var submitButton = document.getElementById('submit');
  var restartButton = document.getElementById('restart');
  resultDiv.style.display = 'none';
  submitButton.disabled = false;
  restartButton.style.display = 'none';
  resetPlayer();
  OnLoad();
}
