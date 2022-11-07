import React from 'react';
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';


export default () => (
  <div className="footer">
    <Navbar color="dark" dark expand="md">
      <Nav className="small flex-column" navbar>
        <NavItem>
          <a className="nav-link py-1" href="http://lib.calpoly.edu" target="_blank" rel="noopener noreferrer">Robert E. Kennedy Library</a>
        </NavItem>
        <NavItem>
          <a className="nav-link py-1" href="http://www.calpoly.edu" target="_blank" rel="noopener noreferrer">California Polytechnic State University</a>
        </NavItem>
        <NavItem>
          <a className="nav-link py-1" href='https://www.google.com/maps/search/?api=1&query=1+Grand+Ave+San+Luis+Obispo+CA+93407' target='_blank'>1 Grand Ave, San Luis Obispo, CA 93407</a>
        </NavItem>
        <NavItem>
          <a className="nav-link py-1" href="mailto:lib-artcollection@calpoly.edu">lib-artcollection@calpoly.edu</a>
        </NavItem>
      </Nav>
      <Nav className="small flex-column flex-fill">
      </Nav>
      <Nav className="small flex-column align-self-start" navbar>
        <NavItem>
          <a className="nav-link py-1" href="https://diversity.calpoly.edu/" target="_blank" rel="noopener noreferrer">Diversity and Inclusivity</a>
        </NavItem>
        <NavItem>
          <a className="nav-link py-1" href="https://accessibility.calpoly.edu/website-accessibility-statement" target="_blank" rel="noopener noreferrer">Website Accessibility Statement</a>
        </NavItem>
        <NavItem>
          <a className="nav-link py-1" href="https://www.calpoly.edu/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice</a>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
)
