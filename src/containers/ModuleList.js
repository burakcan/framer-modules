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
      modules      : this.props.modules,
      searchTerm   : this.props.searchTerm,
      searchResult : this.props.searchResult,
      loading      : this.props.loading,
    }
  }

  render() {
    return (
      <ModuleListComponent />
    )
  }
}

ModuleList.propTypes = ModuleList.childContextTypes = {
  modules      : PropTypes.object,
  searchTerm   : PropTypes.string,
  searchResult : PropTypes.object,
  loading      : PropTypes.bool,
}

ModuleList.mapStateToProps = (state) => {
  return {
    modules      : state.modules.modules,
    searchTerm   : state.modules.search.term,
    searchResult : state.modules.search.result,
    loading      : state.modules.loading,
  }
}

export default connect(
  ModuleList.mapStateToProps, { fetchModules }
)(ModuleList);
