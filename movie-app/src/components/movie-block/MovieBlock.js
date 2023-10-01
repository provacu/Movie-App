/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

class MovieBlock extends React.Component {
  render() {
    const { title, imgURL, overview, releaseDate, rating, genre, votes } =
      this.props;

    return (
      <div>
        <h3>{title}</h3>
        <img src={imgURL} alt={title} />
        <p>{overview}</p>
        <p>{releaseDate}</p>
        <p>{rating}</p>
        <p>{genre}</p>
        <p>{votes}</p>
      </div>
    );
  }
}

export default MovieBlock;

MovieBlock.propTypes = {
  title: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  votes: PropTypes.string.isRequired,
};
