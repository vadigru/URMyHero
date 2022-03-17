import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import {rebuildCharacterData} from '../../adapter/character-adapter.js';

import './character.scss';
import { getCharacter } from "../../reducer/data/selectors.js";

class Character extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const character = rebuildCharacterData(this.props.character);
    console.log(this.state.character);
    console.log(this.props);
    return (
      <div className="character">
        <h2 className="character__title">{character.name} {character.realName && character.name !== character.realName ? `: ${character.realName} ` : ``}</h2>
        <p className="character__image">
          <img src={character.image} />
        </p>
        <p className="character__description">{character.deck}</p>
        {/* <p dangerouslySetInnerHTML={{__html: character.description}} /> */}
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
            <h3 className="character__list-title">Groups:</h3>
            <ul>
              {character.groupAffiliation.map((group, i) => {
                return (
                  <li key={group + i} className="character__group">{group.name}</li>
                );
              })}
            </ul>
          </section>
        </div>

        {/* <ul>Ralatives: {character.connections.relatives.split(`;`).map((relative, i) => {
          return (
            <li key={relative + i}>{relative}</li>
          );
        })}</ul> */}
      </div>
    );
  }
}

Character.propTypes = {
  character: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  character: getCharacter(state),
});

export {Character};
export default connect(mapStateToProps, null)(Character);
