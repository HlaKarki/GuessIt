import { addNewFeedback } from './feedback.js';

/* Show the body after the page is fully loaded */
window.onload = function() {
    document.body.style.display = "block";
};

document.addEventListener('DOMContentLoaded', function() {
    // ********* setting up **************
        createKeyboard()
        createInputLabels()
    // ***********************************

    // ********* variables **************
    let chosenWord = "";
    let lostTextContext = "";
    let userWord = "";
    let fillingForm = false;
    let ignoreInput = false;
    let ignoreBackspace = false;
    let currentInputLabelIndex = 0;
    // ***********************************

    // when home button is clicked
    const homeButton = document.getElementById('homeButton')
    const resetButton = document.getElementById('resetButton')
    const feedbackButton = document.getElementById('feedbackButton')
    const labels = document.getElementsByClassName("input-label")
    homeButton.addEventListener('click', goBackHome);

    resetButton.addEventListener('click', function() {
        for (let i = 0; i <= currentInputLabelIndex; i++) {
            labels[i].style.background = "none";
            labels[i].style.border = "solid #3a3a3c 2px";
            labels[i].textContent = "";
            labels[i].classList.remove("scale-up-animation");
        }
        ignoreInput = false;
        resetKeyboardColor();
        fetchWord('5')
            .then(word => {
                chosenWord = word.toUpperCase();
                notValidWord("Reset successful!")
            })
    })
    feedbackButton.addEventListener('click', function() {
        fillingForm = true;
        createFeedbackForm();
        const modalBackdrop = document.getElementById("modal-backdrop");
        const feedbackDiv = document.querySelector(".Feedback");
        feedbackDiv.classList.remove("hidden");
        modalBackdrop.classList.remove("hidden");

        const closeButton = document.getElementById("feedback-close");
        const submitButton = document.getElementById("feedback-submit");

        closeButton.addEventListener("click", function () {
            modalBackdrop.classList.add("hidden");
            feedbackDiv.classList.add("hidden");
            fillingForm = false;
        })

        submitButton.addEventListener("click", function() {
            let name = document.getElementById("feedback-name").value
            let feedbackCon = document.getElementById("feedback-feedback").value
            if ( name && feedbackCon ){
                addNewFeedback(modalBackdrop, feedbackDiv, false);
                fillingForm = false;
            }
            else {
                notValidWord("Incomplete form!")
            }

        })
    })

    fetchWord('5')
        .then(word => {
            chosenWord = word.toUpperCase();
            lostTextContext = "Oops!\nThe correct word was " + chosenWord + "!\nWould you like to guess another word?";
        })

    const keyboardButtons = document.querySelectorAll(".keyboard-key")
    keyboardButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!ignoreInput && !fillingForm) {
                [ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord] = updateInputLabel(ignoreBackspace, currentInputLabelIndex, ignoreInput, button.textContent, userWord);
            }
        });
    });

    const eraseButton = document.querySelector(".erase-key")
    eraseButton.addEventListener("click", function() {
        if (!ignoreBackspace) {
            [ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord] = eraseLetter(ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord);
        }
    })

    const enterButton = document.querySelector(".enter-key")
    enterButton.addEventListener("click", async function() {
        if (ignoreInput) {
            [ignoreBackspace, currentInputLabelIndex , ignoreInput, userWord, lostTextContext, chosenWord] = await processWord(ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord, lostTextContext, chosenWord);
        }
    })

    document.addEventListener('keydown',  async function (event) {
        if (isAlpha(event.key) && !ignoreInput && !fillingForm) {
            [ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord] = updateInputLabel(ignoreBackspace, currentInputLabelIndex, ignoreInput, event.key, userWord);
            // console.log(currentInputLabelIndex)
        }
        else if (event.key === "Backspace" && !ignoreBackspace) {
            [ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord] = eraseLetter(ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord);
            // console.log(currentInputLabelIndex)
        }
        else if (event.key === "Enter" && ignoreInput) {
            [ignoreBackspace, currentInputLabelIndex , ignoreInput, userWord, lostTextContext, chosenWord] = await processWord(ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord, lostTextContext, chosenWord);
        }
    })
});


