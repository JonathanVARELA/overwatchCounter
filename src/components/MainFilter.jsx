import React, {useEffect, useRef, useState} from 'react';
import "./MainFilter.css"
import typeDamageImage from "../images/damage.svg"
import typeTankImage from "../images/tank.svg"
import typeSupportImage from "../images/support.svg"
import rightArrow from "../images/arrow.svg";
import {animateScroll as scroll} from "react-scroll";

const MainFilter = ({characters, children}) => {

    const [filteredCharacters, setFilteredCharacters] = useState();

    const [isSticky, setSticky] = useState(false);

    const ref = useRef(null);
    let initialMainFilterContainerOffsetTop = -1;

    const [selectedFilters, setSelectedFilters] = useState({list: []});

    const handleScroll = () => {
        if (window.innerWidth <= 801) return;
        if (ref.current) {
            if (initialMainFilterContainerOffsetTop === -1) {
                initialMainFilterContainerOffsetTop = ref.current.offsetTop
            }
            if (window.pageYOffset >= initialMainFilterContainerOffsetTop) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }
    };

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

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, [characters])

    return (
        <>
            <div ref={ref} className={`main-filter sticky-wrapper${isSticky ? ' sticky' : ''}`}>
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
            <body>
            {
                characters
                    ? React.Children
                        .toArray(children)
                        .map(child => React.cloneElement(child, {characters: filteredCharacters}))
                    : <></>
            }
            </body>
        </>
    )
};

export default MainFilter;
