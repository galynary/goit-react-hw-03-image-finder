import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <Gallery>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          item={item}
          onClick={() => onClick(item.largeImageURL)}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
