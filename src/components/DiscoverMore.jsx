import React from 'react';
import "./DiscoverMore.css"
import lolImage from "../images/lol.svg"
import hotsImage from "../images/hots.svg"
import dotaImage from "../images/dota.svg"

const DiscoverMore = () => {

    return (
        <>
            <div className={"discover-more"}>
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
