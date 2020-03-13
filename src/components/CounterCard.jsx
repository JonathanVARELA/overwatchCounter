import React, {useEffect, useState} from 'react';
import "./CounterCard.css"
import * as firebase from "firebase";

const CounterCard = ({selectedCharacter, currentCounterCharacter}) => {


    const [score, setScore] = useState([]);

    const db = firebase.firestore();

    const getScore = async () => {
        const score = await db.collection("counters")
            .doc(`${selectedCharacter.name}VS${currentCounterCharacter.name}CounterScore`)
            .get()
            .then(doc => doc?.data()?.score || 0);

        return score;
    };

    const fetchCounters = () => {
        getScore().then(score => setScore(score));
    };

    const updateCharacterScore = async (score) => {
        await db.collection("counters")
            .doc(`${selectedCharacter.name}VS${currentCounterCharacter.name}CounterScore`)
            .set({
                rightCharacter: currentCounterCharacter.name,
                leftCharacter: selectedCharacter.name,
                score: +score
            }, {merge: true});

        await db.collection("counters")
            .doc(`${currentCounterCharacter.name}VS${selectedCharacter.name}CounterScore`)
            .set({
                rightCharacter: selectedCharacter.name,
                leftCharacter: currentCounterCharacter.name,
                score: -score
            }, {merge: true});

        fetchCounters();
    };

    useEffect(() => fetchCounters(), [fetchCounters]);

    return (
        <div>
            <p><span>{currentCounterCharacter.name}</span> score: {score}</p>
            <button onClick={() => updateCharacterScore(score + 1)}>UP</button>
            <button onClick={() => updateCharacterScore(score - 1)}>DOWN</button>
        </div>
    )
};

export default CounterCard;
