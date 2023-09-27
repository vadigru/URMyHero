import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { Operation as DataOperation } from "../../reducer/data/data.js";

import { getData, getQuery } from '../../reducer/data/selectors.js';

import { charactersCount } from '../../constants.js';

import './pagination.scss';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    renderPagesCount(amnt) {
        const pages = [];

        for (let i = 1; i <= Math.ceil(amnt / 20); i++) {
            pages.push(i);
        }
        return pages;
    }

    render() {
        console.log(this.props.data.number_of_total_results);
        return (
            <ul className="pagination">
                {this.renderPagesCount(this.props.data.number_of_total_results).map((it, i) => {
                    return (
                        <li
                            className={`pagination-item ${this.state.activePage === it ? `pagination-item--active` : ``}`}
                            key={it + i}
                            onClick={() => {
                                this.props.getCharacters(this.props.query, (charactersCount * i));
                                this.setState({ activePage: it });
                            }}
                        >
                            <a>{it}</a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

Pagination.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    query: PropTypes.string.isRequired,
    getCharacters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    data: getData(state),
    query: getQuery(state),
});

const mapDispatchToProps = (dispatch) => ({
    getCharacters(query, startFrom) {
        dispatch(DataOperation.getCharacters(query, startFrom));
    },
});

export { Pagination };
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
