let currentUrl = window.location.href;
let count = 0
let word_length = '4'
let attempt_setting = '3';
let chosenWord;
let currentWord = "";
let alphabets = ["a", "b", "d", "e", "f", "g",
    "h", "i", "k", "l", "m", "n",
    "o", "p", "r", "s", "t", "w"];


//***************** home page js **************************
if (currentUrl === "http://localhost:3000/index.html" || currentUrl === "http://localhost:3000/") {
    const beginButton = document.getElementById("begin-button")
    const settingsButton = document.getElementById("settings-button")
    const aboutButton = document.getElementById("about-button")

    beginButton.addEventListener("click", function () {
        window.location.href = "/gameplay.html";
    })

    settingsButton.addEventListener("click", function (){
        window.location.href = "/settings.html"
    })

    aboutButton.addEventListener("click", function (){
        window.location.href = "/about.html"
    })
}


//***************** settings page js **************************
if (currentUrl === "http://localhost:3000/settings.html") {
    const allowed_attempts = document.getElementById("allowed-attempts-number");
    const word_lengthId = document.getElementById("word-length-number")

    const settingDone = document.getElementById("settings-done-button")
    settingDone.addEventListener("click", function() {
        // console.log("from settings.html, attempts-settings:", allowed_attempts.value)
        localStorage.setItem("attempts", allowed_attempts.value)
        attempt_setting = allowed_attempts.value

        // console.log("from settings.html, word_length:", word_lengthId.value)
        localStorage.setItem("word-length", word_lengthId.value)
        word_length = word_lengthId.value
        window.location.href = "/index.html";
    })
}
//*************************************************************



//***************** gameplay page js **************************
else if (currentUrl === "http://localhost:3000/gameplay.html") {

    console.log("starting stats")
    console.log("   attempt_setting:", attempt_setting)
    console.log("   word_length:", word_length)

    const userInput = document.getElementsByClassName("user-input")

    const buttons = document.getElementsByClassName("input");
    const gameplay_attempts_left = document.getElementById("gameplay-attempts-left");

    const newWordButton = document.getElementById("new-word-button")
    const gameHomeButton = document.getElementById("gameplay-home-button")

    const guess = document.getElementById("guessit");
    const erase = document.getElementById("erase");
    let guessedWord = "";
    let userAnswer = new Array()

    if (localStorage.getItem("attempts")) {
        console.log("attempt setting was updated in settings page")
        attempt_setting = localStorage.getItem("attempts");
    }

    let attempts_left = attempt_setting

    if (localStorage.getItem("word-length")) {
        console.log("word length was updated in settings page")
        word_length = localStorage.getItem("word-length");
    }

    console.log("from gameplay, attempts_left: ", attempts_left)
    console.log("from gameplay, word_length: ", word_length)
    gameplay_attempts_left.textContent = "Attempts left: " + attempts_left


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
    for ( let i = 0; i < parseInt(word_length); i++) {

        const label = document.createElement("label");

        label.setAttribute("id", "input-"+(i+1));
        label.textContent = "_";
        userInputElement.appendChild(label);
        label.style.marginRight = '20px';
    }

    fetchWord(word_length)
        .then(word => {

            if(!buttons.length){
                console.log("No buttons found with class name 'input'")
            }else{

                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].textContent = alphabets[i]

                    buttons[i].addEventListener("click", function() {
                        count += 1
                        // Code to run when any button is clicked
                        const ranWord = this.textContent;
                        console.log("a button was clicked:", this.textContent)
                        if ( count <= parseInt(word_length)) {
                            buttons[i].disabled = true

                            for (let j = 0; j < word.length; j++) {
                                const inputI = document.getElementById("input-"+(j+1))
                                if (inputI.textContent === "_") {
                                    inputI.textContent = ranWord
                                    userAnswer.push(ranWord)
                                    break;
                                }
                            }
                            this.textContent = "-"
                        }

                    });
                }
            }
        })


    guess.addEventListener("click", function (){
        count = 0;
        console.log("attempts settings:", attempt_setting)
        guessedWord = ""
        let lean = true;
        let addOrNot = true;
        if (attempts_left < 1) {
            alert("You have used all the attempts!")
        }
        else {
            for (let j = 0; j < parseInt(word_length); j++) {
                const inputI = document.getElementById("input-"+(j+1))
                if (inputI.textContent === "_") {
                    alert("Please select all the letters of the word first")
                    lean = false;
                    addOrNot = false;
                    break;
                }
                else {
                    guessedWord += inputI.textContent
                }
            }
            if (lean && attempts_left >0) {
                if (guessedWord === chosenWord) {
                    addOrNot = false
                    currentWord = ""
                    let result = confirm("Amazing!\nYou've successfully guessed the word!It was indeed \"" + chosenWord.toUpperCase()+"\"!\nWould you like to try a new word?")
                    if (result === true ){
                        attempts_left = reset(attempts_left, gameplay_attempts_left)
                        updateRandomList(buttons)

                        userAnswer.length = 0
                    }
                    else {
                        goBackHome();
                    }
                }
                else {
                    if(attempts_left <= 1) {
                        addOrNot = false
                        currentWord = ""
                        let result = confirm("Sorry :( You used up all the attempts.\nThe word to be guessed was \"" + chosenWord.toUpperCase()+"\"\nWould you like to try guessing another word?")
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
                let tempArray = chosenWord.split("")
                for (let j = 0; j < word_length; j++) {
                    const inputI = document.getElementById("input-"+(j+1))
                    if(inputI.style.background !== "green"){
                        tempArray[j] = inputI.textContent
                        inputI.textContent = "_"
                    }
                    else {
                        console.log("here it happens:", userAnswer)
                        console.log("here it happens:   ", userAnswer[j], " + ", chosenWord[j])
                        userAnswer = tempArray
                    }
                }
            }

            // enabling all the falsely disabled buttons
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].textContent = alphabets[i]
            }

            if (addOrNot) {
                console.log("UserAnswer:", userAnswer)
                attempts_left = (parseInt(attempts_left)-1).toString()
                gameplay_attempts_left.textContent = "Attempts left: " + attempts_left

                const answerDiv = document.getElementById("answer_container")
                const div = document.createElement("div");
                let index = 0
                for (let i = 0; i < word_length; i++) {
                    const inputI = document.getElementById("input-"+(i+1))
                    const label = document.createElement("label")
                    label.textContent = guessedWord[i]
                    if (label.textContent === chosenWord[i]) {
                        label.style.background = "green";
                        alphabets[alphabets.indexOf(guessedWord[i])] = "_"
                        updateRandomList(buttons)
                        inputI.textContent = chosenWord[i]
                        inputI.style.background = "green";
                        currentWord += chosenWord[i]
                    }
                    else if (chosenWord.indexOf(userAnswer[i]) !== -1) {
                        index = alphabets.indexOf(userAnswer[i])
                        while(index !== -1) {
                            console.log("here once")
                            buttons[alphabets.indexOf(userAnswer[i])].disabled = false
                            index = alphabets.indexOf(userAnswer[i], index+1)
                        }
                        label.style.background = "yellow"
                    }
                    else {
                        alphabets[alphabets.indexOf(userAnswer[i])] = "_"
                        updateRandomList(buttons)
                    }
                    div.appendChild(label)


                }
                answerDiv.appendChild(div)
                userAnswer.length = 0
            }

        }
        console.log("guessed word: ", guessedWord)

    })

    erase.addEventListener("click", function (){
        if ( (count-1) >= 0){
            count -= 1
        }

        for (let j = word_length-1; j > -1; j--) {
            const inputI = document.getElementById("input-"+(j+1))
            if (inputI.textContent !== "_") {
                buttons[alphabets.indexOf(userAnswer[j])].disabled = false
                buttons[alphabets.indexOf(userAnswer[j])].textContent = userAnswer[j]
                inputI.textContent = "_"
                break;
            }
        }
        userAnswer.pop();
    })

    newWordButton.addEventListener("click", function() {
        attempts_left = reset(attempts_left, gameplay_attempts_left)
        updateRandomList(buttons)
        userAnswer.length = 0
    })



    gameHomeButton.addEventListener("click", goBackHome)
}

