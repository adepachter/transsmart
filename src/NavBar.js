import React from 'react';
import Navbar from 'react-bootstrap/navbar'
import Nav from 'react-bootstrap/nav'
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/container';


function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">INKOsmart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/incoming">Incoming</Nav.Link>
              <Nav.Link href="/shipments">Transsmart</Nav.Link>
              <NavDropdown title="Acties" id="basic-nav-dropdown">
                <NavDropdown.Item href="/delete">Delete shipment</NavDropdown.Item>
                <NavDropdown.Item href="/addnew">Add shipment</NavDropdown.Item>
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
  