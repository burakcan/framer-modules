import React, { Component, PropTypes } from 'react';
import { searchModule, searchFocus, searchBlur } from 'actions';

class SearchBox extends Component {
  handleChange() {
    const value = React.findDOMNode(this.refs['search']).value;
    let searchTerm = null;

    if (value.length > 2) searchTerm = value;
    this.context.store.dispatch( searchModule(searchTerm) );
  }

  handleFocus() {
    this.context.store.dispatch( searchFocus() );
  }

  handleBlur() {
    this.context.store.dispatch( searchBlur() );
  }

  render() {
    return (
      <div className="search">
        <div className="container">
          <input
            className="search_input"
            type="search"
            placeholder="Search"
            ref='search'
            onFocus={this.handleFocus.bind(this)}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)} />
            <button className="search_clear" type="button">
              <i className="icon icon-close"></i>
            </button>
        </div>
      </div>
    )
  }
}

SearchBox.contextTypes = {
  store : PropTypes.object
}

export default SearchBox;
