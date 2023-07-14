import './gameplayPage.css'
// import LinkTo from "../../components/linkTo";
import GameplayNavbarComps from "../../components/gameplay/navbar/gameplay-navbar-comps";
import GameplayKeyboardComps from "../../components/gameplay/keyboard/gameplay-keyboard-comps";
import GameplayInput from "../../components/gameplay/input/gameplay-input-comps";

const isMobile = window.innerWidth <= 414;

const GameplayPage = () => {
    if (isMobile) {
        const viewportHeight = window.innerHeight;
        const desiredPosition = viewportHeight - (viewportHeight * 0.95);

        window.scrollTo({
            top: desiredPosition, // Replace 'desiredPosition' with the vertical position you want to scroll to
            behavior: 'smooth' // Add smooth scrolling animation, omit this property for instant scrolling
        });
    }
    return (
        <div className={"gameplay"}>
            <GameplayNavbarComps />
            <div className={"gameplay-body"}>
                <GameplayInput />
                <GameplayKeyboardComps />
            </div>
        </div>
    )
}

export default GameplayPage