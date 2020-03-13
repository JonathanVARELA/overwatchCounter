import React, {useEffect, useState} from 'react';
import "./CounterCard.css"
import * as firebase from "firebase";

const CounterCard = ({selectedCharacter, currentCounterCharacter}) => {


    const [score, setScore] = useState([]);

    const getScore = async () => {
        console.log("selected", selectedCharacter.name, "current", currentCounterCharacter.name);
        const db = firebase.firestore();

        const getScore = (snapshot) => snapshot
            .docs
            .map(snapshot => snapshot.data())
            .values()
            .next()
            .value
            ?.score || 0;

        let score = 0;

        await db.collection("counters")
            .where('leftCharacter', "==", currentCounterCharacter.name)
            .where('rightCharacter', "==", selectedCharacter.name)
            .get()
            .then(snapshot => score += getScore(snapshot));

        await db.collection("counters")
            .where('leftCharacter', "==", selectedCharacter.name)
            .where('rightCharacter', "==", currentCounterCharacter.name)
            .get()
            .then(snapshot => score -= getScore(snapshot));

        return score;
    };

    const fetchCounters = () => {
        getScore().then(score => setScore(score));
    };

    useEffect(() => fetchCounters(), [fetchCounters]);

    return (
        <div>
            <p><span>{currentCounterCharacter.name}</span> score: {score}</p>
        </div>
    )
};

export default CounterCard;
