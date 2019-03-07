import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DollarSign from 'react-feather/dist/icons/dollar-sign';

class LeagueForm extends Component {
    state = {
        league: null,
    };

    constructor(props) {
        super(props);
        this.state.league = this.props.league;
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onSubmit = async (event) => {
        event.preventDefault()

        // TODO - Fill in from form values
        let league = {
            name: 'Try this',
            teamCount: 16,
            rosterSize: 22,
            budget: 300,
        }

        if (this.state.league) {
            var response = await fetch(`https://pure-bastion-69696.herokuapp.com/api/leagues/${league._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(league)
            })
        } else {
            var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/v2/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(league)
            })
        }

        if (response.status !== 200) throw Error("Error submitting league");

        var leagues = await response.json();

        // TODO - Clear the form
        event.target.reset()

        // TODO - Push the response up to the parent
    }

    // TODO - Delete the leaue
    // Should be used for edit dialog
    onDelete = (event) => {

    }

    // TODO - Cancel the league update
    // Should be used for edit dialog
    onCancel = (event) => {
        
    }

    render() {
        var submitBtn = null;
        var clearBtn = null;
        var deleteBtn = null;

        if (this.state.league) {
            submitBtn = <Button variant="primary" type="submit">Save</Button>
            clearBtn = <Button variant="secondary" type="button">Cancel</Button>
            deleteBtn = <Button variant="error" type="button">Delete</Button>
        } else {
            submitBtn = <Button variant="primary" type="submit">Create</Button>
            clearBtn = <Button variant="secondary" type="reset">Clear</Button>
        }

        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="League Name" value={this.state.league ? this.state.league.name : null}/>
                    </Form.Group>

                    <Form.Group controlId="teamCount">
                        <Form.Label>Teams</Form.Label>
                        <FormControl type="number" placeholder="League Size" value={this.state.league ? this.state.league.teamCount : null}/>
                    </Form.Group>

                    <Form.Group controlId="budget">
                        <Form.Label>Budget</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><DollarSign/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" placeholder="Draft Budget" value={this.state.league ? this.state.league.budget : null}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="rosterSize">
                        <Form.Label>Draft Picks</Form.Label>
                        <FormControl type="number" placeholder="Draft Picks" value={this.state.league ? this.state.league.rosterSize : null}/>
                        <Form.Text className="text-muted">
                            How many players must be rostered at the end of a draft?
                            Extra slots like Minors and NA that do not count as a draft 
                            pick should not be included.
                        </Form.Text>
                    </Form.Group>
                    
                    {submitBtn}
                    {clearBtn}
                    {deleteBtn}
                </Form>
            </Container>
        );
    }
}
 
export default LeagueForm;