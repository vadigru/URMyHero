import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {ActionCreator as StateActionCreator} from "../../reducer/state/state.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getCharacters, getCharacter} from "../../reducer/data/selectors.js";
import {getMessage} from "../../reducer/state/selectors.js";

import './characters.scss';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log('CHARACTERS', this.props.characters);
    return (
      <ul className={`characters`}>
        {this.props.characters.map((character, i) => {
          return (
            <li key={character.name + i} className={`characters__item`}>
              <h2 className="characters__item-title" onClick={() => this.props.getCharacter(+character.id)}>{character.name}</h2>
              <p className="characters__item-image" onClick={() => this.props.getCharacter(+character.id)} >{character.image.url ? <img src={character.image.url} width="200px" height="auto"/> : `No poster found for this character :-(`}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

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
});

const mapDispatchToProps = (dispatch) => ({
  getCharacter(id) {
    dispatch(DataOperation.getCharacter(id));
  },
  setMessage(message) {
    dispatch(StateActionCreator.setMessage(message));
  },
});

export {Characters};
export default connect(mapStateToProps, mapDispatchToProps)(Characters);
