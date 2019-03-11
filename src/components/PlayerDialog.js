import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import PlayerForm from './PlayerForm'
import { PlayerTable, DisplayTypeEnum, columns } from './PlayerTable'

class PlayerDialog extends React.Component {
  constructor(props) {
    super(props);

    // No-op
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    // Dialog
    this.handleClose = this.handleClose.bind(this);
    // Api
    this.handleDraftDrop = this.handleDraftDrop.bind(this);
  }

  handleClose = () => {
    this.setState({player: null})
    this.props.onClose();
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

  handlePlayerClick = (player) => {}

  render() {
    let player = this.props.player

    var hittingTable
    if (player && player._player.hittingProjections) { 
      hittingTable = <PlayerTable cols={columns.hitting} players={[player]} displayType={DisplayTypeEnum.Hitting} handlePlayerClick={this.handlePlayerClick} /> 
    }
          
    var pitchingTable
    if (player && player._player.pitchingProjections) { 
      pitchingTable = <PlayerTable cols={columns.pitching} players={[player]} displayType={DisplayTypeEnum.Pitching} handlePlayerClick={this.handlePlayerClick} /> 
    }

    if (this.props.player) {
      return (      
        <Modal centered show={this.props.open} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.player._player.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {hittingTable}
          {pitchingTable}
          <PlayerForm player={this.props.player} teams={this.props.teams} onClose={this.handleClose}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (      
        <div></div>
      );
    }
    
  }
}

export default PlayerDialog;