import React, {useEffect, useState} from 'react';
import "./CardList.css"
import Card from "./Card";
import VoteCard from "./VoteCard";


const CounterList = ({selectedCharacter, characters}) => {

    const [counters, setCounters] = useState();

    const getCounters = async () => {
        return await characters
            .filter(character => character.name !== selectedCharacter.name)
            .map(character =>
                React.createElement(VoteCard, {selectedCharacter: selectedCharacter, currentCharacter: character})
            );
    };

    useEffect(() => {
        getCounters().then(
            data => setCounters(
                data
            )
        )
    }, []);

    return (
        <div>
            <h1>
                Counters
            </h1>

            <div id={"counterList"}>
                {counters}
            </div>
        </div>
    )
};

export default CounterList;
