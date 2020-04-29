import React, {useContext} from 'react';
import "./CardList.css"
import Card from "./Card";
import CharacterContext from "../CharacterContext";

const CardList = ({characters}) => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <div>
            <div id={"cardList"}>
                {
                    characters
                        ? characters.map((character, i) => React.createElement(Card, {key: i, ...character}))
                        : <pre>Loading characters list</pre>
                }
            </div>
        </div>
    )
};

export default CardList;
