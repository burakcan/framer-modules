import 'babel-core/polyfill';
import sticky from 'root/vendor/jquery.sticky-kit.min.js';
import React from 'react';
import App from 'containers/App';
import 'styles/main';

sticky.call(window);

React.render(
  <App/>, document.getElementById('root')
);
