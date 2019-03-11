import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DollarSign from 'react-feather/dist/icons/dollar-sign';

class LeagueForm extends Component {
    state = {
        name: '',
        teams: '',
        budget: '',
        rosterSize: '',
    };

    constructor(props) {
        super(props);

        // Buttons
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        // Form
        this.onNameChange = this.onNameChange.bind(this);
        this.onTeamsChange = this.onTeamsChange.bind(this);
        this.onBudgetChange = this.onBudgetChange.bind(this);
        this.onRosterSizeChange = this.onRosterSizeChange.bind(this);
    }

    onSubmit = async (event) => {
        event.preventDefault()

        let league = {
            name: this.state.name,
            teamCount: this.state.teams,
            rosterSize: this.state.rosterSize,
            budget: this.state.budget,
        }

        // if (this.state.league) {
        //     var response = await fetch(`https://pure-bastion-69696.herokuapp.com/api/leagues/${league._id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(league)
        //     })
        // } else {
        var response = await fetch('https://pure-bastion-69696.herokuapp.com/api/leagues/v2/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(league)
        })
        // }

        if (response.status !== 200) {
            alert("Error submitting league")
            return
        }

        var leagues = await response.json();
        console.log(`Leagues: ${leagues}`)
        this.onCancel()
        // TODO - Do better than a reload
        window.location.reload()
    }

    // TODO - Delete the leaue
    // Should be used for edit dialog
    onDelete = (event) => {

    }

    // TODO - Cancel the league update
    // Should be used for edit dialog
    onCancel = (event) => {
        this.setState({
            name: null,
            teams: null,
            budget: null,
            rosterSize: null,
        })
    }

    onNameChange = (event) => {
        let name = event.target.value
        this.setState({ name: name })
    }

    onTeamsChange = (event) => {
        let teams = event.target.value
        this.setState({ teams: teams })
    }

    onBudgetChange = (event) => {
        let budget = event.target.value
        this.setState({ budget: budget })
    }

    onRosterSizeChange = (event) => {
        let rosterSize = event.target.value
        this.setState({ rosterSize: rosterSize })
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
            let submitDisabled = this.state.name === ''
                || this.state.rosterSize === ''
                || this.state.budget === ''
                || this.state.teams === ''

            submitBtn = <Button variant="primary" type="submit" disabled={submitDisabled}>Create</Button>
            clearBtn = <Button variant="secondary" type="reset">Clear</Button>
        }

        return (
            <Container>
                <Form onSubmit={this.onSubmit} onReset={this.onCancel}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="League Name"
                            value={this.state.name}
                            onChange={this.onNameChange} />
                    </Form.Group>

                    <Form.Group controlId="teamCount">
                        <Form.Label>Teams</Form.Label>
                        <FormControl
                            type="number"
                            placeholder="League Size"
                            value={this.state.teams}
                            onChange={this.onTeamsChange} />
                    </Form.Group>

                    <Form.Group controlId="budget">
                        <Form.Label>Budget</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><DollarSign /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                placeholder="Draft Budget"
                                value={this.state.budget}
                                onChange={this.onBudgetChange} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="rosterSize">
                        <Form.Label>Draft Picks</Form.Label>
                        <FormControl
                            type="number"
                            placeholder="Draft Picks"
                            value={this.state.rosterSize}
                            onChange={this.onRosterSizeChange} />
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