import React, { Component } from 'react';
import LeaguesTable from './LeaguesTable';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DollarSign from 'react-feather/dist/icons/dollar-sign';

class DraftRoom extends Component {
    state = {
        leagues: null,
    };

    constructor(props) {
        super(props);
        // this.handleLeagueClick = this.handleLeagueClick.bind(this);
        // this.handleDialogClose = this.handleDialogClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // TODO - Connect with the api to creaet leagues

    onSubmit = (event) => {
        // fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/v2/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: 'Try this',
        //         teamCount: 16,
        //         rosterSize: 22,
        //         budget: 300,
        //     })
        // })
        event.preventDefault()
    }

    async componentDidMount() {
        var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues');
        if (response.status !== 200) throw Error("Error fetching stats and rankings");
        var leagues = await response.json();
        this.setState({leagues: leagues});
    }
    render() {
        return (
            <div>
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="League Name" />
                    </Form.Group>

                    <Form.Group controlId="formTeams">
                        <Form.Label>Teams</Form.Label>
                        <FormControl type="number" placeholder="League Size"/>
                    </Form.Group>

                    <Form.Group controlId="formBudget">
                        <Form.Label>Budget</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><DollarSign/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" placeholder="Draft Budget"/>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group controlId="formRosterSize">
                        <Form.Label>Draft Picks</Form.Label>
                        <FormControl type="number" placeholder="Draft Picks"/>
                        <Form.Text className="text-muted">
                            How many players must be rostered at the end of a draft?
                            Extra slots like Minors and NA that do not count as a draft 
                            pick should not be included.
                        </Form.Text>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" type="reset">
                        Clear
                    </Button>
                </Form>
                </Container>
                <LeaguesTable leagues={this.state.leagues} />
                </div>
        );
    }
}
 
export default DraftRoom;