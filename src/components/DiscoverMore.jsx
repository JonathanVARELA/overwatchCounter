import React, {useContext} from 'react';
import "./DiscoverMore.css"
import lolImage from "../images/lol.svg"
import hotsImage from "../images/hots.svg"
import dotaImage from "../images/dota.svg"
import CharacterContext from "../CharacterContext";

const DiscoverMore = () => {

    const [selectedCharacter,] = useContext(CharacterContext);

    return (
        <>
            <div className={"discover-more" + (selectedCharacter ? " character-selected" : "")}>
                <p>DISCOVER MORE OF OUR<br />COUNTER WEBSITES</p>
                <div>
                    <img src={lolImage} alt="League of legends"/>
                    <img src={hotsImage} alt="Heroes of the storm"/>
                    <img src={dotaImage} alt="Dota 2"/>
                </div>
            </div>
        </>
    )
};

export default DiscoverMore;
