import React, {useContext} from 'react';
import "./Header.css"
import logo from '../images/logo.svg'
import CharacterContext from "../CharacterContext";

const Header = () => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <div className={"header " + (selectedCharacter ? "selected-character" : "")}>
            <img src={logo} alt="Overwatch Counter"/>
            <p>"MADE BY PLAYERS FOR PLAYERS"</p>
        </div>
    )
};

export default Header;
