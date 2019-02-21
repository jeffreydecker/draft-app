import React, { Component } from 'react';
import PlayersDialog from './PlayerDialog'
import Table from 'react-bootstrap/Table'

const columns = {
    rankings: ['#', 'Name', 'Positions', 'Team'],
    hitting: [],
    pitching: [],
};

class PlayersTable extends Component {
    state = {
        league: null,
        dialogOpen: false,
    };

    constructor(props) {
        super(props);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handlePlayerClick = (event, id) => {
        this.setState({dialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }

    async componentDidMount() {
        var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/5c6a1e6f5447a601b68f255d');
        const league = await response.json();
    
        league.players.sort(function(a, b){return a._player.rank - b._player.rank})

        if (response.status !== 200) throw Error("Error fetching stats and rankings");
    
        this.setState({league: league});
    }

    render() {
        var playerData = [];

        if (this.state.league) {
            this.state.league.players.map(player => {
                var rank = player._player.rank
                if (rank == Number.MAX_SAFE_INTEGER) { rank = 'NA' }
                playerData.push({id: player._id, rank: rank, name: player._player.name, pos: player._player.pos, team: player._player.team})
            })
        }

        return (
            <div>
                <Table responsive="sm" striped hover>
                    <thead>
                        <tr>
                            {columns.rankings.map(title => (
                                <th>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.league ? 
                            this.state.league.players.map(player => (
                                <tr key={player._id} onClick={event => this.handlePlayerClick(event, player._id)}>
                                    <td component="th" scope="row">{player._player.rank == Number.MAX_SAFE_INTEGER ? 'NA' : player._player.rank}</td>
                                    <td align="right">{player._player.name}</td>
                                    <td align="right">{player._player.pos}</td>
                                    <td align="right">{player._player.team}</td>
                                </tr>
                            ))
                            : <div>Loading</div>
                        }
                    </tbody>
                </Table>
                <PlayersDialog open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
            </div>
        );
    }
}
 
export default PlayersTable;