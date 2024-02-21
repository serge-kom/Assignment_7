// Variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// DOM Elements
let questionsEl = document.getElementById('questions');
let choicesEl = document.getElementById('choices');
let feedbackEl = document.getElementById('feedback');
let finalScoreEl = document.getElementById('final-score');
let initialsEl = document.getElementById('initials');
let startBtn = document.getElementById('start');
let submitBtn = document.getElementById('submit');
let clearBtn = document.getElementById('clear');

// Sound Effects
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

// Functions
function startQuiz() {
  document.getElementById('start-screen').classList.add('hide');
  questionsEl.classList.remove('hide');
  timerId = setInterval(clockTick, 1000);
  document.getElementById('time').textContent = time;
  getQuestion();
}

function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  document.getElementById('question-title').textContent = currentQuestion.title;
  choicesEl.innerHTML = '';

  currentQuestion.choices.forEach(function(choice, index) {
    let choiceButton = document.createElement('button');
    choiceButton.textContent = choice;
    choiceButton.setAttribute('value', choice);
    choiceButton.onclick = questionClick;
    choicesEl.appendChild(choiceButton);
  });
}

function questionClick(event) {
  let userChoice = event.target.value;
  let correctAnswer = questions[currentQuestionIndex].answer;

  if (userChoice === correctAnswer) {
    time += 5; // Add 5 seconds for a correct answer
    sfxRight.play();
    feedbackEl.textContent = "Correct!";
  } else {
    time -= 15; // Subtract 15 seconds for a wrong answer
    if (time < 0) {
      time = 0;
    }
    sfxWrong.play();
    feedbackEl.textContent = "Wrong!";
  }

  feedbackEl.classList.remove('hide');
  setTimeout(function() {
    feedbackEl.classList.add('hide');
  }, 500);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || time === 0) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function clockTick() {
  time--;
  document.getElementById('time').textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function quizEnd() {
  clearInterval(timerId);
  questionsEl.classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');
  finalScoreEl.textContent = time;
}

function saveHighScore() {
  let initials = initialsEl.value.trim();

  if (initials !== '') {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials: initials, score: time });
    localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighScore();
  }
}

// Event Listeners
submitBtn.onclick = saveHighScore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;