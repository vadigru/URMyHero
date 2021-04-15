import React from "react";
import axios from "axios";

import Pagination from "../pagination/pagination.js";

import {rebuildCharacterData} from '../../adapter/character-adapter.js';
import './app.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      characters: [],
      character: {},
      query: ``,
      isCharactersLoaded: false,
      isCharacterLoaded: false,
      isCharactersFetching: false,
      isCharacterFetching: false,
      message: ``
    };

    this.inputRef = React.createRef();

    this.handleInput = this.handleInput.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  handleInput(evt) {
    this.setState({
      query: evt.target.value,
      message: ``
    });
  }

  getCharacters(evt, startFrom = 0) {
    evt.preventDefault();
    this.setState({
      // ...this.state,
      isCharactersLoaded: false,
      isCharacterLoaded: false,
      isCharactersFetching: true,
      isCharacterFetching: false
    });
    const options = {
      method: `GET`,
      // url: `http://www.omdbapi.com/?t=${this.state.query}&plot=full&apikey=a74a9baa`,
      // url: `http://www.omdbapi.com/?s=${this.state.query}&apikey=a74a9baa`,
      // url: `https://superheroapi.com/api/1927473677409570/search/${this.state.query}`,
      url: `https://comicvine.gamespot.com/api/characters/?api_key=f768f741063f78c61004758737afa932be2d4d8d&filter=name:${this.state.query}&limit=20&offset=${startFrom}&format=json`,
      // url: `https://comicvine.gamespot.com/api/characters/?api_key=f768f741063f78c61004758737afa932be2d4d8d&sort=name&format=json`,
      // url: `https://api.shortboxed.com/comics/v1/new`
    };
    axios.request(options).then(
        (response) => {
          // console.log(response.data)
          if (!response.data.number_of_page_results) {
            this.setState({message: `Nothing found on your query!`});
          }
          this.setState({
            // ...this.state,
            data: response.data,
            characters: response.data.response !== `error` ? response.data.results : [],
            isCharactersLoaded: true,
            isCharacterLoaded: false,
            isCharactersFetching: false,
            isCharacterFetching: false
          });
        }

    ).catch((error) => {
      console.error(error);
    });
  }

  getCharacterInfo(id) {
    this.setState({
      // ...this.state,
      isCharactersLoaded: false,
      isCharacterLoaded: false,
      isCharactersFetching: false,
      isCharacterFetching: true
    });
    const options = {
      method: `GET`,
      // url: `http://www.omdbapi.com/?t=${this.state.query}&plot=full&apikey=a74a9baa`,
      // url: `http://www.omdbapi.com/?s=${this.state.query}&apikey=a74a9baa`,
      // url: `https://superheroapi.com/api/1927473677409570/${id}`,
      url: `https://comicvine.gamespot.com/api/character/4005-${id}/?api_key=f768f741063f78c61004758737afa932be2d4d8d&format=json`,
      // url: `https://api.shortboxed.com/comics/v1/new`
    };
    axios.request(options).then(
        // (response) => console.log(response),
        (response) => this.setState({
          // ...this.state,
          character: response.data.results,
          isCharactersLoaded: false,
          isCharacterLoaded: true,
          isCharactersFetching: false,
          isCharacterFetching: false
        })
    ).catch((error) => {
      console.error(error);
    });
  }

  renderCharacter() {
    const character = rebuildCharacterData(this.state.character);
    console.log(this.state.character);
    return (
      <>
        <h2>{character.name} {character.fullName !== `` ? `: ${character.fullName}` : null}</h2>
        <p><img className={`character__image`} src={character.image} /></p>
        <p>{character.deck}</p>
        {/* <p dangerouslySetInnerHTML={{__html: character.description}} /> */}
        <ul>Alter Egos: {character.alterEgos !== null ? character.alterEgos.split(/\n/).map((alterEgo, i) => {
          return (
            <li key={alterEgo + i}>{alterEgo}</li>
          );
        }) : null}</ul>
        <ul>Groups: {character.groupAffiliation.map((group, i) => {
          return (
            <li key={group + i}>{group.name}</li>
          );
        })}</ul>
        {/* <ul>Ralatives: {character.connections.relatives.split(`;`).map((relative, i) => {
          return (
            <li key={relative + i}>{relative}</li>
          );
        })}</ul> */}
      </>
    );
  }

  renderCharacters() {
    return (
      <ul className={`characters list`}>
        {this.state.characters.map((character, i) => {
          return (
            <li key={character.name + i} className={`list__item`}>
              <h2 onClick={() => this.getCharacterInfo(character.id)}>{character.name}</h2>
              <p onClick={() => this.getCharacterInfo(character.id)}>{character.image.original_url ? <img src={character.image.original_url} width="200px" height="auto"/> : `No poster found for this character :-(`}</p>
            </li>
          );
        })}
      </ul>
    );
  }

  checkFetching() {
    switch (true) {
      case this.state.isCharactersFetching:
        return `CHARACTERS DATA IS LOADING...`;
      case this.state.isCharacterFetching:
        return `CHARACTER DATA IS LOADING...`;
      default:
        return false;
    }
  }

  renderData() {
    switch (true) {
      case this.state.isCharactersLoaded:
        return this.renderCharacters();
      case this.state.isCharacterLoaded:
        return this.renderCharacter();
      default:
        return this.checkFetching();
    }
  }

  validation(evt) {
    evt.preventDefault();
    switch (true) {
      case this.state.query === ``:
        this.setState({message: `Field should not be empty!`});
        return;
      case this.state.query.length < 3:
        this.setState({message: `Query length should be at least 3 symbols!`});
        return;
      default:
        this.getCharacters(evt);
        this.setState({data: null, message: ``});
    }
  }

  render() {
    return (
      <>
        <form method="get" action="">
          <input
            onChange={this.handleInput}
            value={this.state.query}
            ref={this.inputRef}
          />
          <input
            type="submit"
            onClick={(evt) => {
              this.validation(evt);
            }}
            value="SEARCH"
          />
          <span>{this.state.message}</span>
        </form>
        {this.state.data ? <Pagination entriesAmnt={this.state.data.number_of_total_results} getCharacters={this.getCharacters} /> : null}
        {this.renderData()}
      </>
    );
  }
}

export default App;
