import React from 'react';
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';


export default () => (
  <div>
    <Navbar color="dark" dark expand="md">
      <Nav className="text-center small" navbar>
        <NavItem>
          <a className="nav-link" href="http://lib.calpoly.edu" target="_blank" rel="noopener noreferrer">Robert E. Kennedy Library</a>
        </NavItem>
        <NavItem>
        <a className="nav-link" href="http://www.calpoly.edu" target="_blank" rel="noopener noreferrer">California Polytechnic State University</a>
        </NavItem>
        <NavItem>
          <span className="navbar-text">1 Grand Ave, San Luis Obispo, CA 93407</span>
        </NavItem>
        <NavItem>
          <a className="nav-link" href="mailto:lib-artcollection@calpoly.edu">lib-artcollection@calpoly.edu</a>
        </NavItem>
        <NavItem>
          <span className="navbar-text">(805) 756-6395</span>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
)
