// ******** Global variables declaration ****************
let currentUrl = window.location.href;
let userInputWordCount = 0;
let word_length;
let attempt_setting;
let chosenWord; //word chosen by the server
let alphabets = ["a", "b", "d", "e", "f", "g",
    "h", "i", "k", "l", "m", "n",
    "o", "p", "r", "s", "t", "w"];
// *********************************************************

/* Show the body after the page is fully loaded */
window.onload = function() {
    document.body.style.display = "block";
};



//***************** gameplay page js **************************
    // add the input buttons first dynamically (to clean up gameplay html page)
    // the button labels are temporarily named 1-18, updated later
    const inputButtons = document.querySelector(".random-words");
    for (let i = 1; i <= 18; i++) {
        const button = document.createElement('button');
        button.classList.add('input');
        button.textContent = i;
        inputButtons.appendChild(button);
    }

    // ******** variable declaration ***********
    const buttons = document.getElementsByClassName("input");
    const gameplay_attempts_left = document.getElementById("gameplay-attempts-left");
    const resetButton = document.getElementById("new-word-button")
    const gameHomeButton = document.getElementById("gameplay-home-button")
    const guessButton = document.getElementById("guessit");
    const eraseButton = document.getElementById("erase");
    let guessedWord = "";
    let userAnswer = new Array()
    // ****************************************

    // get the settings set by the user in the settings page, update the relevant variables
    if (localStorage.getItem("attempts") != null) {
        attempt_setting = localStorage.getItem("attempts");
    }
    else {
        attempt_setting = '3'
    }

    if (localStorage.getItem("word-length") != null) {
        word_length = localStorage.getItem("word-length");
    }
    else {
        word_length = '4'
    }

    // ******** debug tools ***********
    console.log("starting stats")
    console.log("   attempt_setting:", attempt_setting)
    console.log("   word_length:", word_length)
    // ********************************
    let attempts_left = attempt_setting

    // update the attempts left DOM element
    gameplay_attempts_left.textContent = "Attempts left: " + attempts_left

    // dynamically changing the style of userInput div based on the length of the word
    let userInputElement = document.querySelector(".user-input");
    if (word_length === '3') {
        userInputElement.style.marginLeft = "-100px"
    }
    else if (word_length === '4') {
        userInputElement.style.marginLeft = "-120px"
    }
    else {
        userInputElement.style.marginLeft = "-140px"
    }

    // adding the DOM element where the user chosen letters will be displayed
    for ( let i = 0; i < parseInt(word_length); i++) {
        const label = document.createElement("label");
        label.setAttribute("id", "input-"+(i+1));
        label.textContent = "_";
        userInputElement.appendChild(label);
        label.style.marginRight = '20px';
    }

    // calling for a word to the server
    fetchWord(word_length)
        .then(word => {
            for (let i = 0; i < buttons.length; i++) {
                // first thing to do is to update the input buttons which were labeled 1-18 previously
                buttons[i].textContent = alphabets[i]

                buttons[i].addEventListener("click", function() {
                    userInputWordCount += 1

                    const userChosenLetter = this.textContent;
                    // check if the no. of letters (user input) is <= to the length of the word
                    if ( userInputWordCount <= parseInt(word_length)) {
                        // disabling the button when it is clicked once
                        buttons[i].disabled = true

                        for (let j = 0; j < word.length; j++) {
                            const userInputDisplay = document.getElementById("input-"+(j+1))
                            // updating the DOM element where the user chosen letters are displayed
                            if (userInputDisplay.textContent === "_") {
                                userInputDisplay.textContent = userChosenLetter
                                // updating the userAnswer array with the confirmed chosen letter
                                userAnswer.push(userChosenLetter)
                                // this is necessary since I only want to update the label of first button with "_"
                                break;
                            }
                        }
                    }
                    // update the label of clicked button to "-" to indicate the letter has been chosen
                    this.textContent = "-"
                });
            }
        })

    // when the guess button is clicked
    guessButton.addEventListener("click", function (){
        // reset the word counter to 0
        userInputWordCount = 0;

        guessedWord = ""
        let isWordLengthValid = true;
        let addToAttemptHistory = true;
        if (attempts_left < 1) {
            alert("You have used all the attempts!")
        }
        else {
            for (let j = 0; j < parseInt(word_length); j++) {
                const userInputDisplay = document.getElementById("input-"+(j+1))
                if (userInputDisplay.textContent === "_") {
                    alert("Please select all the letters of the word first")
                    isWordLengthValid = false;
                    addToAttemptHistory = false;
                    break;
                }
                else {
                    // otherwise update the guessedWord with each letter
                    guessedWord += userInputDisplay.textContent
                }
            }
            if (isWordLengthValid && attempts_left >0) {
                if (guessedWord === chosenWord) {
                    addToAttemptHistory = false // no need to add when the guess is correct
                    let result = confirm("Amazing!\nYou've successfully guessed the word!" +
                        "It was indeed \"" + chosenWord.toUpperCase()+"\"!" +
                        "\nWould you like to try a new word?")
                    // if user chose "confirm"
                    if (result === true ){
                        attempts_left = reset(attempts_left, gameplay_attempts_left)
                        updateRandomList(buttons)
                        userAnswer.length = 0
                    }
                    // otherwise go back to home page
                    else {
                        goBackHome();
                    }
                }
                else {
                    if(attempts_left <= 1) {
                        addToAttemptHistory = false
                        let result = confirm("Sorry :( You used up all the attempts." +
                            "\nThe word to be guessed was \"" + chosenWord.toUpperCase()+
                            "\"\nWould you like to try guessing another word?")
                        if (result === true) {
                            attempts_left = reset(attempts_left, gameplay_attempts_left)
                            updateRandomList(buttons)
                            userAnswer.length = 0
                        }
                        else {
                            goBackHome();
                        }
                    }
                }
                // array to hold the current user answer temporarily
                let tempArray = chosenWord.split("")
                for (let j = 0; j < word_length; j++) {
                    const userInputDisplay = document.getElementById("input-"+(j+1))
                    // if the dom element is not green, update the button label to "_"
                    if(userInputDisplay.style.background !== "green"){
                        tempArray[j] = userInputDisplay.textContent
                        userInputDisplay.textContent = "_"
                    }
                    else {
                        userAnswer = tempArray
                    }
                }
            }

            // enabling all the disabled buttons
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].textContent = alphabets[i]
            }

            // add the answer to attempts history DOM element
            if (addToAttemptHistory) {
                console.log("UserAnswer:", userAnswer)
                // update attempts left and the DOM element relating to it
                attempts_left = (parseInt(attempts_left)-1).toString()
                gameplay_attempts_left.textContent = "Attempts left: " + attempts_left

                const answerDiv = document.getElementById("answer_container")
                const div = document.createElement("div");
                let index = 0

                for (let i = 0; i < word_length; i++) {
                    const userInputDisplay = document.getElementById("input-"+(i+1))

                    // creating new label element to add to attempt history
                    const label = document.createElement("label")
                    label.textContent = guessedWord[i]
                    if (label.textContent === chosenWord[i]) {
                        label.style.background = "green";
                        alphabets[alphabets.indexOf(guessedWord[i])] = "_"
                        updateRandomList(buttons)
                        userInputDisplay.textContent = chosenWord[i]
                        userInputDisplay.style.background = "green";
                    }
                    else if (chosenWord.indexOf(userAnswer[i]) !== -1) {
                        index = alphabets.indexOf(userAnswer[i])
                        // every instance of letter at index should be enabled
                        while(index !== -1) {
                            buttons[alphabets.indexOf(userAnswer[i])].disabled = false
                            index = alphabets.indexOf(userAnswer[i], index+1)
                        }
                        label.style.background = "yellow"
                    }
                    // otherwise just update the array with "_"
                    else {
                        alphabets[alphabets.indexOf(userAnswer[i])] = "_"
                        updateRandomList(buttons)
                    }
                    // finally add the label to the div crated before
                    div.appendChild(label)


                }
                // add the div to the attempt history container
                answerDiv.appendChild(div)
                userAnswer.length = 0
            }

        }
    })

    // when erase button is clicked
    eraseButton.addEventListener("click", function (){
        // update the counter when erased
        if ( (userInputWordCount-1) >= 0){
            userInputWordCount -= 1
        }
        for (let j = word_length-1; j > -1; j--) {
            const inputI = document.getElementById("input-"+(j+1))
            // enable the button again
            if (inputI.textContent !== "_") {
                buttons[alphabets.indexOf(userAnswer[j])].disabled = false
                buttons[alphabets.indexOf(userAnswer[j])].textContent = userAnswer[j]
                inputI.textContent = "_"
                break;
            }
        }
        // remove the erased letter from the array
        userAnswer.pop();
    })

    // when the reset button is clicked
    resetButton.addEventListener("click", function() {
        let result = confirm("Are you sure you want to reset?\nCurrent progress will be lost 😬")
        if (result === true) {
            attempts_left = reset(attempts_left, gameplay_attempts_left)
            updateRandomList(buttons)
            userAnswer.length = 0
        }
    })

    // when the home button is clicked
    gameHomeButton.addEventListener("click", function() {
        let result = confirm("Are you sure you want proceed to home page?\nCurrent progress will be lost😬")
        if (result === true) {
            goBackHome()
        }
    })




