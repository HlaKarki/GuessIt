import { fetchWord } from './script.js';

if(window.location.href === "http://localhost:3000/gameplay-v.2.html") {
    let chosenWord = ""
    fetchWord('5')
        .then(word => {
            chosenWord = word.toUpperCase();
        })
    // ********* setting up **************
        createKeyboard()
        createInputLabels()
    // ***********************************

    const labels = document.getElementsByClassName("input-label")
    let ignoreInput = false;
    let ignoreBackspace = false;
    let userWord = "";
    let currentInputLabelIndex = 0;
    document.addEventListener('keydown',  function (event) {
        if (isAlpha(event.key) && !ignoreInput) {
            ignoreBackspace = false;
            // updating the input label and the userWord variable
            for (let j = 0; j < labels.length; j++) {
                if (labels[j].textContent === "") {
                    labels[j].textContent = event.key.toUpperCase();
                    userWord += event.key.toUpperCase();
                    // keep track of label no.
                    currentInputLabelIndex = j;
                    if (j % (5) === 4) {
                        ignoreInput = true;
                    }
                    break;
                }
            }
        } else if (event.key === "Backspace" && !ignoreBackspace) {
            // don't let back spacing jump from current attempt to previous attempt
            if (currentInputLabelIndex % 5 === 0) {
                ignoreBackspace = true;
            }
            labels[currentInputLabelIndex].textContent = "";
            userWord = userWord.slice(0, -1);
            currentInputLabelIndex -= 1;
            if (currentInputLabelIndex % 5 !== 0) {
                ignoreInput = false;
            }
        } else if (event.key === "Enter" && ignoreInput) {
            checkWord(userWord)
                .then(response => {
                    if (response){
                        ignoreInput = false;
                        ignoreBackspace = true;

                        console.log("chosenWord: ", chosenWord)
                        console.log("userWord: ", userWord)
                        // if answer is correct
                        if (chosenWord === userWord) {
                            for (let i = 0; i < 5; i++) {
                                labels[(currentInputLabelIndex-4) + i].style.background = "#52894e"
                            }
                            ignoreInput = true;
                            [userWord, ignoreInput] = winMessage(labels, currentInputLabelIndex);
                            newChosenWord().then(newWord => {
                                chosenWord = newWord;
                            });

                        } else {
                            for (let i = 0; i < userWord.length; i++) {
                                // setting incorrect answer to black
                                if (!chosenWord.includes(userWord[i])) {
                                    labels[(currentInputLabelIndex-4) + i].style.background = "#3a3a3c"
                                    colorKeyboard(userWord[i], "#3a3a3c");
                                }
                                // setting border to none
                                labels[(currentInputLabelIndex-4) + i].style.border = "none";

                                // if correct letter
                                if (chosenWord[i] === userWord[i]) {
                                    labels[(currentInputLabelIndex-4) + i].style.background = "#52894e"
                                    colorKeyboard(userWord[i], "#52894e");
                                } else {
                                    for (let j = 0; j < userWord.length; j++) {
                                        // if semi-correct
                                        if (userWord[i] === chosenWord[j]) {
                                            labels[(currentInputLabelIndex-4) + i].style.background = "#af9a3b"
                                            colorKeyboard(userWord[i], "#af9a3b");
                                        }
                                    }
                                }
                            }
                        }
                        userWord = "";
                    }
                    else {
                        notValidWord();
                        ignoreBackspace = false;
                    }
                })
                .catch(error => {
                    console.error(error);
                    console.error("There was error in checking if this is a valid word. Please refresh and try again :(")
                })
        }
    })
}


