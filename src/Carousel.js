import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // arrow functions defines "this" from where it is created
  handleIndexClick = (event) => {
    this.setState({ active: +event.target.dataset.index });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal"></img>
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // should be a button instead of img for accessibility
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-index={index}
              onClick={this.handleIndexClick}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            ></img>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
