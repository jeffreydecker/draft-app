import React, { Component } from 'react';
import PlayersTable from './PlayersTable'
import TeamsTable from './TeamsTable'

const columns = {
    rankings: ['#', 'Name', 'Positions', 'Team'],
    hitting: [],
    pitching: [],
};

class DraftRoom extends Component {
    state = {
        league: null,
    };

    async componentDidMount() {
        var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/5c6a1e6f5447a601b68f255d');
        const league = await response.json();
    
        league.players.sort(function(a, b){return a._player.rank - b._player.rank})

        if (response.status !== 200) throw Error("Error fetching stats and rankings");
    
        this.setState({league: league});
    }

    render() {
        return (
            <div>
                <TeamsTable league={this.state.league}/>
                <PlayersTable league={this.state.league}/>
            </div>
        );
    }
}
 
export default DraftRoom;