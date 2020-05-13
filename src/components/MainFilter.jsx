import React, {useContext, useEffect, useRef, useState} from 'react';
import "./MainFilter.css"
import typeDamageImage from "../images/damage.svg"
import typeTankImage from "../images/tank.svg"
import typeSupportImage from "../images/support.svg"
import rightArrow from "../images/arrow.svg";
import {animateScroll as scroll} from "react-scroll";
import CharacterContext from "../CharacterContext";

const MainFilter = ({characters, children}) => {

    const [filteredCharacters, setFilteredCharacters] = useState();

    const [isSticky, setSticky] = useState(false);

    const ref = useRef(null);
    const initialMainFilterContainerOffsetTop = useRef(-1);

    const [selectedFilters, setSelectedFilters] = useState({list: []});

    const [selectedCharacter, setSelectedCharacter] = useContext(CharacterContext);


    const filterCharacters = (type) => {
        scroll.scrollToTop();
        let filter = [];
        if (selectedFilters.list.includes(type)) {
            filter = selectedFilters.list.filter(value => value !== type);
        } else {
            // just uncomment this to enable multi selection feature :)
            // filter = [...selectedFilters.list, type];
            filter = [type];
        }

        if (filter.length === 3) {
            filter = []
        }
        if (filter.length === 0) {
            setFilteredCharacters(characters);
            setSelectedFilters({list: filter});
            return;
        }

        setFilteredCharacters(characters.filter(character => filter.includes(character.type)));
        setSelectedFilters({list: filter});
    }

    useEffect(() => {
        const filterCharacters = () => {
            setFilteredCharacters(characters)
        }
        filterCharacters()

        const handleScroll = () => {
            if (window.innerWidth <= 801) return;
            if (ref.current) {
                if (initialMainFilterContainerOffsetTop.current === -1) {
                    initialMainFilterContainerOffsetTop.current = ref.current.offsetTop
                }
                if (window.pageYOffset >= initialMainFilterContainerOffsetTop.current) {
                    setSticky(true);
                } else {
                    setSticky(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, [characters])

    return (
        <>
            <div ref={ref}
                 className={`main-filter sticky-wrapper${isSticky ? ' sticky' : ''} ${selectedCharacter ? "character-selected" : ""}`}>
                <div className={"return-button"}>
                    <img src={rightArrow} alt={"return"} onClick={() => setSelectedCharacter(null)}/>
                </div>
                <span>FILTERS</span>
                <div>
                    <img className={"filter-icon " + (selectedFilters.list.includes("damage") ? "selected-filter" : "")}
                         src={typeDamageImage} alt="Damage"
                         onClick={() => filterCharacters("damage")}/>
                    <img
                        className={"filter-icon " + (selectedFilters.list.includes("support") ? "selected-filter" : "")}
                        src={typeSupportImage} alt="Support"
                        onClick={() => filterCharacters("support")}/>
                    <img className={"filter-icon " + (selectedFilters.list.includes("tank") ? "selected-filter" : "")}
                         src={typeTankImage}
                         alt="Tank"
                         onClick={() => filterCharacters("tank")}/>
                </div>
                <div className={"scroll-up-button"}>
                    <img src={rightArrow} alt={"scroll up"} onClick={() => scroll.scrollToTop()}/>
                </div>
            </div>
            <div id={"main-container"}>
                {
                    characters
                        ? React.Children
                            .toArray(children)
                            .map(child => React.cloneElement(child, {characters: filteredCharacters}))
                        : <></>
                }
            </div>
        </>
    )
};

export default MainFilter;
