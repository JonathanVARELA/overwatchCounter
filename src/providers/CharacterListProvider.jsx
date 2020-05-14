import React, {useEffect, useState} from 'react';
import "../components/CardList.css"
import charactersData from '../data/characters.json';

const CharacterListProvider = (props) => {

    const [characters, setCharacters] = useState();

    const getCharacters = async () => charactersData.sort((a, b) => a.name.localeCompare(b.name));

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
