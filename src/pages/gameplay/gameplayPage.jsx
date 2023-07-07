import React from "react"
import './gameplayPage.css'
import LinkTo from "../../components/linkTo";
import GameplayNavbarComps from "../../components/gameplay/navbar/gameplay-navbar-comps";

const GameplayPage = () => {
    return (
        <div>
            <GameplayNavbarComps />
            <LinkTo path="/" label="Go back to home" />
        </div>
    )
}

export default GameplayPage