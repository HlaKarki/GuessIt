import React from "react"
import './gameplay-input-comps.css'
// import LinkTo from "../../components/linkTo";

const EmptyInputLabel = ({ value, id, row, col }) => <label className="input-label" key={id} id={`input_${row}${col}`}>{value}</label>

const EmptyInputSetUp = () => {
    let rowIndex = 0
    let colIndex = 0
    window.addEventListener('keydown', (event) => {
        if (isAlpha(event.key)){
            document.getElementById(`input_${rowIndex}${colIndex}`).textContent = event.key

            colIndex = (colIndex + 1) % 5
            if (colIndex === 0) {
                rowIndex = (rowIndex + 1) % 6;
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