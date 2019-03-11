import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import DollarSign from 'react-feather/dist/icons/dollar-sign';

class PlayerForm extends React.Component {
  state = {
    team: '',
    salary: '',
    rostered: true,
  }

  constructor(props) {
    super(props);

    // No-op
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    // Api
    this.handleDraftDrop = this.handleDraftDrop.bind(this);
    // Form
    this.onTeamSelect = this.onTeamSelect.bind(this);
    this.onSalaryChange = this.onSalaryChange.bind(this);
    this.onRosteredChange = this.onRosteredChange.bind(this);
  }

  componentDidMount() {
      console.log("Mounted")
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
    this.setState({team: teamId})
  }

  onSalaryChange = (event) => {
    let salary = event.target.value
    console.log(`Salaray Change: ${salary}`)
    this.setState({salary: salary})
  }

  onRosteredChange = (event) => {
    // let rostered = event.target.is
    console.log(`RosteredChange: ${event}`)
    // let player = this.state.player
    // player._team = teamId
    // this.setState({player: player})
  }

  handlePlayerClick = (player) => {}

  render() {
    if (this.props.player) {
      return (      
        <Form onSubmit={this.handleDraftDrop}>
        <Form.Row>
            <Col>
            <Form.Group controlId="team">
            <Form.Label>Team</Form.Label>
            <Form.Control as="select" defaultValue={this.props.player._team} value={this.state.team} onChange={this.onTeamSelect}>
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
                    <InputGroup.Text><DollarSign/></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type="number" defaultValue={this.props.player.salary} value={this.state.salary} onChange={this.onSalaryChange}/>
            </InputGroup>     
            </Form.Group>       
            </Col>
        </Form.Row>

        {/* <Form.Row>
            <Form.Group>
                <Form.Check
                    label="Counts against roster cap"
                    />
            </Form.Group>
        </Form.Row> */}

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