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
  }

  handleClose = () => {
    this.setState({ player: null })
    this.props.onClose();
  }

  handlePlayerClick = (player) => { }

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
            <PlayerForm player={this.props.player} teams={this.props.teams} onClose={this.handleClose} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null
    }

  }
}

export default PlayerDialog;