import React from "react"
import './gameplay-keyboard-comps.css'
// import LinkTo from "../../components/linkTo";

const GameplayKeyboard = () => {
    const qwertyTop = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const qwertyMid = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const qwertyBot = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

    const KeyButton = ({value}) => {
        const handleKeyButtonClick = () => {
            const event = new KeyboardEvent('keydown', {key: value})
            window.dispatchEvent(event)
        }
        return (
            <button className={"keyboard-key"} title={`Press ${value}`} aria-label={`Press ${value}`} onClick={handleKeyButtonClick}>{value}</button>
        )
    }

    const handle_enter_backspace = (id) => {
        const key = id === 0 ? 'Enter' : 'Backspace';
        const event = new KeyboardEvent('keydown', { key, code: key });
        window.dispatchEvent(event);
    }
    const KeyboardSetUp = () => {
        return (
            <div className={"keyboard"}>
                <div className={"keyboard-row"}>
                    {qwertyTop.map( (letter, index) => (
                        <KeyButton value={letter} key={index}/>
                    ))}
                </div>
                <div className={"keyboard-row"}>
                    {qwertyMid.map( (letter, index) => (
                        <KeyButton value={letter} key={index}/>
                    ))}
                </div>
                <div className={"keyboard-row"}>
                    <button className={"enter-key"} onClick={() => handle_enter_backspace(0)}>ENTER</button>
                    {qwertyBot.map( (letter, index) => (
                        <KeyButton value={letter} key={index}/>
                    ))}
                    <button className={"erase-key"} onClick={ () => handle_enter_backspace(1)}><i className={"fas fa-backspace"}></i></button>
                </div>
            </div>
        )
    }
    return (
        <div className="keyboard-container">
            <KeyboardSetUp />
        </div>
    )
}

export default GameplayKeyboard