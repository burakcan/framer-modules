import React, { Component, PropTypes } from 'react';
import { searchModule } from 'actions';

class SearchBox extends Component {
  handleChange() {
    const value = React.findDOMNode(this.refs['search']).value;
    let searchTerm = null;

    if (value.length > 2) searchTerm = value;

    this.context.store.dispatch( searchModule(searchTerm) );
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
            onChange={this.handleChange.bind(this)} />
        </div>
      </div>
    )
  }
}

SearchBox.contextTypes = {
  store : PropTypes.object
}

export default SearchBox;
