import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class EcpNavbar extends React.Component {
    render = () => (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/home">ECP</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/devices">Devices</Nav.Link>
          <Nav.Link href="/interactions">Interactions</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default EcpNavbar;