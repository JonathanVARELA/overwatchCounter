import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";

const FirebaseConnectionProvider = (props) => {

    const [isConnected, setIsConnected] = useState(false);

    const initializeFirebase = async () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBmbwYD4dFdxu67ZCYXDyxG80VGSg8wHrc",
            authDomain: "overwatchcounter-a48d5.firebaseapp.com",
            databaseURL: "https://overwatchcounter-a48d5.firebaseio.com",
            projectId: "overwatchcounter-a48d5",
            storageBucket: "overwatchcounter-a48d5.appspot.com",
            messagingSenderId: "895789890305",
            appId: "1:895789890305:web:5f3d6714df4ff5d42b7900"
        };
        // Initialize Firebase
        await firebase.initializeApp(firebaseConfig);
    };

    const connectToFirebase = () => {
        initializeFirebase().then(() => setIsConnected(true))
    };

    useEffect(() => connectToFirebase(), []);

    return (
        <>
            {isConnected ? props.children : <></>}
        </>
    )
};

export default FirebaseConnectionProvider;
