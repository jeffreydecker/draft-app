import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function AppBar(props) {
  const { classes } = props;
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Leagues</Nav.Link>
      <Nav.Link href="#features">Players</Nav.Link>
    </Nav>
  </Navbar>
  );
}

export default AppBar;