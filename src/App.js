import React, {useState} from 'react';
import './App.css';
import FirebaseConnectionProvider from "./providers/FirebaseConnectionProvider";
import CharacterListProvider from "./providers/CharacterListProvider";
import CharacterContext from './CharacterContext'
import Header from "./components/Header";
import MainFilter from "./components/MainFilter";
import Footer from "./components/Footer";
import DiscoverMore from "./components/DiscoverMore";

function App() {

    const [selectedCharacter, setSelectedCharacter] = useState('');

    return (
        <>
            <FirebaseConnectionProvider>
                <CharacterContext.Provider value={[selectedCharacter, setSelectedCharacter]}>
                    <Header/>
                        <CharacterListProvider>
                            <MainFilter/>
                        </CharacterListProvider>
                </CharacterContext.Provider>
            </FirebaseConnectionProvider>
            <DiscoverMore/>
            <Footer/>
        </>
    );
}

export default App;
