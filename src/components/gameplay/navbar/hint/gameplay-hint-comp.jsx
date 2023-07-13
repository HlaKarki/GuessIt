import React, { useState } from 'react'
import './gameplay-hint-comp.css'
import hintIcon from '../../../../assets/hintIcon.png'
import HintMessage from "../../../alert-message/hint_message/hint_message";

const Hint = ( {test_answer} ) => {
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
                    <HintMessage test_answer={test_answer}/>
                    <div id={"modal-backdrop"}></div>
                </>
            )}
        </div>
    )
}

export default Hint