/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import MovieBlock from '../movie-block/MovieBlock';

class MovieList extends React.Component {
  render() {
    const { movies } = this.props;
    return (
      <div>
        {movies.map((movie) => (
          <MovieBlock
            key={movie.id}
            title={movie.title}
            imgURL={movie.imgURL}
            description={movie.description}
            date={movie.date}
            rating={movie.rating}
            genre={movie.genre}
            starRating={movie.starRating}
          />
        ))}
      </div>
    );
  }
}

export default MovieList;

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      imgURL: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      genre: PropTypes.string.isRequired,
      starRating: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
