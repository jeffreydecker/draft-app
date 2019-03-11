import React, { Component } from 'react';
import PlayersDialog from './PlayerDialog'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

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

    handlePlayerClick = (event) => {
        this.setState({dialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }

    async componentDidMount() {
        // var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/5c6a1e6f5447a601b68f255d');
        // const league = await response.json();
    
        // league.players.sort(function(a, b){return a._player.rank - b._player.rank})

        // if (response.status !== 200) throw Error("Error fetching stats and rankings");
    
        // this.setState({league: league});
    }

    render() {
        return (
            <Container>
                <Table responsive="sm" size="sm" striped hover>
                    <thead>
                        <tr>
                            {columns.map((title, index) => (
                                <th>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.league ? 
                            this.props.league.teams.map(team => (
                                <tr key={team._id} team-id={team._id} onClick={this.handlePlayerClick}>
                                    <td component="th" scope="row">{team.name}</td>
                                    <td>0 of {this.props.league.budget}</td>
                                    <td>{this.props.league.budget} of {this.props.league.budget}</td>
                                    <td>{this.props.league.rosterSize - team.players.length}</td>
                                    <td>?</td>
                                </tr>
                            ))
                            : <div>Loading</div>
                        }
                    </tbody>
                </Table>
                <PlayersDialog open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
            </Container>
        );
    }
}
 
export default TeamsTable;