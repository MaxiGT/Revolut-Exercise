import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import _ from 'lodash';
import './custom_carousel.css';

class CustomCarousel extends Component {

	constructor(props) {
    super(props);
    this.state = { activeIndex: _.findIndex(this.props.wallets, {id: this.props.currency}) };
  }

  componentDidMount() {
    // document.addEventListener("keydown", this.handleKeyDown);
  }

  onExiting = (evt) => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
    this.props.onAdvance(this.props.wallets[this.state.activeIndex].id);
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.wallets.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.wallets.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { wallets, children, key } = this.props;

    const slides = wallets.map((w) => {
      return (
        <CarouselItem
          onExiting={(evt) => this.onExiting(evt)}
          onExited={this.onExited}
        >
          {children}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval={false}
        key={key}
        id={key}
        keyboard={false}
      >
        <CarouselIndicators
          items={wallets}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
	}	
}

CustomCarousel.propTypes = {
  wallets: PropTypes.array,
  onAdvance: PropTypes.func,
  currency: PropTypes.string,
}

export default CustomCarousel;