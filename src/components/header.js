import React from 'react';
import { Link } from 'gatsby'
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';

import Browse from './browse'
import Search from './search'

export default () => (
  <div>
    <Navbar color="light" light expand="md">
      <a href="http://www.calpoly.edu">
        <img src="http://artcollection.calpoly.edu/assets/calpoly-6800f79f94a0ec949716357add65415fcc1033bba77ef3013b4671cbcc9de22e.jpg" alt="Cal Poly logo" />
      </a>
      <Link to="/" className="navbar-brand">University Art Collection</Link>
        <Nav className="ml-auto" navbar>
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
            <Browse className="nav-link" />
          </NavItem>
          <NavItem>
            <Search className="nav-link" />
          </NavItem>
        </Nav>
    </Navbar>
  </div>
)
