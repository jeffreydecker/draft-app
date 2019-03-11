import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import DollarSign from 'react-feather/dist/icons/dollar-sign';

class PlayerForm extends React.Component {
    state = {
        team: null,
        salary: null,
        rostered: null,
    }

    constructor(props) {
        super(props);

        // Api
        this.handleDraftDrop = this.handleDraftDrop.bind(this);
        // Form
        this.onTeamSelect = this.onTeamSelect.bind(this);
        this.onSalaryChange = this.onSalaryChange.bind(this);
        this.onRosteredChange = this.onRosteredChange.bind(this);
    }

    handleDraftDrop = (event) => {
        event.preventDefault()

        if (this.props.player._team) {
            // Drop the player
            let player = this.props.player
            this.dropPlayer(player)
        } else {
            let player = this.props.player
            let team = this.props.teams.find((team) => { return team._id == event.target.elements.team.value })
            let salary = event.target.elements.salary.value
            this.addPlayer(player, team, salary, true)
        }
    }

    addPlayer = async (player, team, salary, rostered) => {
        let body = {
            "teamId": team._id,
            "salary": salary,
            "rostered": rostered
        }

        var response = await fetch(`https://pure-bastion-69696.herokuapp.com/api/leagues/add/${player._id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        this.props.onClose();
    }

    dropPlayer = async (player) => {
        var response = await fetch(`https://pure-bastion-69696.herokuapp.com/api/leagues/drop/${player._id}`, {
            method: 'PATCH',
        })

        this.props.onClose();
    }

    onTeamSelect = (event) => {
        let teamId = event.target.value
        console.log(`Team Selected: ${teamId}`)
        this.setState({ team: teamId })
    }

    onSalaryChange = (event) => {
        let salary = event.target.value
        console.log(`Salaray Change: ${salary}`)
        this.setState({ salary: salary })
    }

    onRosteredChange = (event) => {
        let rostered = event.target.checked
        console.log(`RosteredChange: ${event}`)
        this.setState({ rostered: rostered })
    }

    render() {
        let salary = this.state.salary ? this.state.salary : this.props.player.salary
        let team = this.state.team ? this.state.team : this.props.player._team
        let rostered = this.state.rostered !== null ? this.state.rostered :
            (this.props.player.hasOwnProperty('isRostered') ? this.props.player.isRostered : true)

        let formEnabled = team == null

        if (this.props.player) {
            return (
                <Form onSubmit={this.handleDraftDrop}>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="team">
                                <Form.Label>Team</Form.Label>
                                <Form.Control
                                    as="select" value={team}
                                    disabled={!formEnabled}
                                    onChange={this.onTeamSelect}>
                                    <option>None</option>
                                    {this.props.teams.map(team => (
                                        <option value={team._id}>{team.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="salary">
                                <Form.Label>Salary</Form.Label>
                                <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><DollarSign /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="number"
                                        disabled={!formEnabled}
                                        value={salary}
                                        onChange={this.onSalaryChange} />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group>
                            <Form.Check
                                disabled={!formEnabled}
                                checked={rostered}
                                onChange={this.onRosteredChange}
                                label="Counts against roster cap"
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Button variant="primary" type="submit">
                            {this.props.player._team ? "Drop" : "Draft"}
                        </Button>
                    </Form.Row>
                </Form>
            );
        } else {
            return null
        }
    }
}

export default PlayerForm;