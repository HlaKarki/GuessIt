import '../alert_message.css'
import './hint_message.css'
import {useState} from "react";

const HintMessage = ( {word, definitions, synonyms, antonyms} ) => {
    // debug
    console.log("synonyms: ", synonyms)
    console.log("antonyms: ", antonyms)
    // -----
    const [points, setPoints] = useState(30)
    const [definitionIndex, setDefinitionIndex] = useState(-1)
    const [synonymIndex, setSynonymIndex] = useState(-1)
    const [antonymIndex, setAntonymIndex] = useState(-1)
    const [showDef, setShowDef] = useState(false)
    const [showSyns, setShowSyns] = useState(false)
    const [showAnts, setShowAnts] = useState(false)
    const [getWhat, setGetWhat] = useState("Definitions")
    const [selected, setSelected] = useState("Definitions")

    const handlePoints = (pts) => {
        setPoints( (prevPts) => (prevPts + pts))
    }

    const handleDefinition = () => {
        setShowDef(true)
        setDefinitionIndex((prevIndex) => (prevIndex + 1) % definitions.length)
    }

    const handleSynonym = () => {
        setShowSyns(true)
        setSynonymIndex((prevIndex) => (prevIndex + 1) % synonyms.length)
    }

    const handleAntonym = () => {
        setShowAnts(true)
        setAntonymIndex((prevIndex) => (prevIndex + 1) % antonyms.length)
    }

    const handleGetWhat = (getThis) => {
        setGetWhat(getThis)
    }
    const cssSelectThis = (div) => {
        setSelected(div)
    }

    return (
        <div className={"alert_message fade-in-animation"}>
            <div>Points: {points}</div>
            <div className={"hint_navbar"}>
                <div className={`hint_definitions ${selected === "Definitions" ? 'selected' : ''}`} onClick={() => {
                    handleGetWhat("Definitions");
                    cssSelectThis("Definitions");
                }}>Definitions</div>
                <div className={`hint_synonyms ${selected === "Synonyms" ? 'selected' : ''}`} onClick={() => {
                    handleGetWhat("Synonyms")
                    cssSelectThis("Synonyms");
                }}>Synonyms</div>
                <div className={`hint_antonyms ${selected === "Antonyms" ? 'selected' : ''}`} onClick={() => {
                    handleGetWhat("Antonyms")
                    cssSelectThis("Antonyms");
                }}>Antonyms</div>
            </div>

            {/************* Definitions ****************/}
            {(getWhat === "Definitions" && !showDef) && (
                <button onClick={() => {
                    handleDefinition()
                    handlePoints(-5)
                }}>
                    Get Definition
                </button>
            )}
            {(getWhat === "Definitions" && showDef) && (
                <>
                    <div>{definitions[definitionIndex]}</div>
                    <button onClick={() => {
                        handleDefinition()
                        handlePoints(-5)
                    }}>Next | {definitionIndex+1}/{definitions.length}</button>
                </>
            )}

            {/************* Synonyms ****************/}
            {(getWhat === "Synonyms" && !showSyns) && (
                <button onClick={() => {
                    handleSynonym()
                    handlePoints(-1)
                }}>
                    Get Synonym
                </button>
            )}
            {(getWhat === "Synonyms" && showSyns) && (
                <>
                    <div>{synonyms[synonymIndex]}</div>
                    <button onClick={() => {
                        handleSynonym()
                        handlePoints(-1)
                    }}>Next | {synonymIndex+1}/{synonyms.length}</button>
                </>
            )}

            {/************* Antonyms ****************/}
            {(getWhat === "Antonyms" && !showAnts) && (
                <button onClick={() => {
                    handleAntonym()
                    handlePoints(-1)
                }}>
                    Get Antonym
                </button>
            )}
            {(getWhat === "Antonyms" && showAnts) && (
                <>
                    <div>{antonyms[antonymIndex]}</div>
                    <button onClick={() => {
                        handleAntonym()
                        handlePoints(-1)
                    }}>Next | {antonymIndex+1}/{antonyms.length}</button>
                </>
            )}
        </div>
    )
}

export default HintMessage
