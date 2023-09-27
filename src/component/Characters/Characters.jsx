import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";

import { ActionCreator as StateActionCreator } from "../../reducer/state/state.js";
import { Operation as DataOperation } from "../../reducer/data/data.js";
import { getCharacters, getCharacter, getQuery } from "../../reducer/data/selectors.js";
import { getMessage } from "../../reducer/state/selectors.js";

import './characters.scss';

const Characters = (props) => {
    const { query } = useParams();

    // let [query, setQuery] = useState('');
    let [characters, setCharacters] = useState('');

    // let characterId;
    useEffect(() => {
        if (!characters) {
            props.getCharacters(query).then((characters) => {
                // character = rebuildCharacterData(character);
                console.log('CHARACTRES', characters);
                setCharacters(characters);
            });
        }
    }, [characters]);

    return (
        characters ?
            <>
                {/* <Link to="/">go back</Link> */}
                <ul className={`characters`}>
                    {characters.map((character, i) => {
                        return (
                            <li key={character.name + i} className={`characters__item`}>
                                <Link to={`/character/${character.id}`}>
                                    {/* <h2 className="characters__item-title" onClick={() => props.getCharacter(+character.id)}>{character.name}</h2> */}
                                    <h2 className="characters__item-title">{character.name}</h2>
                                    {/* <p className="characters__item-image" onClick={() => props.getCharacter(+character.id)} >{character.image.url ? <img src={character.image.url} width="200px" height="auto"/> : `No poster found for this character :-(`}</p> */}
                                    <p className="characters__item-image">{character.image.url ? <img src={character.image.url} width="200px" height="auto" /> : `No poster found for this character :-(`}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </> : null
    );
};

// class Characters extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     console.log('CHARACTERS', this.props.characters);
//     return (
//       <ul className={`characters`}>
//         {this.props.characters.map((character, i) => {
//           return (
//             <li key={character.name + i} className={`characters__item`}>
//               <Link to={`/character/${character.id}`}></Link>
//               <h2 className="characters__item-title" onClick={() => this.props.getCharacter(+character.id)}>{character.name}</h2>
//               <p className="characters__item-image" onClick={() => this.props.getCharacter(+character.id)} >{character.image.url ? <img src={character.image.url} width="200px" height="auto"/> : `No poster found for this character :-(`}</p>
//             </li>
//           );
//         })}
//       </ul>
//     );
//   }
// }

Characters.propTypes = {
    characters: PropTypes.arrayOf(PropTypes.object).isRequired,
    getCharacter: PropTypes.func.isRequired,
    message: PropTypes.string,
    setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    characters: getCharacters(state),
    character: getCharacter(state),
    message: getMessage(state),
    query: getQuery(state),
});

const mapDispatchToProps = {
    getCharacter: DataOperation.getCharacter,
    getCharacters: DataOperation.getCharacters,
    setMessage: StateActionCreator.setMessage,
};

export { Characters };
export default connect(mapStateToProps, mapDispatchToProps)(Characters);
