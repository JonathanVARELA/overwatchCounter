import React from 'react';
import "./Footer.css"
import heartImage from "../images/heart.svg"

const Footer = () => {

    return (
        <>
            <div className={"footer"}>
                <span>made with</span>
                <img src={heartImage} alt="LOVE <3"/>
                <span>by counterproject</span>
            </div>
        </>
    )
};

export default Footer;