// helper functions
function createKeyboard() {
    const qwertyAlphabet = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "Z", "X", "C", "V", "B", "N", "M"
    ];

    // creating keyboard
    for (let row = 0; row<3; row++) {
        let keyboardRow = document.createElement("div");
        keyboardRow.setAttribute("class", "keyboard-row");
        for (let col = 0; col < 10; col++) {
            if (row === 0) {
                const button = document.createElement("button");
                button.setAttribute("class", "keyboard-key");
                const buttonText = document.createTextNode(qwertyAlphabet[col]);
                button.appendChild(buttonText);

                keyboardRow.appendChild(button)

                const keyboard = document.querySelector(".keyboard");
                keyboard.appendChild(keyboardRow);

            }
            else if (row === 1 && col <= 8) {
                const button = document.createElement("button");
                button.setAttribute("class", "keyboard-key");
                const buttonText = document.createTextNode(qwertyAlphabet[col + 10]);
                button.appendChild(buttonText);

                keyboardRow.appendChild(button)
                const keyboard = document.querySelector(".keyboard");
                keyboard.appendChild(keyboardRow);
            }
            else if (row === 2 && col <= 6) {

                const button = document.createElement("button");
                button.setAttribute("class", "keyboard-key");
                const buttonText = document.createTextNode(qwertyAlphabet[col + 19]);
                button.appendChild(buttonText);

                if (col === 0) {
                    const button = document.createElement("button");
                    button.setAttribute("class", "enter-key");
                    const buttonText = document.createTextNode("ENTER");
                    button.appendChild(buttonText);
                    keyboardRow.appendChild(button);
                }
                keyboardRow.appendChild(button);
                if (col === 6) {
                    const icon = document.createElement('i');
                    icon.classList.add('fas', 'fa-backspace', 'erase-key');

                    keyboardRow.appendChild(icon);
                }
                const keyboard = document.querySelector(".keyboard");
                keyboard.appendChild(keyboardRow);
            }
        }
    }
}

function createInputLabels() {
    // creating answer input labels
    const inputsDiv = document.querySelector(".inputs");
    for (let i = 1; i <= 6; i++) {
        const labelDiv = document.createElement("div");
        labelDiv.classList.add('labels-container')
        for (let j = 1; j <= 5; j++) {
            const label = document.createElement("label");
            label.classList.add('input-label');
            labelDiv.appendChild(label);
            inputsDiv.appendChild(labelDiv);
        }
    }
}

function isAlpha(character) {
    return /^[A-Za-z]$/.test(character);
}

function winMessage(labels, maxInputLabelIndexReached) {
    // fade out the background
    const modalBackdrop = document.getElementById("modal-backdrop");
    modalBackdrop.classList.remove("hidden");

    const body = document.querySelector("body");
    const message = document.createElement("div");
    message.classList.add('win-message');
    message.textContent = "Well Done!\nWould you like to guess another word?";

    // Create a new div element for the buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("win-message-buttons")

    const noButton = document.createElement("button");
    noButton.classList.add('no-button')
    noButton.textContent = "No";

    // Create two new button elements
    const okayButton = document.createElement("button");
    okayButton.classList.add('okay-button')
    okayButton.textContent = "Okay";

    // Append the buttons to the buttonsDiv element
    buttonsDiv.appendChild(noButton);
    buttonsDiv.appendChild(okayButton);

    // Append the buttons to the message element
    message.appendChild(buttonsDiv);

    // Add the message element to the body
    body.appendChild(message);


    okayButton.addEventListener("click", () => {
        resetLabels()
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && document.querySelector('body .win-message')) {
            resetLabels()
        }
    })

    noButton.addEventListener("click", () => {
        message.remove();
        modalBackdrop.classList.add("hidden");
        window.location.href = "/"
    });

    function resetLabels() {
        modalBackdrop.classList.add("hidden");
        message.remove();
        for (let i = 0; i <= maxInputLabelIndexReached; i++) {
            labels[i].style.background = "none";
            labels[i].style.border = "solid #3a3a3c 2px";
            labels[i].textContent = "";
        }
        resetKeyboardColor();
    }

    return ["", false]
}

function notValidWord() {

    const body = document.querySelector("body");
    const message = document.createElement("div");
    message.classList.add('invalid-word-message');
    message.textContent = "Not in word list";

    // Add the message element to the body
    body.appendChild(message);

    // Remove the message after 2 seconds
    setTimeout(function() {
        message.classList.add('hide');
    }, 1500);
}

function colorKeyboard(letter, color) {
    const keyboardKeys = document.getElementsByClassName("keyboard-key");
    for ( let k = 0; k < keyboardKeys.length; k++) {
        if (keyboardKeys[k].textContent === letter) {
            keyboardKeys[k].style.background = color
            keyboardKeys[k].style.border = "none";
        }
    }
}

function resetKeyboardColor() {
    const keyboardKeys = document.getElementsByClassName("keyboard-key");
    for ( let k = 0; k < keyboardKeys.length; k++) {
        keyboardKeys[k].style.background = "#818384"
        keyboardKeys[k].style.border = "solid gray 1px;";
    }
}

async function newChosenWord() {
    let chosenWord
    await fetchWord('5')
        .then(word => {
            chosenWord = word.toUpperCase();
        })
    return chosenWord
}

async function checkWord(userWord){
    let response;
    await fetch("/checkWord", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userWord: userWord})
    })
        .then(response => response.json())
        .then(data => {
            response = data.response
        })

    return response
}