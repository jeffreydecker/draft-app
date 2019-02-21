import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './AppBar';
import DraftRoom from './DraftRoom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <DraftRoom />
      </div>
    );
  }
}

export default App;
