/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

class MovieBlock extends React.Component {
  render() {
    const { title, imgURL, description, date, rating, genre, starRating } =
      this.props;

    return (
      <div>
        <h3>{title}</h3>
        <img src={imgURL} alt={title} />
        <p>{description}</p>
        <p>{date}</p>
        <p>{rating}</p>
        <p>{genre}</p>
        <p>{starRating}</p>
      </div>
    );
  }
}

export default MovieBlock;

MovieBlock.propTypes = {
  title: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  starRating: PropTypes.string.isRequired,
};
