import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ModuleListComponent from 'components/ModuleList';
import { fetchModules } from 'actions';

class ModuleList extends Component {
  constructor(props) {
    super(props)
    this.props.fetchModules();
  }

  getChildContext() {
    return {
      modules : this.props.modules
    }
  }

  render() {
    return (
      <ModuleListComponent />
    )
  }
}

ModuleList.childContextTypes = {
  modules : PropTypes.object
}

ModuleList.propTypes = {
  modules : PropTypes.object
}

ModuleList.mapStateToProps = (state) => {
  return {
    modules : state.modules
  }
}

export default connect(
  ModuleList.mapStateToProps, { fetchModules }
)(ModuleList);
