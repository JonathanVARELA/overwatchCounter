import React, {useState} from 'react';
import './App.css';
import CardList from "./components/CardList";
import FirebaseConnectionProvider from "./providers/FirebaseConnectionProvider";
import CharacterListProvider from "./providers/CharacterListProvider";
import CharacterContext from './CharacterContext'
import CounterList from "./components/CounterList";
import Header from "./components/Header";
import MainFilter from "./components/MainFilter";
import Footer from "./components/Footer";
import DiscoverMore from "./components/DiscoverMore";
import CharacterCounterModal from "./components/CharacterCounterModal";
import SelectedCharacterCard from "./components/SelectedCharacterCard";
import CounterFilter from "./components/CounterFilter";

function App() {

    const [selectedCharacter, setSelectedCharacter] = useState('');

    return (
        <>
            <FirebaseConnectionProvider>
                <CharacterContext.Provider value={[selectedCharacter, setSelectedCharacter]}>
                    <CharacterCounterModal/>
                    <Header/>
                    <SelectedCharacterCard/>
                    <CharacterListProvider>
                        <MainFilter>
                            <CardList/>
                            <CounterFilter>
                                <CounterList/>
                            </CounterFilter>
                        </MainFilter>
                    </CharacterListProvider>
                </CharacterContext.Provider>
            </FirebaseConnectionProvider>
            <DiscoverMore/>
            <Footer/>
        </>
    );
}

export default App;
