import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Search from '../Search';

import { ActionCreator as DataActionCreator } from "../../reducer/data/data.js";
import { ActionCreator as StateActionCreator } from "../../reducer/state/state.js";

import './header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.props.resetData();
        this.props.resetState();

    }

    render() {
        return (
            <header className="header">
                <h1 className="header__title" onClick={this.reset}>URMyHero</h1>
                <Search />
                {/* <Link to="/search">Search hero</Link> */}
                {/* <Link to="/favorites">Favorites heros</Link> */}
            </header>
        );
    }
}

Header.propTypes = {
    resetData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    resetData() {
        dispatch(DataActionCreator.resetData());
    },
    resetState() {
        dispatch(StateActionCreator.resetState());
    },
});

export { Header };
export default connect(null, mapDispatchToProps)(Header);
