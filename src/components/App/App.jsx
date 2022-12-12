import React, { Component } from 'react';
import { getImages } from '../../servise/api';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GalleryApp } from './App.styled';
import { GlobalStyle } from '../../GlobalStyles';

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
      <GalleryApp>
        <Searchbar onSubmit={this.setImageToState} />
        <ImageGallery images={images} />
        <GlobalStyle />
      </GalleryApp>
    );
  }
}
