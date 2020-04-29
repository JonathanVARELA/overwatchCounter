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

function App() {

    const [selectedCharacter, setSelectedCharacter] = useState('');

    return (
        <>
            <Header/>
            <FirebaseConnectionProvider>
                <CharacterContext.Provider value={[selectedCharacter, setSelectedCharacter]}>
                    <CharacterListProvider>
                        <MainFilter>
                            <CardList/>
                        </MainFilter>
                    </CharacterListProvider>
                </CharacterContext.Provider>
            </FirebaseConnectionProvider>
            <Footer/>
        </>
    );
}

export default App;
