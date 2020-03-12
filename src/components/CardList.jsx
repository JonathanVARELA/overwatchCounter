import React, {useEffect, useState} from 'react';
import "./CardList.css"
import * as firebase from "firebase";
import Card from "./Card";
import CounterList from "./CounterList";


const CardList = () => {

    const [characters, setCharacters] = useState();
    const [counters, setCounters] = useState();


    const connectToFirebase = async () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBmbwYD4dFdxu67ZCYXDyxG80VGSg8wHrc",
            authDomain: "overwatchcounter-a48d5.firebaseapp.com",
            databaseURL: "https://overwatchcounter-a48d5.firebaseio.com",
            projectId: "overwatchcounter-a48d5",
            storageBucket: "overwatchcounter-a48d5.appspot.com",
            messagingSenderId: "895789890305",
            appId: "1:895789890305:web:5f3d6714df4ff5d42b7900"
        };
        // Initialize Firebase
        await firebase.initializeApp(firebaseConfig);
    };

    const getCharacters = async () => {
        const db = firebase.firestore();
        return await db.collection("characters").get().then(snapshot => {
            const characters = [];
            snapshot.forEach(doc => characters.push(doc.data()));
            return characters.map((character, i) => React.createElement(Card, {key: i, ...character}));
        })
    };

    const getCards = () => {
        connectToFirebase()
            .then(() => getCharacters().then(characters => {
                setCharacters(characters);
                setCounters({selectedCharacter: characters[0], characters: characters })
            }));
    };

    useEffect(() => getCards(), []);

    return (
        <div>
            <h1>
                Characters
            </h1>

            <div id={"cardList"}>
                {characters}

            </div>

            <div>
                {counters ? React.createElement(CounterList, counters) : <></>}
            </div>
        </div>
    )
};

export default CardList;
