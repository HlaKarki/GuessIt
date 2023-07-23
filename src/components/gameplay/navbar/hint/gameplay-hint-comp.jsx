import { useState } from 'react'
import './gameplay-hint-comp.css'
import hintIcon from '../../../../assets/hintIcon.png'
import HintMessage from "../../../alert-message/hint_message/hint_message";

const Hint = ( {word, definitions, synonyms, antonyms} ) => {
    const [ showHint, setShowHint ] = useState(false)
    const handleShowHint = () => {
        setShowHint(!showHint)
    }

    return (
        <div>
            <button className={"hint transition-animation"} onClick={() => handleShowHint()}>
                <img src={hintIcon} alt={"hint icon"} />
            </button>
            {showHint && (
                <>
                    <HintMessage word={word} fullDef={definitions} synonyms={synonyms} antonyms={antonyms}/>
                    <div className={"modal-backdrop"} onClick={() => handleShowHint()}></div>
                </>
            )}
        </div>
    )
}

export default Hint