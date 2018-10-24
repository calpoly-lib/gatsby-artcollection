import React, {Component} from 'react';
import {
   Collapse,
   UncontrolledCollapse,
   Navbar,
   NavbarToggler,
   Nav,
   NavItem,
   Button
} from 'reactstrap';
import Collections from './collections.js';
import Artists from './artists.js';
import Types from './types.js';
import Media from './media.js';

export default class BrowseSide extends Component {
   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false,
         collectionOpen: false,
         artistOpen: false,
         typeOpen: false,
         mediumOpen: false
      };
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen,
         collectionOpen: this.state.collectionOpen,
         artistOpen: this.state.artistOpen,
         typeOpen: this.state.typeOpen,
         mediumOpen: this.state.mediumOpen
      });
   }

   toggleButton(name) {
      const key = name + "Open"
      this.setState({ [key]: ![key]})
      this.forceUpdate();
   }

   getClassName(name) {
      if (this.state[name + "Open"]) {
         return "toggle-arrow toggle-arrow-down";
      }
      else {
         return "toggle-arrow";
      }
   }

   render() {
      return (
         <div id="browse-side">
            <h4>Browse the Collection</h4>
            <p>Not sure what you are looking for? Browsing allows you to discover new content and gain a broader sense of what is contained in the collection.</p>
            
            <Navbar color="light" light expand="md">
               <NavbarToggler onClick={this.toggle} className="mr-2" />
               <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                     <NavItem>
                        <Button id="collections-toggler" onClick={() => this.toggleButton("collection")}>Collection <span className={this.getClassName("collection")}>›</span></Button>
                        <UncontrolledCollapse className="browse-collapse" toggler="collections-toggler">
                           <div className='browse-item-list'><Collections /></div>
                        </UncontrolledCollapse>
                     </NavItem>
                     <NavItem>
                        <Button id="artists-toggler" onClick={() => this.toggleButton("artist")}>Artist <span className={this.getClassName("artist")}>›</span></Button>
                        <UncontrolledCollapse className="browse-collapse" toggler="artists-toggler">
                           <div className='browse-item-list'><Artists /></div>
                        </UncontrolledCollapse>
                     </NavItem>
                     <NavItem>
                        <Button id="types-toggler" onClick={() => this.toggleButton("type")}>Type <span className={this.getClassName("type")}>›</span></Button>
                        <UncontrolledCollapse className="browse-collapse" toggler="types-toggler">
                           <div className='browse-item-list'><Types /></div>
                        </UncontrolledCollapse>
                     </NavItem>
                     <NavItem>
                        <Button id="media-toggler" onClick={() => this.toggleButton("medium")}>Medium <span className={this.getClassName("medium")}>›</span></Button>
                        <UncontrolledCollapse className="browse-collapse" toggler="media-toggler">
                           <div className='browse-item-list'><Media /></div>
                        </UncontrolledCollapse>
                     </NavItem>
                  </Nav>
               </Collapse>
            </Navbar>
            <img src={require('../..//static/assets/ArtCollectionHeader.png')} alt="ArtCollection Header" />
         </div>
      );
   }
}
