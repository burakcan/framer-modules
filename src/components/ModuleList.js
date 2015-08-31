import React, { Component, PropTypes } from 'react';
import ModuleListItem from 'components/ModuleListItem';

class ModuleList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected : null
    }
  }

  handleClose(index) {
    this.setState({
      selected : null
    });
  }

  handleClick(index) {
    this.setState({
      selected : index
    });
  }

  componentWillUpdate() {
    const { selected } = this.state;
    const { searchTerm, searchResult } = this.context;

    if (this._lastSearchTerm !== searchTerm &&
        searchTerm && searchResult &&
        !searchResult[selected]) {

      this.setState({
        selected : null
      });
    }

    this._lastSearchTerm = this.context.searchTerm;
  }

  renderItems() {
    const { searchTerm, searchResult, modules } = this.context;

    const _items = (searchTerm) ? searchResult : modules;
    const items  = [];

    for (const index in _items) {
      const selected = this.state.selected === index;
      items.push(
        <ModuleListItem
          onClose={this.handleClose.bind(this, index)}
          onClick={this.handleClick.bind(this, index)}
          selected={selected}
          data={_items[index]}
          key={index} />
      )
    }

    return items;
  }

  render() {
    const selected = (this.state.selected || this.context.searchFocused) ? true : false;

    return (
      <ul data-module-selected={selected} className="modules">
        { this.renderItems() }
      </ul>
    )
  }
}

ModuleList.contextTypes = {
  modules      : PropTypes.object,
  searchTerm   : PropTypes.string,
  searchResult : PropTypes.object,
  searchFocused: PropTypes.bool,
  loading      : PropTypes.bool,
}

export default ModuleList;
