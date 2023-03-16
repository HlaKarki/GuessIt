if(window.location.href === "http://localhost:3000/gameplay-v.2.html") {

    // ********* setting up **************
        createKeyboard()
        createInputLabels()
    // ***********************************

    const labels = document.getElementsByClassName("input-label")
    let ignoreInput = false;
    let answerArray = [];
    let userWord = "";
    document.addEventListener('keydown', function(event) {
        if (isAlpha(event.key) && !ignoreInput) {
            for (let j = 0; j < labels.length; j++) {
                if (labels[j].textContent === "") {
                    labels[j].textContent = event.key.toUpperCase();
                    userWord += event.key.toUpperCase();
                    if (j % (5) === 4) {
                        ignoreInput = true;
                        answerArray.push(userWord);
                    }
                    break;
                }
            }
        }
        else if (event.key === "Backspace") {
            const reversedLabels = Array.from(labels).reverse();
            for (let i = 0; i < reversedLabels.length; i++) {
                if ( reversedLabels[i].textContent ) {
                    if (i % 5 === 0) {
                        ignoreInput = false;
                    }
                    reversedLabels[i].textContent = "";
                    break;
                }
            }
        }
        else if (event.key === "Enter" && ignoreInput) {
            console.log(answerArray)
            ignoreInput = false;
            userWord = "";
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