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
        <div className={"card"} style={{ backgroundImage: `url(${avatar})`}} onClick={() => updateSelectedCharacter()} alt={"Avatar image of " + name}>
            <div className={"card-name"}>
                <p>
                    {name}
                </p>
            </div>
        </div>
    )
};

export default Card;
