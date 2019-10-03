import React, { Component } from 'react';
import { Link } from "gatsby"
import Img from "gatsby-image"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0
    };
    this.items = props.images   
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  renderLink(item) {
    if (/^\/static/.test(item.url)) {
      return (
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <Img
            alt={item.altText} 
            fluid={item.fluid}
          />
        </a>
      )
    } else {
      return (
        <Link to={item.url}>
          <Img
            alt={item.altText} 
            fluid={item.fluid}
          />
        </Link>
      )
    }
  }

  render() {
    const { activeIndex } = this.state;
    const slides = this.items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
        >
          {this.renderLink(item)}
          <CarouselCaption captionText={item.captionText} captionHeader={item.captionHeader} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={this.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Gallery;