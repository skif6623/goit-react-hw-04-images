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
    isOpen: false,
  };

  setImageToState = async items => {
    const images = await getImages(items);
    this.setState({
      images: images.hits,
    });
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  render() {
    const { images, isOpen } = this.state;
    return (
      <GalleryApp>
        {isOpen && <ModalWindow />}
        <Searchbar onSubmit={this.setImageToState} />
        <ImageGallery images={images} openModal={this.toggleModal} />
        <GlobalStyle />
      </GalleryApp>
    );
  }
}
