import React, { Component } from 'react';
import Slider from 'react-slick'
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch'

const settings = {
  dots: true,
};

const carousel = (images) => {
  if(images.length > 0) {
    return ( 
      <Slider {...settings}>
        {images.map(image => <div><img alt="snake" className="App-slider-image" src={image} /></div>)}
      </Slider>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    return fetch('/api').then(response => response.json().then(json => {
      const images = json.items.map(item => ( item.link ));
      this.setState({ images });
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pythons are the best!</h2>
        </div>
        <div className="App-slider">
          {carousel(this.state.images)}
        </div>
      </div>
    );
  }
}

export default App;
