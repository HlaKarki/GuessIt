import React from "react"
import './gameplay-navbar-comps.css'
// import LinkTo from "../../linkTo";
import feedbackIcon from "../../../assets/feedbackIcon.png"

const GameplayNavbar = () => {
    return (
        <div className="top-nav">
            <div className="logo">GuessiT</div>
            <div className="icons">
                <img className="gameplay-navbar-feedback-button" id="feedbackButton" src={feedbackIcon} alt="Click to provide feedbacks for GuessIt"/>
                    <i className="fa fa-refresh" id="resetButton"></i>
                    <i className="fa fa-home" id="homeButton"></i>
            </div>
        </div>
    )
}

export default GameplayNavbar