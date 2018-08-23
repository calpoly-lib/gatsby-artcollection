import React, { Component } from 'react'
import { Link } from 'gatsby'
import Modal from "react-modal"

class Browse extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false
      };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  render() {
    return (
      <>
        <a onClick={this.handleOpenModal} href="#browse">Browse</a>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Browse"
        >
          <button onClick={this.handleCloseModal}>Close</button>
          <ul>
            <li><Link onClick={this.handleCloseModal} to="/collections/">Collections</Link></li>
            <li><Link onClick={this.handleCloseModal} to="/artists/">Artists</Link></li>
            <li><Link onClick={this.handleCloseModal} to="/types/">Types</Link></li>
            <li><Link onClick={this.handleCloseModal} to="/media/">Media</Link></li>             
          </ul>
        </Modal>
      </>
    )
  }
}

export default Browse