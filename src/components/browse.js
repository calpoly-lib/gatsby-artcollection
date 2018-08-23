import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'gatsby'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.toggle} href="#search" className={this.props.className}>Browse</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Browse</ModalHeader>
          <ModalBody>
            <ul>
              <li><Link onClick={this.toggle} to="/collections/">Collections</Link></li>
              <li><Link onClick={this.toggle} to="/artists/">Artists</Link></li>
              <li><Link onClick={this.toggle} to="/types/">Types</Link></li>
              <li><Link onClick={this.toggle} to="/media/">Media</Link></li>             
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Search;