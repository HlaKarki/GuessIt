import { useState } from 'react'
import ResetMessage from "../../../alert-message/reset_message/reset_message";

const Reset = () => {
    const [ showReset, setShowReset ] = useState(false)
    const handleShowReset = () => {
        setShowReset(!showReset)
    }

    return (
        <>
            <i tabIndex={1} className="fa fa-refresh transition-animation" id="resetButton" onClick={handleShowReset}></i>
            {showReset && (
                <>
                    <ResetMessage handleShowReset={handleShowReset}/>
                    <div className={"modal-backdrop"} onClick={handleShowReset}></div>
                </>
            )}
        </>
    )
}

export default Reset