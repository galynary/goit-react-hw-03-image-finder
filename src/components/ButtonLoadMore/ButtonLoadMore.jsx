import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ButtonLoadMore.styled';

export const ButtonLoadMore = ({ onLoadMore, page, totalPages }) => {
  return (
    <Button type="button" onClick={onLoadMore}>
      Load more
    </Button>
  );
};

ButtonLoadMore.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func,
};
