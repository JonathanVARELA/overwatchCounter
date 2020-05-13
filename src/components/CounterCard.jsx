import React from 'react';
import "./CounterCard.css"
import typeDamageImage from "../images/damage.svg";
import typeSupportImage from "../images/support.svg";
import typeTankImage from "../images/tank.svg";
import counterArrow from "../images/counter-arrow.svg";

import firebase from 'firebase/app';
import 'firebase/firestore';

const CounterCard = ({index, selectedCharacter, currentCounterCharacter, isStrongAgainstSelected, forceUpdate}) => {

    const db = firebase.firestore();

    const updateCharacterScore = async (score) => {
        await db.collection("counters")
            .doc(`${selectedCharacter.name}VS${currentCounterCharacter.name}CounterScore`)
            .set({
                rightCharacter: currentCounterCharacter.name,
                leftCharacter: selectedCharacter.name,
                score: currentCounterCharacter.score + score
            }, {merge: true});

        await db.collection("counters")
            .doc(`${currentCounterCharacter.name}VS${selectedCharacter.name}CounterScore`)
            .set({
                rightCharacter: selectedCharacter.name,
                leftCharacter: currentCounterCharacter.name,
                score: currentCounterCharacter.score - score
            }, {merge: true});
        forceUpdate();
    };

    const getTypeImage = () => {
        switch (currentCounterCharacter.type) {
            case "damage":
                return typeDamageImage;
            case "support":
                return typeSupportImage;
            case "tank":
                return typeTankImage;
            default:
                return ""
        }
    };

    return (
        <div className={"counter-card"}>
            <div className={"image-container"}>
                <img src={currentCounterCharacter.avatar} alt=""/>
            </div>
            <div className={"profile " + (index % 2 === 0 ? "pair" : "impair")}>
                <div className={"role"}>
                    <div className={"text"}>
                        <p>ROLE</p>
                        <p>
                            <span>
                                {currentCounterCharacter.type}
                            </span>
                        </p>
                    </div>
                    <img src={getTypeImage()} alt={currentCounterCharacter.type}/>
                </div>
                <div className={"counter-score"}>
                    <img src={counterArrow} className={"up-arrow"} alt="UP"
                         onClick={() => updateCharacterScore(1)}/>
                    <span>{(currentCounterCharacter.score > 0 ? "+" : "") + currentCounterCharacter.score}</span>
                    <img src={counterArrow} className={"down-arrow"} alt="DOWN"
                         onClick={() => updateCharacterScore(-1)}/>
                </div>
                <div className={"name"}>
                    {currentCounterCharacter.name}
                </div>
            </div>
        </div>
    )
};

export default CounterCard;
