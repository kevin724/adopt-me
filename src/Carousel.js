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
      <div className="flex content-around items-center">
        <img
          data-testid="hero"
          className="w-2/5"
          src={images[active]}
          alt="animal"
        ></img>
        <div>
          {images.map((photo, index) => (
            // should be a button instead of img for accessibility
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-index={index}
              onClick={this.handleIndexClick}
              data-testid={`thumbnail${index}`}
              className={
                (index === active ? "active opacity-60 border-gray-400" : "") +
                " rounded-full inline-block w-32 border-2 border-black m-5"
              }
              alt="animal thumbnail"
            ></img>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
