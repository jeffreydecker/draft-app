import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Edit from 'react-feather/dist/icons/edit';
import Save from 'react-feather/dist/icons/save';
import { PlayerTable, DisplayTypeEnum, columns, positions } from './PlayerTable'
import PositionsTable from './PositionsTable';

class TeamDialog extends React.Component {
  state = {
    editingTeam: false,
    team: null,
    formName: null,
  }
  constructor(props) {
    super(props);

    // No-op
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    // Dialog
    this.handleClose = this.handleClose.bind(this);
    // Edit
    this.onNameChange = this.onNameChange.bind(this);
    this.onEditOrSaveClick = this.onEditOrSaveClick.bind(this);
  }

  handleClose = () => {
    this.props.onClose();
  }

  handlePlayerClick = (player) => { }

  onEditOrSaveClick = async (event) => {
    // TODO - Logic to save team name

    if (this.state.editingTeam) {
      var body = {
        team: {
          name: this.state.formName
        }
      }

      let res = await fetch(`https://pure-bastion-69696.herokuapp.com/api/teams/${this.state.team._id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      console.log(res)

      let team = await res.json()

      this.setState({
        editingTeam: !this.state.editingTeam,
        formName: null,
        team: team
      })
    } else {
      this.setState({
        editingTeam: !this.state.editingTeam,
        formName: this.state.team.name
      })
    }
  }

  onNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ formName: event.target.value })
  }

  componentDidMount() {
    if (this.props.team) {
        this.setState({
            team: this.props.team
        })
    }
  }

  render() {
    let team = this.state.team
    let players = this.props.players

    if (!team) {
      return null
    }

    var hitters = []
    var pitchers = []

    team.players.forEach(playerId => {
      let player = players.find(p => {
        return p._id === playerId
      })

      positions.hitting.some(position => {
        if (player._player.pos.includes(position)) {
          hitters.push(player)
          return true
        }
        return false
      })

      positions.pitching.some(position => {
        if (player._player.pos.includes(position)) {
          pitchers.push(player)
          return true
        }
        return false
      })
    })

    var teamPlayers = hitters.concat(pitchers)
    hitters.sort(function (a, b) { return a._player.rank - b._player.rank })
    pitchers.sort(function (a, b) { return a._player.rank - b._player.rank })

    let hittingTable = <PlayerTable cols={columns.hitting} players={hitters} displayType={DisplayTypeEnum.Hitting} handlePlayerClick={this.handlePlayerClick} />

    let pitchingTable = <PlayerTable cols={columns.pitching} players={pitchers} displayType={DisplayTypeEnum.Pitching} handlePlayerClick={this.handlePlayerClick} />

    var title = <Modal.Title>{team.name}</Modal.Title>
    var editButton = <Button className="bg-transparent border-0 text-primary"><Edit title="Edit Name" onClick={this.onEditOrSaveClick} /></Button>

    if (this.state.editingTeam) {
      title = <FormControl
        value={this.state.formName}
        onChange={this.onNameChange} />
      var editButton = <Button className="bg-transparent border-0 text-primary"><Save onClick={this.onEditOrSaveClick} /></Button>
    }

    return (
      <Modal centered show={this.props.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          {title}
          {editButton}
        </Modal.Header>
        <Modal.Body>
          <h5>Positions</h5>
          <PositionsTable players={teamPlayers} />
          <h5>Hitters</h5>
          {hittingTable}
          <h5>Pitchers</h5>
          {pitchingTable}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TeamDialog;