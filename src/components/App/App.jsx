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
    isLoading: false,
  };

  setImageToState = async items => {
    try {
      this.setState({ isLoading: true });
      const images = await getImages(items);
      this.setState({
        images: images.hits,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  getModalimageUrl = (imageUrl, alt) => {
    this.setState({
      url: {
        imageUrl,
        alt,
      },
    });
  };

  closeModal = () => {
    this.setState({ url: null });
  };

  render() {
    const { images, url, isLoading } = this.state;
    return (
      <GalleryApp>
        <Searchbar onSubmit={this.setImageToState} />
        {isLoading && <p>Загрузка...</p>}
        <ImageGallery images={images} getUrl={this.getModalimageUrl} />
        {url && <ModalWindow url={url} closeModal={this.closeModal} />}
        <GlobalStyle />
      </GalleryApp>
    );
  }
}
