import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>Loading ...</h2>;
    }
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="rounded-lg w-2/3 mx-auto mb-5 text-center p-24 bg-red-100">
        <Carousel images={images}></Carousel>
        <div>
          <h1 className="mt-5 text-5xl font-bold">{name}</h1>
          <h2 className="font-semibold text-2xl mt-5">
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                className="button"
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p className="mt-5 leading-6 text-left">{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1 className="font-bold text-4xl">
                  Would you like to adopt {name}?
                </h1>
                <div className="w-full inline-block">
                  <button className="mr-4" onClick={this.adopt}>
                    Yes
                  </button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter></DetailsWithRouter>
    </ErrorBoundary>
  );
}
