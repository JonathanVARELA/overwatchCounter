import React, {useContext} from 'react';
import "./Card.css"
import CharacterContext from './../CharacterContext'
import typeDamageImage from "../images/damage.svg"
import typeTankImage from "../images/tank.svg"
import typeSupportImage from "../images/support.svg"
import useAudio from "../utils/AudioPlayer";

const Card = ({avatar, name, type, sound}) => {

    const [selectedCharacter, setSelectedCharacter] = useContext(CharacterContext);

    const [playSound] = useAudio(sound);

    const updateSelectedCharacter = () => {
        playSound();
        if (selectedCharacter && selectedCharacter.name === name) {
            setSelectedCharacter(null);
        } else {
            setSelectedCharacter({avatar, name, type, sound});
        }
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
        <div className={"card"} style={{backgroundImage: `url(${avatar})`}}
             onClick={() => updateSelectedCharacter() & window.scrollTo(0, 0)}>
            <div className={"card-name"}>
                <p>
                    {name}
                </p>
            </div>
            <div className={"character-type"}>
                <img src={getTypeImage(type)} alt={type}/>
            </div>
        </div>
    )
};

export default Card;
