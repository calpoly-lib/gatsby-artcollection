import React from 'react';
import {
  Navbar,
  Nav,
  NavItem } from 'reactstrap';


export default () => (
  <div className="footer">
    <Navbar color="dark" dark expand="md">
      <Nav className="text-center small" navbar>
        <NavItem>
          <a className="nav-link" href="http://lib.calpoly.edu" target="_blank" rel="noopener noreferrer">Robert E. Kennedy Library</a>
        </NavItem>
        <NavItem>
        <a className="nav-link" href="http://www.calpoly.edu" target="_blank" rel="noopener noreferrer">California Polytechnic State University</a>
        </NavItem>
        <NavItem>
          <a className='nav-link' href='https://www.google.com/maps/search/?api=1&query=1+Grand+Ave+San+Luis+Obispo+CA+93407' target='_blank'>1 Grand Ave, San Luis Obispo, CA 93407</a>
        </NavItem>
        <NavItem>
          <a className="nav-link" href="mailto:lib-artcollection@calpoly.edu">lib-artcollection@calpoly.edu</a>
        </NavItem>
        <NavItem>
          <a className='nav-link' href='tel:1-805-756-6395'>(805) 756-6395</a>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
)
