import React, {useContext} from 'react';
import "./CardList.css"
import Card from "./Card";
import CharacterContext from "../CharacterContext";
import {AnimatedList} from "react-animated-list";

const CardList = ({characters}) => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <div id={"cardList"}>
            {characters
                ?
                <AnimatedList animation={"grow"}>
                    {
                        characters.map((character, i) => React.createElement(Card, {key: character.name+i, ...character}))
                    }
                </AnimatedList>
                : <pre>Loading characters list</pre>
            }
        </div>
    )
};

export default CardList;
