window.onload = function() {
    //Create an array to display the alphabet to the user
    var alphabetBoard = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    // create the alphabetButtons
    function alphabetButtons() {
            myButtons = document.getElementById("buttons");
            letters = document.createElement("ul");

            for (var i = 0; i < alphabetBoard.length; i++) {
                letters.id = "alphabetBoard";
                list = document.createElement("li");
                list.id = "letter";
                list.innerHTML = alphabetBoard[i];
                check();
                myButtons.appendChild(letters);
                letters.appendChild(list);
            }
    };

    // Category to be displayed to the user
    function randomCategory() {
      if (pcRandomCategory === puzzleWords[0]) {
        categoryName.innerHTML =
          "The chosen category is: FRUITS";
      } else if (pcRandomCategory === puzzleWords[1]) {
        categoryName.innerHTML = "The chosen category is: COUNTRIES";
      } else if (pcRandomCategory === puzzleWords[2]) {
        categoryName.innerHTML = "The chosen category is: CITIES";
      }
    };

    // Create all the guesses for the ul
    function displayPCWord() {
      wordHolder = document.getElementById("hold");
      correctGuessLetter = document.createElement("ul");

      for (var i = 0; i < word.length; i++) {
        correctGuessLetter.setAttribute("id", "my-word");
        guess = document.createElement("li");
        guess.setAttribute("class", "guess");
        //the IF below will check if the PCWord has a '-' in between
        if (word[i] === "-") {
          guess.innerHTML = "-";
          space = 1;
        } else {
          guess.innerHTML = "_";
        }

        guesses.push(guess);
        wordHolder.appendChild(correctGuessLetter);
        correctGuessLetter.appendChild(guess);
      }
    };

    // Show lives
    // Get the element to display lives left in the game
    var showLives = document.getElementById("livesLeft");;
    var showWins = document.getElementById("winholder");
    var showLosses = document.getElementById("lossesholder");


    //Counters
    var reset = {
        Wins : 0,
        Loss : 0
    }


    function displayGameButtons() {
        //document.getElementById('reset').style.visibility='visible';
        document.getElementById('playAgain').style.visibility='visible';
    }

    function keepGuessing() {
       showLives.innerHTML = "You have " + lives + " guesses left.";
        if (lives < 1) {
            reset.Loss++;
            console.log(reset.Loss);
            showLosses.innerHTML = reset.Loss;
            wordHolder.removeChild(correctGuessLetter);

            var pcWord = word.toUpperCase();
            showLives.setAttribute("class", "text-danger");
            showLives.innerHTML = "Game Over, the computer was thinking about " + pcWord + ".";
            displayGameButtons();
        }

        for (var i = 0; i < guesses.length; i++) {
            if (correctGuessesCounter + space === guesses.length) {

            showWins.innerHTML = reset.Wins;
            console.log(reset.Wins);
            displayGameButtons();
            showLives.innerHTML = "You Win!";
            }
        }
    };

    // OnClick Function
    check = function() {
        list.onclick = function() {
                var liButtonClicked = this.innerHTML;
                this.setAttribute("class", "active disabled");
                this.onclick = null;
                for (var i = 0; i < word.length; i++) {
                    if (word[i] === liButtonClicked) {
                        guesses[i].innerHTML = liButtonClicked;
                        correctGuessesCounter += 1;
                    }
                }
                var j = word.indexOf(liButtonClicked);
                if (j === -1) {
                    lives -= 1;
                    keepGuessing();
                    } else {
                    keepGuessing();
                }
            }

    };

    // Play
    play = function() {

      //Create a set of arrays for the puzzle words to be
      //used by the computer.
      puzzleWords = [
        ["banana", "strawberry","grape","apple","orange","plums","nectarine","watermelon","pear","melon","tangerine","mango","peach"],
        ["mexico", "japan", "canada", "china", "korea", "spain","france","italy","turkey","pakistan","england","ireland","russia","colombia","ecuador","belize","irak","iran","turkey","honduras","panama","venezuela","brasil","argentina"],
        ["manchester", "milan", "madrid", "amsterdam", "prague","paris","london","kabul","istanbul","rome","miami","houston","new-york","barcelona","liverpool","tokyo","shanghai"]
      ];

      //document.getElementById('reset').style.visibility='hidden';
      document.getElementById('playAgain').style.visibility='hidden';
      //Pick one of the 3 Arrays inside the puzzleWords
      pcRandomCategory = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
      //Using the previous array, randomize a word for the HANGMAN.
      word = pcRandomCategory[Math.floor(Math.random() * pcRandomCategory.length)];
      word = word.replace(/\s/g, "-");
      //Call the function below to display the alphabet on the screen.

      alphabetButtons();

      guesses = []; //Create an array to hold the guesses
      lives = 4;   // Give the user 10 lives by default
      correctGuessesCounter = 0; //A counter for the wins
      space = 0;    //This space is to help us with words containing '-'
      displayPCWord(); //Display the HANGMAN Word spaces ( _ _ _ _ _ )
      keepGuessing();  //Display the different lives left, or Win/Lose outcome.
      randomCategory(); //Give a hint to the user as to which category hangman is using
    };

    play();

    function res() {
        wordHolder.removeChild(correctGuessLetter);
        play(); //
    }
    // Reset
    // document.getElementById("reset").onclick = function() {
    //   correctGuessLetter.parentNode.removeChild(correctGuessLetter);
    //   letters.parentNode.removeChild(letters);
    //   play();
    // };
  };