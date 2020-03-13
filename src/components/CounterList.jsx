import React, {useContext} from 'react';
import "./CardList.css"
import CounterCard from "./CounterCard";
import CharacterContext from "../CharacterContext";

const CounterList = ({characters}) => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <div>
            <h1>
                Counters
            </h1>

            <div id={"counterList"}>
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
                    : <pre>Please select a character</pre>
                }
            </div>
        </div>
    )
};

export default CounterList;
