import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import "./CounterFilter.css"
import CharacterContext from "../CharacterContext";
import firebase from 'firebase/app';
import 'firebase/firestore';

const CounterFilter = ({characters, children}) => {

    const [filteredCharacters, setFilteredCharacters] = useState([]);

    const [selectedCharacter,] = useContext(CharacterContext);

    const wasSelectedCharacter = useRef(false);

    const initialized = useRef(false);

    const isMountedRef = useRef(false);

    const isStrongAgainstSelected = useRef(true);

    const getScores = useCallback(() => {
        if (!selectedCharacter) return [];

        const db = firebase.firestore();
        return db.collection("counters")
            .get()
            .then(snapshot => snapshot.docs.map(doc => doc.data()))
            .then(scores => scores.filter(score => score.leftCharacter === selectedCharacter.name));
    }, [selectedCharacter]);

    const getFilteredCharacter = useCallback((sortOrder) => {
        if (!selectedCharacter) return [];

        const getCharacterWithScore = async () =>
            getScores()
                .then(scores => {
                    const charactersWithScore = [];
                    for (const character of [...characters]) {
                        if (character.name === selectedCharacter.name) continue;
                        charactersWithScore.push({score: scores.find(score => score.rightCharacter === character.name)?.score || 0, ...character})
                    }
                    return charactersWithScore;
                });
        return getCharacterWithScore()
            .then(charactersWithScores => charactersWithScores.sort((a, b) => (a.score - b.score) * sortOrder))
    }, [characters, getScores, selectedCharacter])

    const filterCharacters = async (sortOrder) => {
        getFilteredCharacter(sortOrder)
            .then(result => {
                if (isMountedRef.current) {
                    setFilteredCharacters(result)
                }
            });
    }

    useEffect(() => {
        isMountedRef.current = true;

        if (!initialized.current && selectedCharacter) {
            getFilteredCharacter(-1).then(result => {
                if (isMountedRef.current) {
                    setFilteredCharacters(result)
                }
            });
            initialized.current = true;
        } else if (!wasSelectedCharacter.current && selectedCharacter) {
            getFilteredCharacter(-1).then(result => {
                if (isMountedRef.current) {
                    setFilteredCharacters(result)
                }
            });
        }
        wasSelectedCharacter.current = selectedCharacter != null;

        return () => isMountedRef.current = false;
    }, [getFilteredCharacter, selectedCharacter])

    return (
        <div className={"counter-container"}>
            {
                selectedCharacter
                    ?
                    <div className={"counter-filter"}>
                        <div className={"strong-against " + (isStrongAgainstSelected.current ? "selected" : "")}
                             onClick={() => {
                                 isStrongAgainstSelected.current = true;
                                 filterCharacters(-1);
                             }}>
                            <p>
                                Strong against
                            </p>
                        </div>
                        <div className={"weak-against " + (!isStrongAgainstSelected.current ? "selected" : "")}
                             onClick={() => {
                                 isStrongAgainstSelected.current = false;
                                 filterCharacters(1);
                             }}>
                            <p>
                                Weak against
                            </p>
                        </div>
                    </div>
                    : <></>
            }
            {
                characters
                    ? React.Children.toArray(children).map((child) =>
                        React.cloneElement(child, {
                            characters: (selectedCharacter ? filteredCharacters : characters),
                            isStrongAgainstSelected: isStrongAgainstSelected,
                        })
                    )
                    : <></>
            }
        </div>
    )
};

export default CounterFilter;
