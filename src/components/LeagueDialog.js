import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import LeagueForm from './LeagueForm';

class LeagueDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }  

  handleClose = () => {
    this.props.onClose();
  }

  handleDelete = () => {
    this.props.onClose();
  }

  handleSave = () => {
    this.props.onClose();
  }

  render() {
    let league = this.props.league

    var modal = null;

    if (league) {
        modal = 
        <Modal centered show={this.props.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{league.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeagueForm league={league} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>Save</Button>
          <Button variant="error" onClick={this.handleDraftDrop}>Delete</Button>
          <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    }

    return (
        {modal}
    );
    
  }
}

export default LeagueDialog;