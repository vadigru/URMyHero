import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator as StateActionCreator} from '../../reducer/state/state.js';
import {getData} from '../../reducer/data/selectors.js';
import {getMessage} from '../../reducer/state/selectors.js';

import Character from '../Character';
import Characters from '../Characters';
import Header from '../Header';
import Message from '../Message';
import Pagination from '../Pagination';

import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  // }

  // componentDidUpdate() {
  // }

  // shouldComponentUpdate(prevProps) {
  //   // console.log('shouldComponentUpdate(prevProps) this.props', this.props);
  //   // console.log('shouldComponentUpdate(prevProps) prevProps', prevProps);
  //   // return this.props !== prevProps;
  // }
  renderCharacter() {
    return (
      <Character />
    );
  }

  renderCharacters() {
    return (
      <Characters />
    );
  }

  checkFetching() {
    switch (true) {
      case this.props.isCharactersFetching:
        return this.props.setMessage(`CHARACTERS DATA IS LOADING...`);
      case this.props.isCharacterFetching:
        return this.props.setMessage(`CHARACTER DATA IS LOADING...`);
      default:
        return this.props.setMessage(``);
    }
  }

  renderData() {
    switch (true) {
      case this.props.isCharactersLoaded:
        return this.renderCharacters();
      case this.props.isCharacterLoaded:
        return this.renderCharacter();
    }
  }

  renderHeader() {
    return (
      <Header />
    );
  }

  render() {
    console.log('DATA', this.props.data);
    return (
      <div className="container">
        {this.renderHeader()}
        {this.props.data ? <Pagination /> : null}
        {this.renderData()}
        {this.props.message ? <Message message={this.props.message} /> : null}
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object,
  isCharactersFetching: PropTypes.bool.isRequired,
  isCharacterFetching: PropTypes.bool.isRequired,
  isCharactersLoaded: PropTypes.bool.isRequired,
  isCharacterLoaded: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isCharactersLoaded: state.STATE.isCharactersLoaded,
  isCharacterLoaded: state.STATE.isCharacterLoaded,
  isCharactersFetching: state.STATE.isCharactersFetching,
  isCharacterFetching: state.STATE.isCharacterFetching,
  data: getData(state),
  message: getMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  setMessage(message) {
    dispatch(StateActionCreator.setMessage(message));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
