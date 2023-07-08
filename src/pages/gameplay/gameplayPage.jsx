import React from "react"
import './gameplayPage.css'
// import LinkTo from "../../components/linkTo";
import GameplayNavbarComps from "../../components/gameplay/navbar/gameplay-navbar-comps";
import GameplayKeyboardComps from "../../components/gameplay/keyboard/gameplay-keyboard-comps";
import GameplayInput from "../../components/gameplay/input/gameplay-input-comps";

const GameplayPage = () => {

    return (
        <div className={"gameplay"}>
            <GameplayNavbarComps />
            <GameplayInput />
            <GameplayKeyboardComps />
        </div>
    )
}

export default GameplayPage