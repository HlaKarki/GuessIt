import '../alert_message.css'
import './hint_message.css'

const HintMessage = ( {word, definitions, synonyms, antonyms} ) => {
    const MAX_SYNONYMS = 1;
    const MAX_ANTONYMS = 1;

    return (
        <div className={"alert_message fade-in-animation"}>
            {/*<div>{word}</div>*/}
            <div className={"hint_definitions"}>
                Definition: {definitions.slice(0, 1).map( (def, id) => (
                    def
                ))}
            </div>
            {(synonyms.length !== 0 && synonyms[0] !== "" ) ? (
                <div>
                    Synonyms
                    {synonyms.slice(0, Math.min(MAX_SYNONYMS, synonyms.length)).map((syns, id) => (
                        <div key={id}>{syns}</div>
                    ))}
                </div>
            ) : (
                <div>No synonyms available</div>
            )}
            {(antonyms.length !== 0 && antonyms[0] !== "" ) ? (
                <div>
                    Antonyms
                    {antonyms.slice(0, Math.min(MAX_ANTONYMS, antonyms.length)).map((ants, id) => (
                        <div key={id}>{ants}</div>
                    ))}
                </div>
            ) : (
                <div>No antonyms available</div>
            )}
        </div>
    )
}

export default HintMessage