// ******************* helper functions **********************

function updateInputLabel(ignoreBackspace, currentInputLabelIndex, ignoreInput, inputKey, userWord) {
    const labels = document.getElementsByClassName("input-label")
    ignoreBackspace = false;
    // updating the input label and the userWord variable
    for (let j = 0; j < labels.length; j++) {
        if (labels[j].textContent === "") {
            labels[j].classList.add("scale-up-animation");
            labels[j].textContent = inputKey.toUpperCase();

            userWord += inputKey.toUpperCase();
            // keep track of label no.
            currentInputLabelIndex = j;
            if (j % (5) === 4) {
                ignoreInput = true;
            }
            break;
        }
    }
    return [ignoreBackspace, currentInputLabelIndex,ignoreInput, userWord]
}

function eraseLetter(ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord) {
    const labels = document.getElementsByClassName("input-label")
    let updatedUserWord = "";
    // don't let back spacing jump from current attempt to previous attempt
    if (currentInputLabelIndex % 5 === 0) {
        ignoreBackspace = true;
    }
    labels[currentInputLabelIndex].textContent = "";
    labels[currentInputLabelIndex].classList.remove("scale-up-animation");
    updatedUserWord = userWord.slice(0, -1);
    currentInputLabelIndex -= 1;
    if (currentInputLabelIndex % 5 !== 0) {
        ignoreInput = false;
    }
    return [ignoreBackspace, currentInputLabelIndex, ignoreInput, updatedUserWord]
}

async function processWord(ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord, lostTextContext, chosenWord) {
    const labels = document.getElementsByClassName("input-label")
    const winTextContext = "Well Done!\nWould you like to guess another word?";

    try {
        const response = await checkWord(userWord);

        if (response) {
            ignoreInput = false;
            ignoreBackspace = true;


            console.log("chosenWord: ", chosenWord)
            console.log("userWord: ", userWord)
            // if answer is correct
            if (chosenWord === userWord) {
                for (let i = 0; i < 5; i++) {
                    labels[(currentInputLabelIndex - 4) + i].style.background = "#52894e"
                }
                ignoreInput = true;
                [userWord, ignoreInput] = winMessage(labels, currentInputLabelIndex, winTextContext);
                const [newWord, lostText] = await newChosenWord();
                chosenWord = newWord;
                lostTextContext = lostText;
            }
            else if (currentInputLabelIndex === 29) {
                [userWord, ignoreInput] = winMessage(labels, currentInputLabelIndex, lostTextContext)
                const [newWord, lostText] = await newChosenWord();
                chosenWord = newWord;
                lostTextContext = lostText;
            }
            else {
                for (let i = 0; i < userWord.length; i++) {
                    // setting incorrect answer to black
                    if (!chosenWord.includes(userWord[i])) {
                        labels[(currentInputLabelIndex - 4) + i].style.background = "#3a3a3c"
                        colorKeyboard(userWord[i], "#3a3a3c");
                    }
                    // setting border to none
                    labels[(currentInputLabelIndex - 4) + i].style.border = "none";

                    // if correct letter
                    if (chosenWord[i] === userWord[i]) {
                        labels[(currentInputLabelIndex - 4) + i].style.background = "#52894e"
                        colorKeyboard(userWord[i], "#52894e");
                    } else {
                        for (let j = 0; j < userWord.length; j++) {
                            // if semi-correct
                            if (userWord[i] === chosenWord[j]) {
                                labels[(currentInputLabelIndex - 4) + i].style.background = "#af9a3b"
                                colorKeyboard(userWord[i], "#af9a3b");
                            }
                        }
                    }
                }
            }
            userWord = "";
        } else {
            notValidWord("Not in word list");
            ignoreBackspace = false;
        }

        return [ignoreBackspace, currentInputLabelIndex, ignoreInput, userWord, lostTextContext, chosenWord]
    }
    catch(error) {
        console.error(error);
        console.error("There was error in checking if this is a valid word. Please refresh and try again :(")
    }
}

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

