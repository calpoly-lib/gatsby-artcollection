import React, { Component } from 'react'
import { Link } from 'gatsby'
import Modal from "react-modal"

class Search extends Component {
  constructor () {
    super();
    this.state = {
      query: '',
      results: [],
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
        <a onClick={this.handleOpenModal} href="#search">Search</a>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Search"
        >
          <input className='modal__input'
            type='text' 
            value={this.state.query} 
            onChange={this.search} 
            placeholder={'Search'}
          />
          <button onClick={this.handleCloseModal}>Close</button>
          <ul className='search__list'>
            {this.state.results.map((page) => (
            <li key={page.url}>
              <Link className='search__list_white search__list_non-decoration'
                to={page.url}
                onClick={this.handleCloseModal}>
                {page.title}
              </Link>
            </li>
            ))}
          </ul>
        </Modal>
      </>
    )
  }

  getSearchResults(query) {
    if (!query || !window.__LUNR__) return []
    const results = window.__LUNR__['en'].index.search(query)
    return results.map(({ ref }) => window.__LUNR__['en'].store[ref])
  }

  search = event => {
    const query = event.target.value
    const results = this.getSearchResults(query)
    this.setState({ results, query })
  }
}

export default Search