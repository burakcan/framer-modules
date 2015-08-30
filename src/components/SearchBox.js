import React, { Component, PropTypes } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div className="search">
        <div className="container">
          <input className="search_input" type="search" placeholder="Search" />
        </div>
      </div>
    )
  }
}

export default SearchBox;
