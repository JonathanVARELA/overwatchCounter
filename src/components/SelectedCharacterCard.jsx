import React, {useContext} from 'react';
import "./SelectedCharacterCard.css"
import CharacterContext from "../CharacterContext";
import typeDamageImage from "../images/damage.svg"
import typeTankImage from "../images/tank.svg"
import typeSupportImage from "../images/support.svg"

const SelectedCharacterCard = () => {

    const [selectedCharacter,] = useContext(CharacterContext);

    const getTypeImage = () => {
        switch (selectedCharacter.type) {
            case "damage":
                return typeDamageImage;
            case "support":
                return typeSupportImage;
            case "tank":
                return typeTankImage;
            default:
                return ""
        }
    };

    return (
        <>
            {
                selectedCharacter
                    ? <div className={"selected-character-card"}>
                        <div className={"image-container"}>
                            <img src={selectedCharacter.avatar} alt=""/>
                        </div>
                        <div className={"profile"}>
                            <div className={"role"}>
                                <div className={"text"}>
                                    <p>ROLE</p>
                                    <p>
                                        <span>
                                            {selectedCharacter.type}
                                        </span>
                                    </p>
                                </div>
                                <img src={getTypeImage()} alt={selectedCharacter.type}/>
                            </div>
                            <div className={"name"}>
                                {selectedCharacter.name}
                            </div>
                        </div>
                    </div>
                    : <></>
            }
        </>
    )
};

export default SelectedCharacterCard;
