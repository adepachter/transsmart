import React from 'react';
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/container';
import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">INKOsmart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              <Nav.Link><Link to="/shipments">Shipments</Link></Nav.Link>
              <NavDropdown title="Acties" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to="/delete">Delete shipment</Link></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;
  