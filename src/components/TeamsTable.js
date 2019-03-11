import React, { Component } from 'react';
import PlayersDialog from './PlayerDialog'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const columns = ['Name', '$ Remaining', 'Picks Remaining', 'Max Bid', 'Avg. Bid'];

class TeamsTable extends Component {
    state = {
        league: null,
        dialogOpen: false,
    };

    constructor(props) {
        super(props);
        this.handleTeamClick = this.handleTeamClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleTeamClick = (event) => {
        this.setState({dialogOpen: true})
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }

    render() {
        var rows = []
        if (this.props.league) {
            const that = this
            this.props.league.teams.forEach(team => {
                var spent = 0
                var picks = 0
                team.players.forEach(playerId => {
                    let player = that.props.league.players.find(p => {
                        return p._id === playerId
                    })
                    spent += player.salary
                    if (player.isRostered) {
                        picks += 1
                    }
                });
    
                var moneyRemaining = this.props.league.budget - spent
                var picksRemaining = this.props.league.rosterSize - picks
                var maxBid = moneyRemaining - picksRemaining - 1
                var avgBid = moneyRemaining / picksRemaining
    
                rows.push((
                    <tr key={team._id} team-id={team._id} onClick={this.handleTeamClick}>
                        <td component="th" scope="row">{team.name}</td>
                        <td>{moneyRemaining} of {this.props.league.budget}</td>
                        <td>{picksRemaining} of {this.props.league.rosterSize}</td>
                        <td>{maxBid}</td>
                        <td>{avgBid.toFixed(2)}</td>
                    </tr>
                ))
            });
        }
        
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
                        {
                            rows.map(team => (
                                team
                            ))
                        }
                    </tbody>
                </Table>
                <PlayersDialog open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
            </Container>
        );
    }
}
 
export default TeamsTable;