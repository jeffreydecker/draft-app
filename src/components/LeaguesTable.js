import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'

const columns = ['League', 'Edit'];

class LeaguesTable extends Component {
    state = {
        leagues: null,
        dialogOpen: false,
    };

    constructor(props) {
        super(props);
        this.handleLeagueClick = this.handleLeagueClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    // TODO - Do we need this with router links?
    handleLeagueClick = (event) => {}
    // TODO - Fill in
    handleEditClick = (event) => {
        alert("Edit Click")
        event.preventDefault()
    }
    // TODO - Maybe we need a confirmation, this maybe should be a league 
    handleDialogClose = () => {}

    // TODO - Add settings and delete buttons to the league table
    // Settings shows a dialog to update the league settings
    // Delete will delete the league after a confirmation
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
                        {this.props.leagues ? 
                            this.props.leagues.map(league => (
                                    <tr key={league._id} team-id={league._id}>
                                        <LinkContainer to={`/league/${league._id}`}>
                                            <td component="th" scope="row">{league.name}</td>
                                        </LinkContainer>
                                        <td data-league={league} onClick={this.handleEditClick}>Edit</td>
                                    </tr>
                                
                            ))
                            : <tr><td>Loading...</td></tr>
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}
 
export default LeaguesTable;