const categories = {
      "General Knowledge": [
        { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
        { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 }
      ],
      "Science": [
        { question: "What is the chemical symbol for water?", answers: ["O2", "H2O", "CO2", "HO2"], correct: 1 },
        { question: "What planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 }
      ],
      "History": [
        { question: "Who was the first President of the United States?", answers: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
        { question: "In which year did World War II end?", answers: ["1939", "1945", "1941", "1950"], correct: 1 }
      ],
      "Geography": [
        { question: "What is the largest country by area?", answers: ["USA", "China", "Russia", "India"], correct: 2 },
        { question: "Which continent is the Sahara Desert located on?", answers: ["Africa", "Asia", "Europe", "Australia"], correct: 0 }
      ]
    };

    let currentCategory = "";
    let currentQuestionIndex = 0;
    let score = 0;
    let timeRemaining = 15;
    let timer;

    function startGame(category) {
      currentCategory = category;
      currentQuestionIndex = 0;
      score = 0;
      timeRemaining = 15;
      document.querySelector('.home-container').style.display = "none";  // Hide home screen
      document.querySelector('.game-container').style.display = "block";  // Show game screen
      document.querySelector('.game-over-container').style.display = "none"; // Hide game over screen

      loadQuestion();
    }

    function loadQuestion() {
      const question = categories[currentCategory][currentQuestionIndex];
      document.getElementById('question').textContent = question.question;
      const buttons = document.querySelectorAll('.answer-button');
      buttons.forEach((button, index) => {
        button.textContent = question.answers[index];
        button.disabled = false;
        button.classList.remove("correct", "wrong");
      });

      document.getElementById('result').style.display = "none"; // Hide result message
      startTimer();
    }

    function startTimer() {
      timeRemaining = 15; // Reset the timer for every question
      document.getElementById('time').textContent = timeRemaining;
      timer = setInterval(function() {
        timeRemaining--;
        document.getElementById('time').textContent = timeRemaining;
        if (timeRemaining <= 0) {
          clearInterval(timer);
          checkAnswer(-1); // Show correct answer when time is up
        }
      }, 1000);
    }

    function checkAnswer(selectedIndex) {
      clearInterval(timer);  // Stop the timer
      const question = categories[currentCategory][currentQuestionIndex];
      const buttons = document.querySelectorAll('.answer-button');
      buttons.forEach(button => button.disabled = true); // Disable all buttons

      let message = "";
      if (selectedIndex === question.correct) {
        score++;
        message = "Correct!";
        buttons[selectedIndex].classList.add("correct");
      } else if (selectedIndex === -1) {
        message = "Time's up! The correct answer was: " + question.answers[question.correct];
        buttons[question.correct].classList.add("correct");
      } else {
        message = "Wrong answer! The correct answer was: " + question.answers[question.correct];
        buttons[selectedIndex].classList.add("wrong");
        buttons[question.correct].classList.add("correct");
      }

      document.getElementById('result-message').textContent = message;
      document.getElementById('score').textContent = score;
      document.getElementById('result').style.display = "block";  // Show result
    }

    function nextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex < categories[currentCategory].length) {
        loadQuestion();
      } else {
        showGameOverScreen();
      }
    }

    function showGameOverScreen() {
      document.querySelector('.game-container').style.display = "none"; // Hide game screen
      document.querySelector('.game-over-container').style.display = "block"; // Show game over screen
      document.getElementById('final-score-message').textContent = "Your score: " + score;
    }

    function goBackHome() {
      document.querySelector('.home-container').style.display = "block";  // Show home screen
      document.querySelector('.game-over-container').style.display = "none"; // Hide game over screen
      document.querySelector('.game-container').style.display = "none"; // Hide game screen
    }