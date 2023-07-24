import '../alert_message.css'
import { GetWord } from "../../getWord";
import { useState } from "react";
import Loading from "../../loading/loading";

export const ResetMessage = ( {handleShowReset} ) => {
    const [isLoading, setLoading] = useState(false)

    const handleYes = () => {
        setLoading(true)
        GetWord()
            .then(word => {
                console.log("word from reset: ", word)
                handleShowReset()
                setLoading(false)
            })
    }
    return (
        <div className={"alert_message fade-in-animation"} style={{fontSize:'1.1rem'}}>
            <span style={{margin:'0 20px'}}>
                Are you sure you would like to guess a different word?
                You will lose the progress you may have made so far 😬
            </span>
            <div className={"yes-no-buttons"}>
                <button className={"no-button"} onClick={handleShowReset}>No</button>
                <button className={"yes-button"} onClick={handleYes}>Yes, I'm sure</button>
            </div>
            {
                (isLoading) &&
                <Loading />
            }
        </div>
    )
}

export default ResetMessage