import React, {useContext} from 'react';
import "./Header.css"
import logo from '../images/logo.svg'
import CharacterContext from "../CharacterContext";

const Header = () => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <>
            {
                selectedCharacter
                    ? <></>
                    : <div className={"header"}>
                        <img src={logo} alt="Overwatch Counter"/>
                    </div>
            }
        </>
    )
};

export default Header;
