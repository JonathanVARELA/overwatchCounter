import React, {useEffect, useState} from 'react';
import "../components/CardList.css"
import * as firebase from "firebase";

const CharacterListProvider = (props) => {

    const [characters, setCharacters] = useState();

    const getCharacters = async () => {
        const db = firebase.firestore();
        return await db.collection("characters").get().then(snapshot => {
            const characters = [];
            snapshot.forEach(doc => characters.push(doc.data()));
            return characters;
        })
    };

    const fetchCharacters = () => {
        getCharacters().then(characters => setCharacters(characters));
    };

    useEffect(() => fetchCharacters(), []);

    return (
        <>
            {
                characters
                ? React.Children.toArray(props.children)
                        .map((child) => React.cloneElement(child, {characters: characters}) )
                : <pre>Loading characters</pre>
            }
        </>
    )
};

export default CharacterListProvider;
