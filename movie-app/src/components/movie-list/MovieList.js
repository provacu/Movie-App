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
            imgURL={movie.poster_path}
            overview={movie.overview}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
            genre={movie.genre_ids}
            votes={movie.vote_count}
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
      overview: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      genre: PropTypes.arrayOf(PropTypes.number).isRequired,
      votes: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
