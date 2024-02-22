
// add variables that keep track of the quiz "state"

let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// add variables to reference DOM elements

let questionsEl = document.getElementById('questions');
let choicesEl = document.getElementById('choices');
let feedbackEl = document.getElementById('feedback');
let finalScoreEl = document.getElementById('final-score');
let initialsEl = document.getElementById('initials');
let startBtn = document.getElementById('start');
let submitBtn = document.getElementById('submit');
let clearBtn = document.getElementById('clear');

// reference the sound effects

let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

// Functions
function startQuiz() {
  
  // hide start screen
  document.getElementById('start-screen').classList.add('hide');
  // un-hide questions section
  questionsEl.classList.remove('hide');
    // start timer
  timerId = setInterval(clockTick, 1000);
  
  // show starting time
  document.getElementById('time').textContent = time;
  // call a function to show the next question
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  
  let currentQuestion = questions[currentQuestionIndex]; 
  // update title with current question
  document.getElementById('question-title').textContent = currentQuestion.title;
  // loop over the choices for each question
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
   // identify the targeted button that was clicked on
  let userChoice = event.target.value;
  let correctAnswer = questions[currentQuestionIndex].answer;

  // if the clicked element is not a choice button, do nothing.

  if (userChoice === correctAnswer) {
    // check if user guessed wrong
    time += 5; // Add 5 seconds for a correct answer
    sfxRight.play();
    feedbackEl.textContent = "Correct!";
  } else {
    time -= 15; // Subtract 15 seconds for a wrong answer
    // recall the timer is the score they get at the end
    if (time < 0) {
      time = 0;
    }
    // if they run out of time (i.e., time is less than zero) set time to zero so we can end quiz
    sfxWrong.play();
    feedbackEl.textContent = "Wrong!";
  }
  // display new time on page

  // play "wrong" sound effect

  // display "wrong" feedback on page


  // play "right" sound effect

  // display "right" feedback on page by displaying the text "Correct!" in the feedback element
 // flash right/wrong feedback on page for half a second
 // set the feedback element to have the class of "feedback"


  feedbackEl.classList.remove('hide');
  setTimeout(function() {
    feedbackEl.classList.add('hide');
  }, 500);
  // after one second, remove the "feedback" class from the feedback element

 // move to next question

  currentQuestionIndex++;
  // check if we've run out of questions
 // if the time is less than zero and we have reached the end of the questions array,


  if (currentQuestionIndex === questions.length || time === 0) {
  // call a function that ends the quiz (quizEnd function)
 
    quizEnd();
  }
  // or else get the next question
   else {
    getQuestion();
  }
}
// add the code in this function to update the time, it should be called every second
function clockTick() {
  // right here - update time
  time--;
  
  // update the element to display the new time value
  document.getElementById('time').textContent = time;
  // check if user ran out of time; if so, call the quizEnd() function
  if (time <= 0) {
    quizEnd();
  }
}
// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  // stop the timer
  clearInterval(timerId);
  // stop the timer
  questionsEl.classList.add('hide');
  // hide the "questions" section
  document.getElementById('end-screen').classList.remove('hide');
  // show final score
  finalScoreEl.textContent = time;
}
// complete the steps to save the high score

function saveHighScore() {
  

  // get the value of the initials input box
  let initials = initialsEl.value.trim();
  // make sure the value of the initials input box wasn't empty

  // if it is not, check and see if there is a value of high scores in local storage

  // if there isn't any, then create a new array to store the high score

  // add the new initials and high score to the array

  // convert the array to a piece of text

  // store the high score in local storage

  // otherwise, if there are high scores stored in local storage,
  // retrieve the local storage value that has the high scores,
  // convert it back to an array,


  if (initials !== '') {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials: initials, score: time });
    localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
  }
}
// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
  if (event.key === 'Enter') {
    saveHighScore();
  }
}

// Event Listeners
submitBtn.onclick = saveHighScore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;