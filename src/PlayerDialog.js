import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import DollarSign from 'react-feather/dist/icons/dollar-sign';

class ResponsiveDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleDraftDrop = this.handleDraftDrop.bind(this);
    this.onTeamSelect = this.onTeamSelect.bind(this);
  }  

  handleClose = () => {
    this.props.onClose();
  }

  handleDraftDrop = () => {
    this.props.onClose();
  }

  onTeamSelect = (teamId) => {
    console.log(`Team Selected: ${teamId}`)
  }

  render() {
    let player = this.props.player
    if (this.props.player) {
      return (      
        <Modal centered show={this.props.open} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.player._player.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          <Form.Row>
            <Col>
              <Form.Label>Team</Form.Label>
              <Form.Control as="select">
                <option>None</option>
                {this.props.teams.map(team => (
                  <option value={team._id} selected={this.props.player._team ? team._id == this.props.player._team : false}>{team.name}</option>
                ))}              
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Salary</Form.Label>
              <InputGroup >
                <InputGroup.Prepend>
                    <InputGroup.Text><DollarSign/></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type="number" onChangeCapture={this.onSearch}/>
              </InputGroup>            
            </Col>
          </Form.Row>
        </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleDraftDrop}>
              {this.props.player._team ? "Drop" : "Draft"}
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

export default ResponsiveDialog;