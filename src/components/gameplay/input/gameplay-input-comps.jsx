import React, { useState } from "react"
import './gameplay-input-comps.css'
import {gameplay_functions} from "../gameplay_functions";
import { WinLoseMessage } from "../../alert-message/win_lose_message/win_lose_message";

const EmptyInputLabel = ({ value, row, col }) => <label className="input-label" id={`input_${row}${col}`}>{value}</label>

const EmptyInputSetUp = () => {
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
        setShowAlert(!showAlert)
    }

    const [messageTitle, setMessageTitle] = useState("Initial message")
    const handleMessageTitle = (message) => {
        setMessageTitle(message)
    }

    gameplay_functions(handleShowAlert, handleMessageTitle)

    return (
        <div className={"inputs"}>
            {[...Array(6)].map( (_, row) => (
                <div className={"labels-container"} key={row}>
                    {[...Array(5)].map( (_, col) => (
                        <EmptyInputLabel key={col} row={row} col={col} />
                    ))}
                </div>
            ))}
            {showAlert && (
                <>
                    <WinLoseMessage message_title={messageTitle}/>
                    <div id={"modal-backdrop"}></div>
                </>
            )}
            <div></div>
        </div>
    )
}

const GameplayInput = () => {

    return (
        <div className={"input-container"}>
            <EmptyInputSetUp />
        </div>
    )
}

export default GameplayInput