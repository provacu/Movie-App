/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

class MovieBlock extends React.Component {
  render() {
    const { title, poster, overview, releaseDate, rating, genre, votes } =
      this.props;

    return (
      <div>
        <h3>{title}</h3>
        <img src={poster} alt={title} />
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
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genre: PropTypes.arrayOf(PropTypes.number).isRequired,
  votes: PropTypes.number.isRequired,
};
