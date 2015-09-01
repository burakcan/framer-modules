import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <h1 className="header_title">Framer modules</h1>
          <a className="add-plugin" href="https://github.com/interacthings/framer-modules-list" target="_blank">Add a module</a>
        </div>
      </header>
    )
  }
}

export default Header;
