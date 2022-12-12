import {
  GalleryList,
  GalleryListItem,
  GalleryListImage,
} from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <GalleryListItem key={id}>
          <GalleryListImage src={webformatURL} alt={tags} />
        </GalleryListItem>
      ))}
    </GalleryList>
  );
};
