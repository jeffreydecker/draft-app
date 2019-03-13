import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import TeamDialog from './TeamDialog';
import TeamRow from './TeamRow';

const columns = ['Name', '$ Remaining', 'Picks Remaining', 'Max Bid', 'Avg. Bid'];

class TeamsTable extends Component {
    state = {
        league: null,
        dialogOpen: false,
        dialogTeam: null,
    };

    constructor(props) {
        super(props);
        this.handleTeamClick = this.handleTeamClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleTeamClick = (team) => {
        this.setState({dialogOpen: true, dialogTeam: team})
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false, dialogTeam: null})
    }

    render() {
        var rows = []
        var dialog = null

        if (this.props.league) {
            this.props.league.teams.forEach(team => {    
                rows.push((
                    <TeamRow team={team} league={this.props.league} onClick={this.handleTeamClick} />
                ))
            });

            dialog = <TeamDialog open={this.state.dialogOpen} team={this.state.dialogTeam} players={this.props.league.players} onClose={this.handleDialogClose}/>
        }
        
        return (
            <Container>
                <Table responsive="sm" size="sm" striped hover>
                    <thead>
                        <tr>{columns.map((title, index) => (<th>{title}</th>))}</tr>
                    </thead>
                    <tbody>
                        {rows.map(team => (team))}
                    </tbody>
                </Table>
                {dialog}
            </Container>
        );
    }
}
 
export default TeamsTable;