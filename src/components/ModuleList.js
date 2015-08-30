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

  renderItems() {
    const modules = this.context.modules;
    if (modules._initial) return false;

    const items = [];

    for (const index in modules) {
      const selected = this.state.selected === index;
      items.push(
        <ModuleListItem
          onClose={this.handleClose.bind(this, index)}
          onClick={this.handleClick.bind(this, index)}
          selected={selected}
          data={modules[index]}
          key={index} />
      )
    }

    return items;
  }

  render() {
    const selected = (this.state.selected)?true:false;
    
    return (
      <ul data-module-selected={selected} className="modules">
        { this.renderItems() }
      </ul>
    )
  }
}

ModuleList.contextTypes = {
  modules : PropTypes.object
}

export default ModuleList;
