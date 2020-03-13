import React, {useState} from 'react';
import './App.css';
import CardList from "./components/CardList";
import FirebaseConnectionProvider from "./providers/FirebaseConnectionProvider";
import CharacterListProvider from "./providers/CharacterListProvider";
import CharacterContext from './CharacterContext'

function App() {

    const [selectedCharacter, setSelectedCharacter] = useState('');

    return (
        <FirebaseConnectionProvider>
            <CharacterContext.Provider value={[selectedCharacter, setSelectedCharacter]}>
                <CharacterListProvider>
                    <CardList/>
                </CharacterListProvider>
            </CharacterContext.Provider>
        </FirebaseConnectionProvider>
    );
}

export default App;
