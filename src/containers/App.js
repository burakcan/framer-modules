import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import createStore from 'store/createStore';
import ModuleList from 'containers/ModuleList';
import SearchBox from 'components/SearchBox';
import Header from 'components/Header';

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() =>
          <div>
            <Header />
            <SearchBox />
            <ModuleList />
          </div>
        }
      </Provider>
    )
  }
}

export default App;
