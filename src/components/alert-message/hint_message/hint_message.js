// import './hint_message.css'
import '../win_lose_message/win_lose_message.css'

const HintMessage = ( {word, definitions, synonyms, antonyms} ) => {
    const MAX_SYNONYMS = 5;
    const MAX_ANTONYMS = 5;

    return (
        <div className={"win_lose_message fade-in-animation"}>
            <div>{word}</div>
            <div>{definitions}</div>
            <div>Synonyms</div>
            {synonyms !== undefined ? (
                synonyms.slice(0, Math.min(MAX_SYNONYMS, synonyms.length)).map((syns, id) => (
                    <div key={id}>{syns}</div>
                ))
            ) : (
                <div>No synonyms available</div>
            )}
            <div>Antonyms</div>
            {antonyms !== undefined ? (
                antonyms.slice(0, Math.min(MAX_ANTONYMS, antonyms.length)).map((ants, id) => (
                    <div key={id}>{ants}</div>
                ))
            ) : (
                <div>No antonyms available</div>
            )}
        </div>
    )
}

export default HintMessage