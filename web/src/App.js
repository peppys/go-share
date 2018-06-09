import React, { Component } from 'react';
import IDE from './Containers/IDE'
import logo from './Images/logo.svg';
import material from './material'
import './Style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Go Share <a href={window.location.href}>{window.location.href} </a></h1>
        </header>

        <IDE />
      </div>
    );
  }
}

export default material(App)
