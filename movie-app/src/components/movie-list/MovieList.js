/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import MovieBlock from '../movie-block/MovieBlock';

class MovieList extends React.Component {
  render() {
    const { movies } = this.props;

    return (
      <div>
        {movies.map((movie) => {
          const {
            id,
            title,
            poster_path: poster,
            overview,
            release_date: releaseDate,
            vote_average: rating,
            genre_ids: genre,
            vote_count: votes,
          } = movie;

          const posterURL = `https://image.tmdb.org/t/p/original${poster}`;

          return (
            <MovieBlock
              key={id}
              title={title}
              poster={posterURL}
              overview={overview}
              releaseDate={releaseDate}
              rating={rating}
              genre={genre}
              votes={votes}
            />
          );
        })}
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
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
      vote_count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
