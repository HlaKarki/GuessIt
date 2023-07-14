import React, { useState } from "react"
import './gameplay-navbar-comps.css'
import feedbackIcon from "../../../assets/feedbackIcon.png"
import Hint from "./hint/gameplay-hint-comp";
import LinkTo from "../../linkTo";
import {getChosenWord} from "../gameplay_functions";

const GameplayNavbar = () => {
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState([])
    const [synonyms, setSynonyms] = useState([])
    const [antonyms, setAntonyms] = useState([])

    getChosenWord
        .then(chosenWord => {
            setWord(chosenWord.word)
            setDefinition(chosenWord.definitions)
            setSynonyms(chosenWord.synonyms)
            setAntonyms(chosenWord.antonyms)
        })

    return (
        <div className="top-nav">
            <Hint word={word} definitions={definition} synonyms={synonyms} antonyms={antonyms}/>
            <div className="logo">GuessiT</div>
            <div className="icons">
                <img tabIndex={0} className="gameplay-navbar-feedback-button transition-animation" id="feedbackButton" src={feedbackIcon} alt="Click to provide feedbacks for GuessIt"/>
                <i tabIndex={1} className="fa fa-refresh transition-animation" id="resetButton"></i>
                <LinkTo tabIndex={2} page="" label="" className="fa fa-home transition-animation" />
            </div>
        </div>
    )
}

export default GameplayNavbar