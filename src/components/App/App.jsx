import React, { Component } from 'react';
import { getImages } from '../../servise/api';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
  };

  setImageToState = async items => {
    const images = await getImages(items);
    this.setState({
      images: images.hits,
    });
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.setImageToState} />
        <ImageGallery images={images} />
      </div>
    );
  }
}
