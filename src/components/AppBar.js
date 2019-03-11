import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

function AppBar(props) {
  const { classes } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to={'/'}>      
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to={'/leagues'}>      
          <Nav.Link>Leagues</Nav.Link>
        </LinkContainer>
        {/* <LinkContainer to={'/draft'}>      
          <Nav.Link >Draft</Nav.Link>
        </LinkContainer> */}
      </Nav>
    </Navbar>
  );
}

export default AppBar;