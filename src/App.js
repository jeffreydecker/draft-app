import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import DraftRoom from './components/DraftRoom';
import Leagues from './components/Leagues';
import { Switch, Route, IndexRoute, Link, hashHistory } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="App">
        Welcome!
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/leagues" component={Leagues} />
        <Route path="/draft" component={DraftRoom} />
        <Route path="/league/:leagueId" component={DraftRoom} />
      </Switch>
      </div>
    );
  }
}

export default App;
