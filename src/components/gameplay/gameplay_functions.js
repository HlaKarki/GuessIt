import {isValid} from "../checkWord";
import confetti from "canvas-confetti";
import {GetWord} from "../getWord";

const MAX_ROW_INDEX = 5
const MAX_COL_INDEX = 4

export const getChosenWord = GetWord()
    .then((chosenWord) => {
        console.log("The chosenWord is: ", chosenWord);
        return chosenWord
    })
    .catch((error) => {throw error});

export const gameplay_functions = (handleShowAlert, handleMessageTitle) => {
    getChosenWord
        .then(chosen => {
            // setChosen(res.word)
            let rowIndex = 0
            let colIndex = -1
            window.addEventListener('keydown', (event) => {
                if (isAlpha(event.key) && (rowIndex <= MAX_ROW_INDEX) && (colIndex <= MAX_COL_INDEX) ){
                    if (colIndex !== 4) {
                        colIndex += 1
                        document.getElementById(`input_${rowIndex}${colIndex}`).textContent = event.key.toUpperCase()
                        document.getElementById(`input_${rowIndex}${colIndex}`).classList.add("scale-up-animation")
                    }
                }
                else if (event.key === "Enter") {
                    if (colIndex === MAX_COL_INDEX && (rowIndex <= MAX_ROW_INDEX)) {
                        let user_word = ''
                        for (let i = 0; i < 5; i++) {
                            user_word += document.getElementById(`input_${rowIndex}${i}`).textContent.toUpperCase()
                        }
                        isValid(user_word)
                            .then( (is_valid) => {
                                console.log(is_valid)
                                if (is_valid) {
                                    for (let i = 0; i < 5; i++) {
                                        // GREEN: check letter for letter
                                        if (chosen.word[i] === user_word[i]){
                                            document.getElementById(`input_${rowIndex}${i}`).style.backgroundColor = "#52894e"
                                            document.getElementById(`keyboard_${user_word[i]}`).style.backgroundColor = "#52894e"
                                            flipThis(user_word, rowIndex, i)
                                        }
                                        else {
                                            // YELLOW: check if the letter is present in the word
                                            if (chosen.word.includes(user_word[i])){
                                                document.getElementById(`input_${rowIndex}${i}`).style.backgroundColor = "#af9a3b"
                                                document.getElementById(`keyboard_${user_word[i]}`).style.backgroundColor = "#af9a3b"
                                                flipThis(user_word, rowIndex, i)
                                            }
                                            // GRAY: the letter is not part of the answer
                                            else {
                                                document.getElementById(`input_${rowIndex}${i}`).style.backgroundColor = "#3a3a3c"
                                                document.getElementById(`keyboard_${user_word[i]}`).style.backgroundColor = "#3a3a3c"
                                                flipThis(user_word, rowIndex, i)
                                            }
                                        }
                                        document.getElementById(`input_${rowIndex}${i}`).style.border = "none"
                                    }
                                    if (user_word === chosen.word) {
                                        console.log(`good one mf, you got it right`)
                                        startConfetti()
                                        // WinLoseMessage(`Hello, you win the correct word was ${CHOSEN_WORD.word}`, "description")
                                        handleShowAlert()
                                        handleMessageTitle("hello testing testing")
                                    }
                                    colIndex = -1
                                    rowIndex += 1
                                }
                                else {
                                    console.log(`Blud your word ain't valid`)
                                }
                            })
                    }
                }
                else if (event.key === "Backspace") {
                    if (colIndex >= 0) {
                        document.getElementById(`input_${rowIndex}${colIndex}`).textContent = ""
                        colIndex -= 1
                    }
                }
            })
        })

}

const startConfetti = () => {
    let duration = 5 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        let particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
};

function isAlpha(character) {
    return /^[A-Za-z]$/.test(character);
}

function flipThis(user_word, rowIndex, i) {
    document.getElementById(`input_${rowIndex}${i}`).classList.add("flip-animation");
    document.getElementById(`keyboard_${user_word[i]}`).classList.add("flip-animation");
}