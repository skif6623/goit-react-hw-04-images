export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ul className="gallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id}>
          <img src={webformatURL} alt={tags} />
        </li>
      ))}
    </ul>
  );
};
