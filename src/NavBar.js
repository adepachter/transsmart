import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

function NavBarNav() {
  const { user, isAuthenticated } = useAuth0();
    return (
      
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">INKOsmart</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated && (
            <Nav className="me-auto">
            <NavDropdown title="Acties" id="basic-nav-dropdown">
                <NavDropdown.Item href="/addnew">Add shipment</NavDropdown.Item>
                <NavDropdown.Item href="/delete">Delete shipment</NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link href="/inkoprint">INKOprint &#10233;</Nav.Link>
              
              <Nav.Link href="/incoming">Incoming &#10233;</Nav.Link>
              
              <Nav.Link href="/shipments">Transsmart</Nav.Link>
              
            </Nav>
          )}
          <LoginButton />
              <LogoutButton />
              <Profile />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    );
  }
  
  export default NavBarNav;
  