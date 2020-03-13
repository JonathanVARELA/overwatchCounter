import React, {useContext} from 'react';
import "./Card.css"
import CharacterContext from './../CharacterContext'
const Card = ({avatar, name, type, sound}) => {

    const audio = new Audio(sound);

    const [, setSelectedCharacter] = useContext(CharacterContext);

    const updateSelectedCharacter = () => {
        audio.play();
        setSelectedCharacter({avatar, name, type, sound});
    };

    return (
        <div className={"card"}>
            <img src={avatar} onClick={() => updateSelectedCharacter()} alt={"Avatar image of " + name}/>
        </div>
    )
};

export default Card;
