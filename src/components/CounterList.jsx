import React, {useContext, useState} from 'react';
import "./CardList.css"
import CounterCard from "./CounterCard";
import CharacterContext from "../CharacterContext";

const CounterList = ({characters, isStrongAgainstSelected}) => {

    const [selectedCharacter,] = useContext(CharacterContext);

    const useForceUpdate = () => useState()[1];

    const forceUpdate = useForceUpdate();

    return (
        <div id={"counterList"} className={selectedCharacter ? "character-selected" : ""}>
            {selectedCharacter
                ? characters.map(
                    (character, i) => React.createElement(
                        CounterCard,
                        {
                            key: `${selectedCharacter}_${character}-${i}`,
                            index : i,
                            selectedCharacter: selectedCharacter,
                            currentCounterCharacter: character,
                            isStrongAgainstSelected: isStrongAgainstSelected,
                            forceUpdate: forceUpdate
                        }
                    )
                )
                : <></>
            }
        </div>
    )
};

export default CounterList;
