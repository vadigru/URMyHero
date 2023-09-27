import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { redirect, useParams, Link } from "react-router-dom";

import { Operation as DataOperation } from "../../reducer/data/data.js";
import { getCharacter, getCharacters } from "../../reducer/data/selectors.js";

import { rebuildCharacterData } from '../../adapter/character-adapter.js';

import './character.scss';


const Character = (props) => {
    // let character = rebuildCharacterData(props.character);
    // let character;
    // const navigate = useNavigate();
    const { id } = useParams();

    let [character, setCharacter] = useState('');

    // let characterId;
    useEffect(() => {
        if (!character) {
            console.log('PARAMS', id);
            props.getCharacter(id).then((character) => {
                console.log('ID chat', character)
                character = rebuildCharacterData(character);
                setCharacter(character);
            });
        }
    }, [character]);

    // useEffect(() => {
    //   if (character) {
    //     character = rebuildCharacterData(props.character);
    //     setCharacter(character);
    //   }
    // });

    // character = rebuildCharacterData(character);


    return (
        character ?
            <div className="character">
                {/* <button onClick={() => redirect(`/#/characters/${props.query}`)}>go back</button> */}
                {/* <Link to={`/characters/${props.query}`}>go back</Link> */}
                <h2 className="character__title">{character.name} {character.realName && character.name !== character.realName ? `: ${character.realName} ` : ``}</h2>
                <p className="character__image">
                    <img src={character.image} />
                </p>
                <p className="character__description">{character.description}</p>
                <div className="character__lists">
                    <section className="character__list">
                        <h3 className="character__list-title">Alter Egos:</h3>
                        <ul>
                            {character.alterEgos !== null ? character.alterEgos.split(/\n/).map((alterEgo, i) => {
                                return (
                                    <li key={alterEgo + i} className="character__alter-ego">{alterEgo}</li>
                                );
                            }) : null}
                        </ul>
                    </section>
                    <section className="character__list">
                        <h3 className="character__list-title">Relatives:</h3>
                        <ul>
                            {character.relatives.replaceAll(")", ");").replaceAll(");,", ");").split(";").map((relative, i) => {
                                return (
                                    <li key={relative + i} className="character__group">{relative}</li>
                                );
                            })}
                        </ul>
                    </section>
                    <section className="character__list">
                        <h3 className="character__list-title">Groups:</h3>
                        <ul>
                            {character.groupAffiliation.replaceAll(")", "),").split(",").map((group, i) => {
                                return (
                                    <li key={group + i} className="character__group">{group}</li>
                                );
                            })}
                        </ul>
                    </section>
                </div>
            </div> : null
    );
};

Character.propTypes = {
    character: PropTypes.object
};

const mapStateToProps = (state) => ({
    characters: getCharacters(state),
    character: getCharacter(state),
    isCharacterLoaded: state.STATE.isCharacterLoaded,
});

const mapDispatchToProps = {
    getCharacter: DataOperation.getCharacter,
};

export { Character };
export default connect(mapStateToProps, mapDispatchToProps)(Character);
