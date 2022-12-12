import React, { Component } from 'react';
import { getImages } from '../../servise/api';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GalleryApp } from './App.styled';
import { GlobalStyle } from '../../GlobalStyles';
import { ModalWindow } from '../Modal/Modal';
export class App extends Component {
  state = {
    images: [],
    url: null,
  };

  setImageToState = async items => {
    const images = await getImages(items);
    this.setState({
      images: images.hits,
    });
  };

  closeModal = () => {
    this.setState({ url: null });
  };

  getModalimageUrl = (imageUrl, alt) => {
    this.setState({
      url: {
        imageUrl,
        alt,
      },
    });
  };

  render() {
    const { images, url } = this.state;
    return (
      <GalleryApp>
        <Searchbar onSubmit={this.setImageToState} />
        <ImageGallery images={images} getUrl={this.getModalimageUrl} />
        {url && <ModalWindow url={url} closeModal={this.closeModal} />}
        <GlobalStyle />
      </GalleryApp>
    );
  }
}
