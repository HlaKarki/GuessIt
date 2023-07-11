import React from "react"
import './gameplay-input-comps.css'
// import LinkTo from "../../components/linkTo";
import { GetWord } from "../../getWord";
import { isValid } from "../../checkWord";

const MAX_ROW_INDEX = 5
const MAX_COL_INDEX = 4
let CHOSEN_WORD
GetWord()
    .then((chosenWord) => {
        // console.log(chosenWord);
        CHOSEN_WORD = chosenWord
    })
    .catch((error) => {});

const EmptyInputLabel = ({ value, row, col }) => <label className="input-label" id={`input_${row}${col}`}>{value}</label>

const EmptyInputSetUp = () => {
    let rowIndex = 0
    let colIndex = -1
    window.addEventListener('keydown', (event) => {
        if (isAlpha(event.key) && (rowIndex <= MAX_ROW_INDEX) && (colIndex <= MAX_COL_INDEX) ){
            if (colIndex !== 4) {
                colIndex += 1
                document.getElementById(`input_${rowIndex}${colIndex}`).textContent = event.key.toUpperCase()
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
                                }
                                else {
                                    // YELLOW: check if the letter is present in the word
                                    if (CHOSEN_WORD.word.includes(user_word[i])){
                                        document.getElementById(`input_${rowIndex}${i}`).style.backgroundColor = "#af9a3b"
                                        document.getElementById(`keyboard_${user_word[i]}`).style.backgroundColor = "#af9a3b"
                                    }
                                    // GRAY: the letter is not part of the answer
                                    else {
                                        document.getElementById(`input_${rowIndex}${i}`).style.backgroundColor = "#3a3a3c"
                                        document.getElementById(`keyboard_${user_word[i]}`).style.backgroundColor = "#3a3a3c"
                                    }
                                }
                            }
                            if (user_word === CHOSEN_WORD.word) {
                                console.log(`good one mf, you got it right`)
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

function isAlpha(character) {
    return /^[A-Za-z]$/.test(character);
}

const GameplayInput = () => {

    return (
        <div className={"input-container"}>
            <EmptyInputSetUp />
        </div>
    )
}

export default GameplayInput