import React, {useEffect, useState} from 'react';
import "./CounterCard.css"
import * as firebase from "firebase";

const CounterCard = (selectedCharacterName, currentCounterCharacter) => {

    const [score, setScore] = useState([]);

    const getVotes = async () => {
        console.log("selected", selectedCharacterName, "current", currentCounterCharacter);
        const db = firebase.firestore();
        const getScore = (snapshot) => snapshot.data() ? snapshot.data().score : 0;
        let score = 0;

        await db.collection("counters")
            .where('leftCharacter', "==", currentCounterCharacter.name)
            .where('rightCharacter', "==", selectedCharacterName)
            .get()
            .then(snapshot => score = getScore(snapshot) * -1);

        await db.collection("counters")
            .where('leftCharacter', "==", currentCounterCharacter.name)
            .where('rightCharacter', "==", selectedCharacterName)
            .get()
            .then(snapshot => score = getScore(snapshot));

        setScore(score);
    };

    useEffect(() => getVotes(), []);

    return (
        <div>
            <p><span>{currentCounterCharacter.name}</span> score: {score}</p>
        </div>
    )
};

export default CounterCard;
