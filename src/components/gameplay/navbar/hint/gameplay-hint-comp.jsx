import React, { useState } from 'react'
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
            <button className={"hint"} onClick={() => handleShowHint()}>
                <img src={hintIcon} alt={"hint icon"} />
            </button>
            {showHint && (
                <>
                    <HintMessage word={word} definitions={definitions} synonyms={synonyms} antonyms={antonyms}/>
                    <div id={"modal-backdrop"}></div>
                </>
            )}
        </div>
    )
}

export default Hint