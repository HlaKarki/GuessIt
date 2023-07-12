import React from 'react'
import './gameplay-hint-comp.css'
import hintIcon from '../../../../assets/hintIcon.png'

const Hint = () => {
    return (
        <button className={"hint"}>
            <img src={hintIcon} alt={"hint icon"} />
        </button>
    )
}

export default Hint