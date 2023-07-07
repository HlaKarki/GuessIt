import React from "react"
import './landingPage.css'
import LinkTo from "../../components/linkTo";

const LandingPage = () => {
    return (
        <div className="home-content-container">
            <h1 className="game-name">GuessiT</h1>
            <LinkTo page="play" label="Play" className="play-button"/>
            <LinkTo page="about" label="About" className="about-button"/>
            <LinkTo page="feedback" label="Feedbacks" className="feedback-button"/>
        </div>
    )
}

export default LandingPage