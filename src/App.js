import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './AppBar';
import TeamsTable from './TeamsTable';
import PlayersTable from './PlayersTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <TeamsTable />
        <PlayersTable />
      </div>
    );
  }
}

export default App;
