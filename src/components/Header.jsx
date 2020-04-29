import React, {useContext} from 'react';
import "./Header.css"
import logo from '../images/logo.svg'

const Header = () => {

    return (
        <div className={"header"}>
            <img src={logo} alt="Overwatch Counter" />
        </div>
    )
};

export default Header;
