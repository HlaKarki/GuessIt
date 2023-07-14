import '../alert_message.css'
import './win_lose_message.css'

export const WinLoseMessage = ( {message_title} ) => {
    return (
        <div className={"alert_message fade-in-animation"}>
            {message_title}
            <div>
                <button className={"no-button"}>No</button>
                <button className={"okay-button"}>Okay</button>
            </div>
        </div>

    )
}