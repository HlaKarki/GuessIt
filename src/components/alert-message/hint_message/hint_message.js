// import './hint_message.css'
import '../win_lose_message/win_lose_message.css'

const HintMessage = ( {test_answer} ) => {
    return (
        <div className={"win_lose_message fade-in-animation"}>
            {test_answer}
        </div>
    )
}

export default HintMessage