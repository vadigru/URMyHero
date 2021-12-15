import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
    // console.log(this.state.activePage);
    return (
      <ul className="pagination">
        {this.renderPagesCount(this.props.entriesAmnt).map((it, i) => {
          return (
            <li
              className={`pagination-item ${this.state.activePage === it ? `pagination-item--active` : ``}`}
              key={it + i}
              onClick={(evt) => {
                this.props.getCharacters(evt, (20 * i));
                // this.setState({activePage: it});
                this.setState({activePage: it});
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
  getCharacters: PropTypes.func.isRequired,
  entriesAmnt: PropTypes.number,
};

export default Pagination;
