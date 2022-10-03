import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

import './search.scss';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchMessage: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.validation = this.validation.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({searchQuery: this.props.query});
    }
  }

  validation(evt) {
    evt.preventDefault();
    switch (true) {
      case this.state.searchQuery === ``:
        this.setState({searchMessage: `Field should not be empty!`});
        return;
      case this.state.searchQuery.length < 3:
        this.setState({searchMessage: `Query length should be at least 3 symbols!`});
        return;
      default:
        this.props.getCharacters(this.state.searchQuery);
        this.props.setData(null);
    }
  }

  handleInput(evt) {
    this.setState({searchQuery: evt.target.value});
    this.setState({searchMessage: ''});
  }

  render() {
    return (
      <section className="search">
        <form className={`search__form`} method="get" action="">
          <input
            className={`search__input`}
            onChange={this.handleInput}
            value={this.state.searchQuery}
            ref={this.inputRef}
          />
          <input
            className={`search__button`}
            type="submit"
            onClick={this.validation}
            value="SEARCH"
          />
          <span className='search__message'>{this.state.searchMessage}</span>
        </form>
      </section>
    );
  }
}

Search.propTypes = {
  getCharacters: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.DATA.query,
  state
});

const mapDispatchToProps = (dispatch) => ({
  getCharacters(searchQuery, startFrom) {
    dispatch(DataOperation.getCharacters(searchQuery, startFrom));
  },
  setData(data) {
    dispatch(DataActionCreator.setData(data));
  },
});

export {Search};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
