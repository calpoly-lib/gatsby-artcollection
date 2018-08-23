import React from 'react'
import { Link } from 'gatsby'
import { Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, FormGroup, Input,
  ListGroup, ListGroupItem } from 'reactstrap'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
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
        <a onClick={this.toggle} href="#search" className={this.props.className}>Search</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Search</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input type="text" name="text" id="searchText" 
                value={this.state.query} onChange={this.search} placeholder={'Search'}/>
            </FormGroup>
            <ListGroup>
              {this.state.results.map((page) => (
              <ListGroupItem key={page.url}>
                <Link className='search__list_white search__list_non-decoration'
                  to={page.url}
                  onClick={this.toggle}>
                  {page.title}
                </Link>
              </ListGroupItem>
              ))}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
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

export default Search;