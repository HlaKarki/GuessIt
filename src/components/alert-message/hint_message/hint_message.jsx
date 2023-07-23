import '../alert_message.css'
import './hint_message.css'
import {useState} from "react";
import backIcon from '../../../assets/backIcon.png'
const HintMessage = ( {word, fullDef, synonyms, antonyms} ) => {
    // debug
    // console.log("synonyms: ", synonyms)
    // console.log("antonyms: ", antonyms)
    const definitions = fullDef.length > 2 ? [fullDef[0], fullDef[1]] : fullDef;

    // -----
    const DEF_POINTS = 5
    const SYNS_ANTS_POINTS = 1
    const [points, setPoints] = useState(10)
    const [definitionIndex, setDefinitionIndex] = useState(-1)
    const [synonymIndex, setSynonymIndex] = useState(-1)
    const [antonymIndex, setAntonymIndex] = useState(-1)
    const [showDef, setShowDef] = useState(false)
    const [showSyns, setShowSyns] = useState(false)
    const [showAnts, setShowAnts] = useState(false)
    const [doneDef, setDoneDef] = useState(false)
    const [getWhat, setGetWhat] = useState("Definitions")
    const [selected, setSelected] = useState("Definitions")

    const handlePoints = (pts) => {
        setPoints( (prevPts) => (prevPts + pts))
    }

    const handleDefinition = () => {
        setShowDef(true)

        setDefinitionIndex((prevIndex) => {
            if (prevIndex === 0){
                setDoneDef(true)
            }
            return prevIndex === definitions.length-1 ? prevIndex : prevIndex + 1
        })
    }

    const prevDefinition = () => {
        // setDoneDef(true)
        setDefinitionIndex(0)
    }

    const nextDefinition = () => {
        setDefinitionIndex(1)
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
            <div>Available points: {points} pts</div>
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
                <div className={"get-definition"}>
                    <button className={"hint-get-button"} onClick={() => {
                        handleDefinition()
                        handlePoints(-DEF_POINTS)
                    }}>
                        Reveal a definition: {DEF_POINTS} pts
                    </button>
                </div>
            )}
            {(getWhat === "Definitions" && showDef) && (
                <>
                    <div>"{definitions[definitionIndex]}"</div>
                    {
                        (doneDef && definitionIndex === 1) &&
                        <img src={backIcon} alt={"see previous definition"} style={{width:'20px', height:'20px', alignItems:'center', marginRight:'10px'}} onClick={prevDefinition}/>
                    }
                    {
                        (!doneDef) &&
                        <div>
                            {
                                (definitionIndex < (definitions.length-1) && !doneDef) &&
                                <button className={"hint-next-button"} onClick={() => {
                                    handleDefinition()
                                    handlePoints(-DEF_POINTS)
                                }}>
                                    Another definition: {DEF_POINTS} pts
                                </button>
                            }
                        </div>

                    }
                    {
                        (doneDef && definitionIndex === 0) &&
                        <img src={backIcon} alt={"see previous definition"} style={{width:'20px', height:'20px', alignItems:'center', marginRight:'10px', transform:'scaleX(-1)'}} onClick={nextDefinition}/>
                    }
                </>
            )}

            {/************* Synonyms ****************/}
            {(getWhat === "Synonyms" && (synonyms.length === 0 || synonyms[0] === "")) && (
                <div>No Synonyms Available</div>
            )}
            {(getWhat === "Synonyms" && !showSyns && (synonyms.length !== 0 && synonyms[0] !== "")) && (
                <button className={"hint-get-button"} onClick={() => {
                    handleSynonym()
                    handlePoints(-SYNS_ANTS_POINTS)
                }}>
                    Reveal a synonym: {SYNS_ANTS_POINTS} pt
                </button>
            )}
            {(getWhat === "Synonyms" && showSyns && (synonyms.length !== 0 && synonyms[0] !== "")) && (
                <>
                    <div>{synonyms[synonymIndex]}</div>
                    <button onClick={() => {
                        handleSynonym()
                        handlePoints(-SYNS_ANTS_POINTS)
                    }}>Next | {synonymIndex+1}/{synonyms.length}</button>
                </>
            )}

            {/************* Antonyms ****************/}
            {(getWhat === "Antonyms" && (antonyms.length === 0 || antonyms[0] === "")) && (
                <div>No Antonyms Available</div>
            )}
            {(getWhat === "Antonyms" && !showAnts && (antonyms.length !== 0 && antonyms[0] !== "")) && (
                <button className={"hint-get-button"} onClick={() => {
                    handleAntonym()
                    handlePoints(-SYNS_ANTS_POINTS)
                }}>
                    Reveal a antonym: {SYNS_ANTS_POINTS} pt
                </button>
            )}
            {(getWhat === "Antonyms" && showAnts && (antonyms.length !== 0 && antonyms[0] !== "")) && (
                <>
                    <div>{antonyms[antonymIndex]}</div>
                    <button onClick={() => {
                        handleAntonym()
                        handlePoints(-SYNS_ANTS_POINTS)
                    }}>Next | {antonymIndex+1}/{antonyms.length}</button>
                </>
            )}
        </div>
    )
}

export default HintMessage
