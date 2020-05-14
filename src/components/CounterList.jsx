import React, {useContext, useEffect} from 'react';
import "./CardList.css"
import CounterCard from "./CounterCard";
import CharacterContext from "../CharacterContext";
import {AnimatedList} from "react-animated-list";

const CounterList = ({characters}) => {

    const [selectedCharacter,] = useContext(CharacterContext);

    useEffect(() => {
            let delay = 2 * (characters || []).length;
            setTimeout(function () {
                let divToHides = document.querySelectorAll('#counterList div[style*="transform: scale(0); visibility: hidden;"]');
                if (divToHides.length > 0) {
                    divToHides.forEach(div => div.style.display = 'none')
                }
            }, delay);
        }
    )

    return (
        <div id={"counterList"} className={selectedCharacter ? "character-selected" : ""}>
            {selectedCharacter
                ?
                <AnimatedList animation={"zoom"}>
                    {
                        characters.map(
                            (character, i) => React.createElement(
                                CounterCard,
                                {
                                    key: `${selectedCharacter}_${character}-${i}`,
                                    index: i,
                                    selectedCharacter: selectedCharacter,
                                    currentCounterCharacter: character
                                }
                            )
                        )
                    }
                </AnimatedList>
                : <></>
            }
        </div>
    )
};

export default CounterList;
