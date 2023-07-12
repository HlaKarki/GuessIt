import React from "react"
import './gameplay-navbar-comps.css'
import feedbackIcon from "../../../assets/feedbackIcon.png"
import Hint from "./hint/gameplay-hint-comp";
import LinkTo from "../../linkTo";

const GameplayNavbar = () => {
    return (
        <div className="top-nav">
            <Hint />
            <div className="logo">GuessiT</div>
            <div className="icons">
                <img tabIndex={0} className="gameplay-navbar-feedback-button" id="feedbackButton" src={feedbackIcon} alt="Click to provide feedbacks for GuessIt"/>
                <i tabIndex={1} className="fa fa-refresh" id="resetButton"></i>
                <LinkTo tabIndex={2} page="" label="" className="fa fa-home" />
            </div>
        </div>
    )
}

export default GameplayNavbar