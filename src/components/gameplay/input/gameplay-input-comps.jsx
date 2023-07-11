import React from "react"
import './gameplay-input-comps.css'
// import LinkTo from "../../components/linkTo";

const MAX_ROW_INDEX = 5
const MAX_COL_INDEX = 4

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
            if (colIndex === MAX_COL_INDEX && (rowIndex !== MAX_ROW_INDEX)) {
                colIndex = -1
                rowIndex += 1
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