// *************************** helper functions ***************************
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateArrayW(word) {
    console.log("updateArrayW_word:", word)
    console.log("   before:", alphabets)
    for (let z = 0; z < word.length; z++) {
        alphabets[z] = word[z]
    }
    alphabets = shuffleArray(alphabets)
    console.log("   after:", alphabets)

    return word
}

function reset(attempts_left, gameplay_attempts_left) {
    count = 0
    attempts_left = attempt_setting
    gameplay_attempts_left.textContent = "Attempts left: " + attempts_left

    const deleteThis = document.getElementById("answer_container");
    const buttons = document.getElementsByClassName("input");

    while (deleteThis.firstChild) {
        deleteThis.removeChild(deleteThis.firstChild);
    }

    const h3 = document.createElement("h3");
    const text = document.createTextNode("Attempt history");
    h3.appendChild(text)
    deleteThis.append(h3)

    alphabets = ["a", "b", "d", "e", "f", "g",
        "h", "i", "k", "l", "m", "n",
        "o", "p", "r", "s", "t", "w"];

    fetchWord(word_length)
        .then(word => {
            console.log("from gameplay page:", word)

            // resetting the input buttons with the original alphabets
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].textContent = alphabets[i]
                buttons[i].disabled = false
            }
        })


    for (let j = 0; j < word_length; j++) {
        const inputI = document.getElementById("input-" + (j + 1))
        inputI.textContent = "_"
        inputI.style.background = "none";
    }

    return attempts_left
}

function goBackHome() {
    let indexURL = currentUrl.indexOf("/")
    window.location.href = currentUrl.substring(0, indexURL) + "index.html";
}

function updateRandomList(buttons){
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = alphabets[i].toLowerCase()
    }
}

async function fetchWord(word_length){
    await fetch("/word", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ word: word_length})
    })
        .then(response => response.json())
        .then(data => {
            console.log("received from server: ", data.responseString)
            chosenWord = data.responseString.toLowerCase()
            updateArrayW(chosenWord)
        })

    return chosenWord
}