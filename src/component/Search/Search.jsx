import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import Characters from '../Characters';
import Character from '../Character';

import { ActionCreator as DataActionCreator } from "../../reducer/data/data.js";
import { Operation as DataOperation } from "../../reducer/data/data.js";
import { ActionCreator as StateActionCreator } from "../../reducer/state/state.js";

import './search.scss';
import { useState } from 'react';
import { getQuery } from '../../reducer/data/selectors';

const Search = (props) => {
    // this.handleInput = this.handleInput.bind(this);
    // this.validation = this.validation.bind(this);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchMessage, setSearchMessage] = useState('');

    const navigate = useNavigate();
    // const goToSearchResults = () => navigate(`/search-results/${searchQuery}`);

    // useEffect(() => {
    //     setSearchQuery(props.query);
    //     // props.setCharactersLoaded(false);
    //     // props.setData(null);65
    //     // props.setCharacters([]);
    // }, [searchQuery]);

    const validation = (evt) => {
        evt.preventDefault();
        switch (true) {
            case searchQuery === ``:
                setSearchMessage(`Field should not be empty!`);
                return;
            case searchQuery.length < 3:
                setSearchMessage(`Query length should be at least 3 symbols!`);
                return;
            default:
                // goToSearchResults();
                // props.getCharacters(searchQuery);
                props.setData(null);
                console.log('searchQuery', searchQuery);
                // props.setQuery(searchQuery);
                navigate(`/characters/${searchQuery}`, { replace: false });
        }
    }

    const handleInput = (evt) => {
        console.log("target.value", evt.target.value);
        setSearchQuery(evt.target.value);
        // props.setQuery(evt.target.value);
        setSearchMessage('');
    }

    return (
        <>
            {/* <button onClick={navigate(-1)}>go back</button> */}
            <section className="search">
                <form className={`search__form`} method="get" action="">
                    <input
                        className={`search__input`}
                        onChange={handleInput}
                        value={searchQuery}
                    // ref={this.inputRef}
                    />
                    <input
                        className={`search__button`}
                        type="submit"
                        onClick={validation}
                        value="SEARCH"
                    />
                    <span className='search__message'>{searchMessage}</span>
                </form>
            </section>
            {/* <section className="search-result">
            {props.isCharactersLoaded ? <Characters /> : null}
          </section> */}
        </>
    );
}

Search.propTypes = {
    getCharacters: PropTypes.func.isRequired,
    isCharactersLoaded: PropTypes.bool.isRequired,
    isCharacterLoaded: PropTypes.bool.isRequired,
    setData: PropTypes.func.isRequired,
    query: PropTypes.string,
};

const mapStateToProps = (state) => ({
    query: getQuery(state),
    isCharactersLoaded: state.STATE.isCharactersLoaded,
    isCharacterLoaded: state.STATE.isCharacterLoaded,
    state
});

const mapDispatchToProps = (dispatch) => ({
    getCharacters(searchQuery, startFrom) {
        dispatch(DataOperation.getCharacters(searchQuery, startFrom));
    },
    setData(data) {
        dispatch(DataActionCreator.setData(data));
    },
    setCharactersLoaded(bool) {
        dispatch(StateActionCreator.setCharactersLoaded(bool))
    },
    setCharacters(arr) {
        dispatch(DataActionCreator.setCharacters(arr))
    },
    setQuery(text) {
        dispatch(DataActionCreator.setQuery(text))
    },
});

export { Search };
export default connect(mapStateToProps, mapDispatchToProps)(Search);
