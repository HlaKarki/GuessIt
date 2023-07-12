import React from "react"
import './gameplay-input-comps.css'
import { GetWord } from "../../getWord";
import { isValid } from "../../checkWord";
import confetti from 'canvas-confetti'

const MAX_ROW_INDEX = 5
const MAX_COL_INDEX = 4
let CHOSEN_WORD

GetWord()
    .then((chosenWord) => {
        console.log("The chosenWord is: ", chosenWord);
        CHOSEN_WORD = chosenWord
    })
    .catch((error) => {throw error});

const EmptyInputLabel = ({ value, row, col }) => <label className="input-label" id={`input_${row}${col}`}>{value}</label>

const EmptyInputSetUp = () => {
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
                                if (CHOSEN_WORD.word[i] === user_word[i]){
                                    document.getElementById(`input_${rowIndex}${i}`).style.backgroundColor = "#52894e"
                                    document.getElementById(`keyboard_${user_word[i]}`).style.backgroundColor = "#52894e"
                                    flipThis(user_word, rowIndex, i)
                                }
                                else {
                                    // YELLOW: check if the letter is present in the word
                                    if (CHOSEN_WORD.word.includes(user_word[i])){
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
                            }
                            if (user_word === CHOSEN_WORD.word) {
                                console.log(`good one mf, you got it right`)
                                startConfetti()
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

    return (
        <div className={"inputs"}>
            {[...Array(6)].map( (_, row) => (
                <div className={"labels-container"} key={row}>
                    {[...Array(5)].map( (_, col) => (
                        <EmptyInputLabel key={col} row={row} col={col} />
                    ))}
                </div>
            ))}
        </div>
    )
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

const GameplayInput = () => {

    return (
        <div className={"input-container"}>
            <EmptyInputSetUp />
        </div>
    )
}

export default GameplayInput