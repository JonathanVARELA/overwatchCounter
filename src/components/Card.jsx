import React from 'react';
import "./Card.css"

const Card = ({avatar, name, type}) => {

    return (
        <div>
            <img src={avatar} alt={"Avatar image of " + name}/>
            <span>{name}</span>
            <span>{type}</span>
        </div>
    )
};

export default Card;
