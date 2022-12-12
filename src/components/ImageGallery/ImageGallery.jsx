import {
  GalleryList,
  GalleryListItem,
  GalleryListImage,
} from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => {
  console.log(images);
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <GalleryListItem key={id}>
          <GalleryListImage src={webformatURL} alt={tags} onClick={openModal} />
        </GalleryListItem>
      ))}
    </GalleryList>
  );
};
