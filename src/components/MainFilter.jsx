import React, {useEffect, useRef, useState} from 'react';
import "./MainFilter.css"

const MainFilter = ({characters, children}) => {

    const [filteredCharacters, setFilteredCharacters] = useState();

    const [isSticky, setSticky] = useState(false);
    const [placeHolderHeight, setPlaceHolderHeight] = useState(0);

    const ref = useRef(null);
    let initialMainFilterContainerOffsetTop = -1;

    const handleScroll = () => {
        if (ref.current) {
            if (initialMainFilterContainerOffsetTop === -1) {
                initialMainFilterContainerOffsetTop = ref.current.offsetTop
            }
            if (window.pageYOffset >= initialMainFilterContainerOffsetTop) {
                setPlaceHolderHeight(ref.current.offsetHeight);
                setSticky(true);
            } else {
                setPlaceHolderHeight(0);
                setSticky(false);
            }
        }
    };

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
            <div className={"stickyPlaceHolder"} style={{minHeight: placeHolderHeight + 'px'}}/>
            <div ref={ref} className={`main-filter sticky-wrapper${isSticky ? ' sticky' : ''}`}/>
            {
                characters
                    ? React.Children
                        .toArray(children)
                        .map(child => React.cloneElement(child, {characters: filteredCharacters}))
                    : <></>
            }
        </>
    )
};

export default MainFilter;
