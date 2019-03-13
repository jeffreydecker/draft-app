import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Edit from 'react-feather/dist/icons/edit';
import Save from 'react-feather/dist/icons/save';
import { PlayerTable, DisplayTypeEnum, columns, positions } from './PlayerTable'

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

  onEditOrSaveClick = (event) => {
    // TODO - Logic to save team name
    this.setState({
      editingTeam: !this.state.editingTeam,
      formName: this.props.team.name
    })
  }

  onNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ formName: event.target.value })
  }

  render() {
    let team = this.props.team
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

    hitters.sort(function (a, b) { return a._player.rank - b._player.rank })
    pitchers.sort(function (a, b) { return a._player.rank - b._player.rank })

    let hittingTable = <PlayerTable cols={columns.hitting} players={hitters} displayType={DisplayTypeEnum.Hitting} handlePlayerClick={this.handlePlayerClick} />

    let pitchingTable = <PlayerTable cols={columns.pitching} players={pitchers} displayType={DisplayTypeEnum.Pitching} handlePlayerClick={this.handlePlayerClick} />

    var title = <Modal.Title>{team.name}</Modal.Title>
    var editButton = <Button><Edit title="Edit Name" onClick={this.onEditOrSaveClick} /></Button>

    if (this.state.editingTeam) {
      title = <FormControl
        value={this.state.formName}
        onChange={this.onNameChange} />
      var editButton = <Button><Save onClick={this.onEditOrSaveClick} /></Button>
    }

    return (
      <Modal centered show={this.props.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          {title}
          {editButton}
        </Modal.Header>
        <Modal.Body>
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