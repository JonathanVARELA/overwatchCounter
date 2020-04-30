import React, {useContext, useEffect, useState} from 'react';
import "./Card.css"
import CharacterContext from './../CharacterContext'
import typeDamageImage from "../images/damage.svg"
import typeTankImage from "../images/tank.svg"
import typeSupportImage from "../images/support.svg"
import useAudio from "../utils/AudioPlayer";

const Card = ({avatar, name, type, sound}) => {

    const [, setSelectedCharacter] = useContext(CharacterContext);

    const [playSound] = useAudio(sound);

    const updateSelectedCharacter = () => {
        playSound();
        setSelectedCharacter({avatar, name, type, sound});
    };

    const getTypeImage = () => {
        switch (type) {
            case "damage":
                return typeDamageImage;
            case "support":
                return typeSupportImage;
            case "tank":
                return typeTankImage;
            default:
                return ""
        }
    };

    return (
        <div className={"card"} style={{backgroundImage: `url(${avatar})`}} onClick={() => updateSelectedCharacter()}>
            <div className={"card-name"}>
                <p>
                    {name}
                </p>
            </div>
            <div className={"character-type"}>
                <img src={getTypeImage(type)} alt="test"/>
            </div>
        </div>
    )
};

export default Card;