function winMessage(labels, maxInputLabelIndexReached, messageTextContent) {
    // fade out the background
    const modalBackdrop = document.getElementById("modal-backdrop");
    modalBackdrop.classList.remove("hidden");

    const body = document.querySelector("body");
    const message = document.createElement("div");
    message.classList.add('win-message');
    message.textContent = messageTextContent;

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
    message.classList.add("fade-in-animation");

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
            labels[i].classList.remove("scale-up-animation");
        }
        resetKeyboardColor();
    }

    return ["", false]
}

function notValidWord(textMessage) {

    const body = document.querySelector("body");
    const message = document.createElement("div");
    message.classList.add('invalid-word-message', 'fade-in-message');
    message.textContent = textMessage;

    // Add the message element to the body
    body.appendChild(message);

    // Remove the message after 2 seconds
    setTimeout(function() {
        message.classList.add('fade-out-animation');
        message.remove();
    }, 1250);

}

function colorKeyboard(letter, color) {
    const keyboardKeys = document.getElementsByClassName("keyboard-key");
    for ( let k = 0; k < keyboardKeys.length; k++) {
        if (keyboardKeys[k].textContent === letter) {
            if (keyboardKeys[k].style.background !== "#52894e") {
                keyboardKeys[k].style.background = color
                keyboardKeys[k].style.border = "none";
            }
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

async function newChosenWord(lostTextContext) {
    let chosenWord
    await fetchWord('5')
        .then(word => {
            chosenWord = word.toUpperCase();
            lostTextContext = "Oops!\nThe correct word was " + chosenWord + "!\nWould you like to guess another word?";
        })
    return [chosenWord, lostTextContext]
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

function createFeedbackForm() {
    if( !(document.querySelector('.Feedback')) ){
        // create feedback form element
        const feedbackForm = document.createElement('div');
        feedbackForm.classList.add('Feedback');

        // create feedback form content
        const closeButton = document.createElement('span');
        closeButton.id = 'feedback-close';
        closeButton.innerHTML = '&times;';


        const feedbackFormContent = document.createElement('div');
        feedbackFormContent.classList.add('feedback-form');

        feedbackFormContent.appendChild(closeButton);

        const feedbackName = document.createElement('div');
        feedbackName.classList.add('feedback-form-name');
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Name:';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'feedback-name';
        nameInput.name = 'feedback-name';
        feedbackName.appendChild(nameLabel);
        feedbackName.appendChild(nameInput);

        const feedbackFeedback = document.createElement('div');
        feedbackFeedback.classList.add('feedback-form-feedback');
        const feedbackLabel = document.createElement('label');
        feedbackLabel.textContent = 'Describe Your Feedback:';
        const feedbackTextarea = document.createElement('textarea');
        feedbackTextarea.id = 'feedback-feedback';
        feedbackTextarea.name = 'feedback';
        feedbackTextarea.rows = 5;
        feedbackTextarea.cols = 40;
        feedbackFeedback.appendChild(feedbackLabel);
        feedbackFeedback.appendChild(feedbackTextarea);

        const feedbackSubmit = document.createElement('input');
        feedbackSubmit.type = 'submit';
        feedbackSubmit.id = 'feedback-submit';
        feedbackSubmit.value = 'Submit';

        feedbackFormContent.appendChild(feedbackName);
        feedbackFormContent.appendChild(feedbackFeedback);
        feedbackFormContent.appendChild(feedbackSubmit);

        feedbackForm.appendChild(feedbackFormContent);

        // append feedback form to body
        document.body.appendChild(feedbackForm);
    }
}

// go back to home page
function goBackHome() {
    window.location.href = "/home.html";
}

// call to server to request a random word
async function fetchWord(word_length){
    let chosenWord
    await fetch("/word", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ word: word_length})
    })
        .then(response => response.json())
        .then(data => {
            chosenWord = data.responseString.toLowerCase()
            // console.log("received from server: ", chosenWord)
        })

    return chosenWord
}

export { notValidWord }