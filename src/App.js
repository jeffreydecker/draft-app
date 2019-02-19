import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './AppBar';
import PlayersTable from './PlayersTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <PlayersTable />
      </div>
    );
  }
}

export default App;
