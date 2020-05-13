import React, {useEffect, useState} from 'react';
import "../components/CardList.css"
import * as firebase from "firebase";

const CharacterListProvider = (props) => {

    const [characters, setCharacters] = useState();

    const getCharacters = async () => {
        const db = firebase.firestore();
        return await db
            .collection("characters")
            .get()
            .then(snapshot => {
                const characters = [];
                snapshot.forEach(doc => characters.push(doc.data()));
                characters.sort((a, b) => a.name.localeCompare(b.name));
                return characters;
            })
    };

    const fetchCharacters = () => {
        getCharacters()
            .then(characters => setCharacters(characters));
    };

    useEffect(() => {
        if (!characters) {
            fetchCharacters()
        }
    });

    return (
        <>
            {
                characters
                    ? React.Children.toArray(props.children)
                        .map(child => React.cloneElement(child, {characters: characters}))
                    : <pre>Loading characters</pre>
            }
        </>
    )
};

export default CharacterListProvider;
