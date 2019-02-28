import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const columns = ['My Leagues'];

class LeaguesTable extends Component {
    state = {
        leagues: null,
        dialogOpen: false,
    };

    constructor(props) {
        super(props);
        this.handleLeagueClick = this.handleLeagueClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    // TODO - Navigate to the league draft view
    handleLeagueClick = (event) => {
        // this.setState({dialogOpen: true})
    }

    handleDialogClose = () => {
        // this.setState({dialogOpen: false})
    }

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
                                <tr key={league._id} team-id={league._id} onClick={this.handleLeagueClick}>
                                    <td component="th" scope="row">{league.name}</td>
                                </tr>
                            ))
                            : <div>Loading</div>
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}
 
export default LeaguesTable;