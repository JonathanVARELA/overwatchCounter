import React, {useContext} from 'react';
import "./CardList.css"
import CounterCard from "./CounterCard";
import CharacterContext from "../CharacterContext";

const CounterList = ({characters}) => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <div id={"counterList"} className={selectedCharacter ? "character-selected" : ""}>
            {selectedCharacter
                ? characters.map(
                    (character, i) => React.createElement(
                        CounterCard,
                        {
                            key: `${selectedCharacter}_${character}-${i}`,
                            selectedCharacter: selectedCharacter,
                            currentCounterCharacter: character
                        }
                    )
                )
                : <></>
            }
        </div>
    )
};

export default CounterList;
