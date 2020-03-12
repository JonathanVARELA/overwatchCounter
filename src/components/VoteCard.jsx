import React, {useEffect, useState} from 'react';
import "./VoteCard.css"
import * as firebase from "firebase";

const VoteCard = (selectedCharacter, currentCounterCharacter) => {

    const [vote, setVote] = useState([]);

    const getVotes = async () => {
        const db = firebase.firestore();
        const getForce = (snapshot) => snapshot.data() ? snapshot.data().force : 0;
        let force = 0;

        await db.collection("counters")
            .where('leftCharacter', "==", currentCounterCharacter.name)
            .where('rightCharacter', "==", selectedCharacter.name)
            .get()
            .then(snapshot => force = getForce(snapshot)* -1);

        await db.collection("counters")
            .where('leftCharacter', "==", currentCounterCharacter.name)
            .where('rightCharacter', "==", selectedCharacter.name)
            .get()
            .then(snapshot => force = getForce(snapshot));

        setVote(force);
    };

    useEffect(() => getVotes(), []);

    return (
        <div>
            <p><span>{currentCounterCharacter.name}</span> votes: {vote}</p>
        </div>
    )
};

export default VoteCard;
