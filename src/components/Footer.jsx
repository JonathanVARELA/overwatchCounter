import React, {useContext} from 'react';
import "./Footer.css"
import heartImage from "../images/heart.svg"
import CharacterContext from "../CharacterContext";

const Footer = () => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <>
            <div className={"footer"+ (selectedCharacter ? " character-selected" : "")}>
                <span>made with</span>
                <img src={heartImage} alt="LOVE <3"/>
                <span>by counterproject</span>
            </div>
        </>
    )
};

export default Footer;
