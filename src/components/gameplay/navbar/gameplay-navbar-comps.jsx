import React from "react"
import './gameplay-navbar-comps.css'
// import LinkTo from "../../linkTo";
import feedbackIcon from "../../../assets/feedbackIcon.png"
import LinkTo from "../../linkTo";

const GameplayNavbar = () => {
    return (
        <div className="top-nav">
            <div className="logo">GuessiT</div>
            <div className="icons">
                <img className="gameplay-navbar-feedback-button" id="feedbackButton" src={feedbackIcon} alt="Click to provide feedbacks for GuessIt"/>
                <i className="fa fa-refresh" id="resetButton"></i>
                <LinkTo page="" label="" className="fa fa-home" />
            </div>
        </div>
    )
}

export default GameplayNavbar