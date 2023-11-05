import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ChevronDown, Person, House } from 'react-bootstrap-icons';
import logo from "../images/canvasImage.png"
import "./HomeNav.css"
import { Link } from 'react-router-dom';

const HomeNavBar = () => {
  return (
    <Navbar expand="lg" className="homeNavbar">
      <Container>
      <div class="mx-auto order-0 d-flex align-items-center">
        <Link to="/" className="menu-icon-link">
            <House className= "mx-4 mb-1 list-icon-home" />
        </Link>
      </div>
        <Navbar.Brand href="#home">
          <div className="mx-auto order-0 d-flex align-items-center">
            <img alt="" src={logo} width="38" height="38" className="d-inline-block align-top mb-1 mx-2"/>
            <h1 className="ms-0 h2 text-white fw-bold"> Canvas Copilot</h1>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>

          <div className="ms-1 d-flex align-items-center mb-1">
              <NavDropdown
                title={<div className="d-flex align-items-center"><Person className="text-white me-2" /><ChevronDown className="text-white" /></div>}
                id="profile-dropdown"
                className="custom-dropdown" // Add custom class
              >
                {/* Dropdown content */}
                <NavDropdown.Item href="/userprofile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/4.4">Sign Out</NavDropdown.Item>
              </NavDropdown>
            </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavBar;