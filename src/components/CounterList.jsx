import React from 'react';
import "./CardList.css"
import CounterCard from "./CounterCard";

const CounterList = ({ selectedCharacter, characters }) => {

    return (
        <div>
            <h1>
                Counters
            </h1>

            <div id={"counterList"}>
                {characters.map(character => React.createElement(CounterCard, {selectedCharacter: selectedCharacter, currentCounterCharacter: character}))}
            </div>
        </div>
    )
};

export default CounterList;
