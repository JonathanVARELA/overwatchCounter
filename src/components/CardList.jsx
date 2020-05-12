import React, {useContext, useEffect} from 'react';
import "./CardList.css"
import Card from "./Card";
import CharacterContext from "../CharacterContext";
import {AnimatedList} from "react-animated-list";

const CardList = ({characters}) => {

    const [selectedCharacter,] = useContext(CharacterContext);

    //todo remove or update AnimatedList to fix the card duplication bug, and remove the ugly fix below
    useEffect(() => {
            let delay = 2 * (characters || []).length;
            setTimeout(function () {
                let divToHides = document.querySelectorAll('#cardList div[style*="transform: scale(0); visibility: hidden;"]');
                if (divToHides.length > 0) {
                    divToHides.forEach(div => div.style.display = 'none')
                }
            }, delay);
        }
    )

    return (
            <div id={"cardList"} className={selectedCharacter ? "character-selected" : ""}>
                {characters
                    ?
                    <AnimatedList animation={"zoom"}>
                        {
                            characters.map((character, i) => React.createElement(Card, {key: character.name + i, ...character}))
                        }
                    </AnimatedList>
                    : <pre>Loading characters list</pre>
                }
            </div>
    )
};

export default CardList;
