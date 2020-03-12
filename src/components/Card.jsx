import React from 'react';
import "./Card.css"

const Card = ({avatar, name, type, sound}) => {

    const audio = new Audio(sound);

    return (
        <div className={"card"}>
            <img src={avatar} onClick={() => audio.play()} alt={"Avatar image of " + name}/>
        </div>
    )
};

export default Card;
