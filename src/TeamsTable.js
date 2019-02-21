import React, { Component } from 'react';
import PlayersDialog from './PlayerDialog'
import Table from 'react-bootstrap/Table'

const columns = ['Name', '$ Spent', '$ Left', 'Picks Left', 'Max Bid'];

class TeamsTable extends Component {
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
        return (
            <div>
                <Table responsive="sm" striped hover>
                    <thead>
                        <tr>
                            {columns.map((title, index) => (
                                <th align={index > 0 ? "right" : "left"}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.league ? 
                            this.state.league.teams.map(team => (
                                <tr key={team._id} onClick={event => this.handlePlayerClick(event, team._id)}>
                                    <td component="th" scope="row">{team.name}</td>
                                    <td align="right">0 of {this.state.league.budget}</td>
                                    <td align="right">{this.state.league.budget} of {this.state.league.budget}</td>
                                    <td align="right">{this.state.league.rosterSize - team.players.length}</td>
                                    <td align="right">?</td>
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
 
export default TeamsTable;