import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import "./CounterFilter.css"
import CharacterContext from "../CharacterContext";
import firebase from 'firebase/app';
import 'firebase/firestore';
import CounterList from "./CounterList";
import SelectedCharacterCard from "./SelectedCharacterCard";

const CounterFilter = ({characters}) => {

    const [filteredCharacters, setFilteredCharacters] = useState([]);

    const [selectedCharacter,] = useContext(CharacterContext);

    const wasSelectedCharacter = useRef(false);

    const initialized = useRef(false);

    const isMountedRef = useRef(false);

    const isStrongAgainstSelected = useRef(true);

    const sortOrder = useRef(-1);

    const getScores = useCallback(() => {
        if (!selectedCharacter) return [];

        const db = firebase.firestore();
        return db.collection("counters")
            .get()
            .then(snapshot => snapshot.docs.map(doc => doc.data()))
            .then(scores => scores.filter(score => score.leftCharacter === selectedCharacter.name));
    }, [selectedCharacter]);

    const getFilteredCharacter = useCallback(() => {
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
            .then(charactersWithScores => charactersWithScores.sort((a, b) => (a.score - b.score) * sortOrder.current))
    }, [characters, getScores, selectedCharacter, sortOrder])

    const filterCharacters = useCallback(() => {
        getFilteredCharacter()
            .then(result => {
                if (isMountedRef.current) {
                    setFilteredCharacters(result)
                }
            });
    }, [getFilteredCharacter]);

    const listenForScores = useCallback(() => {
        firebase.firestore()
            .collection("counters")
            .onSnapshot(
                () => {
                    if (!selectedCharacter || !isMountedRef.current) return;
                    filterCharacters();
                },
                (error) => console.error(error)
            );
    }, [filterCharacters, selectedCharacter]);

    useEffect(() => {
        isMountedRef.current = true;

        if (!initialized.current && selectedCharacter) {
            // listenForScores();
            sortOrder.current = -1;
            getFilteredCharacter()
                .then(result => {
                    if (isMountedRef.current) {
                        setFilteredCharacters(result)
                    }
                });
            initialized.current = true;
        } else if (!wasSelectedCharacter.current && selectedCharacter) {
            sortOrder.current = -1;
            getFilteredCharacter()
                .then(result => {
                    if (isMountedRef.current) {
                        setFilteredCharacters(result)
                    }
                });
        }
        wasSelectedCharacter.current = selectedCharacter != null;

        return () => isMountedRef.current = false;
    }, [getFilteredCharacter, listenForScores, selectedCharacter, sortOrder])


    const counterContainerRef = useRef();
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth <= 801 || window.pageYOffset > 50 || counterContainerRef.current?.style?.marginTop == null) {
                return;
            }
            counterContainerRef.current.style.marginTop = -window.pageYOffset + "px";
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            isMountedRef.current = false;
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    useEffect(() => {
        if (selectedCharacter) {
            isStrongAgainstSelected.current = true;
            sortOrder.current = -1;
            filterCharacters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCharacter])

    return (
        <div ref={counterContainerRef} className={"counter-container" + (selectedCharacter ? " selected-character" : "")}>
            {
                selectedCharacter
                    ?
                    <>
                        <SelectedCharacterCard/>
                        <div className={"counter-filter"}>
                            <div className={"strong-against " + (isStrongAgainstSelected.current ? "selected" : "")}
                                 onClick={() => {
                                     isStrongAgainstSelected.current = true;
                                     sortOrder.current = -1;
                                     filterCharacters();
                                 }}>
                                <p>
                                    Strong against
                                </p>
                            </div>
                            <div className={"weak-against " + (!isStrongAgainstSelected.current ? "selected" : "")}
                                 onClick={() => {
                                     isStrongAgainstSelected.current = false;
                                     sortOrder.current = 1;
                                     filterCharacters();
                                 }}>
                                <p>
                                    Weak against
                                </p>
                            </div>
                        </div>
                        <CounterList characters={filteredCharacters}/>
                    </>
                    : <></>
            }
        </div>
    )
};

export default CounterFilter;
