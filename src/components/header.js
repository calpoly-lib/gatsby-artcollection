import React, {Component} from 'react';
import { Link } from 'gatsby'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';

// import Browse from './browse'
import Search from './search'

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div id="title-navbar">
        <div id="title">
          <a className="cp-logo" href="https://www.calpoly.edu/">
            <img src="/assets/cp_artcollection.png" alt="Cal Poly logo" height="25" />
          </a>
          <Link to="/" className="navbar-brand">University Art Collection</Link>
        </div>

          <Navbar color="light" light expand="md">
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                  <Link to="/about/" className="nav-link">About</Link>
                </NavItem>
                <NavItem>
                  <Link to="/policies/" className="nav-link">Policies</Link>
                </NavItem>
                <NavItem>
                  <Link to="/class_visits/" className="nav-link">Class Visits</Link>
                </NavItem>
                <NavItem>
                  <Link to="/rfp/" className="nav-link">Request for Proposals</Link>
                </NavItem>
                <NavItem>
                  <Search className="nav-link" />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
      </div>
    );
  }
}
