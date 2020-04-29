import React, {useEffect, useState} from 'react';
import "./MainFilter.css"

const MainFilter = ({characters, children}) => {

    const [filteredCharacters, setFilteredCharacters] = useState();


    const filterCharacters = (characters) => {
        //todo filter here
        return characters;
    }

    useEffect(() => setFilteredCharacters(
        filterCharacters(characters)
    ), [characters])

    return (
        <>
            <div className={"main-filter"}/>
            {
                characters
                    ? React.Children
                        .toArray(children)
                        .map(child => React.cloneElement(child, {characters: characters}))
                    : <></>
            }
        </>
    )
};

export default MainFilter;
