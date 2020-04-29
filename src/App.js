import React, {useState} from 'react';
import './App.css';
import CardList from "./components/CardList";
import FirebaseConnectionProvider from "./providers/FirebaseConnectionProvider";
import CharacterListProvider from "./providers/CharacterListProvider";
import CharacterContext from './CharacterContext'
import CounterList from "./components/CounterList";
import Header from "./components/Header";

function App() {

    const [selectedCharacter, setSelectedCharacter] = useState('');

    return (
        <>
            <Header></Header>
            <FirebaseConnectionProvider>
                <CharacterContext.Provider value={[selectedCharacter, setSelectedCharacter]}>
                    <CharacterListProvider>
                        <CardList/>
                        <CounterList/>
                    </CharacterListProvider>
                </CharacterContext.Provider>
            </FirebaseConnectionProvider>
        </>
    );
}

export default App;