// *************************** helper functions ***************************

// shuffles the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// updates the array with the chosen word and shuffles the array again
function updateArrayW(word) {
    for (let z = 0; z < word.length; z++) {
        alphabets[z] = word[z]
    }
    alphabets = shuffleArray(alphabets)
}

// when reset button is clicked
function reset(attempts_left, gameplay_attempts_left) {
    // resetting variable to default values
        userInputWordCount = 0
        attempts_left = attempt_setting
        gameplay_attempts_left.textContent = "Attempts left: " + attempts_left
    // ************************************

    // first remove all the answers in that may be in the attempt history
    const answerContainerDiv = document.getElementById("answer_container");
    while (answerContainerDiv.firstChild) {
        answerContainerDiv.removeChild(answerContainerDiv.firstChild);
    }

    const buttons = document.getElementsByClassName("input");
    const h3 = document.createElement("h3");
    const text = document.createTextNode("Attempt history");
    h3.appendChild(text)
    answerContainerDiv.append(h3)

    // reset the alphabets array to default
    alphabets = ["a", "b", "d", "e", "f", "g",
        "h", "i", "k", "l", "m", "n",
        "o", "p", "r", "s", "t", "w"];

    // call to server and update the chosen word with the received word
    fetchWord(word_length)
        .then(word => {
            // resetting the input buttons with the original alphabets and enabling the buttons
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].textContent = alphabets[i]
                buttons[i].disabled = false
            }
        })

    // resetting the user input answer display DOM element's labels
    for (let j = 0; j < word_length; j++) {
        const inputI = document.getElementById("input-" + (j + 1))
        inputI.textContent = "_"
        inputI.style.background = "none";
    }

    return attempts_left
}

// update the buttons' label with the shuffled alphabets array elements
function updateRandomList(buttons){
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = alphabets[i].toLowerCase()
    }
}

// go back to home page
function goBackHome() {
    window.location.href = "/home.html";
}

// export {fetchWord};