import React from 'react';
import PropTypes from 'prop-types';

class MovieFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      error: null,
    };
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2NlMTc3YWNiOGJhMjIwNGVmYzcyZTY5MzJlZDY4ZCIsInN1YiI6IjY1MTk3YTc1OTNiZDY5MDExYjhlM2NjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RrZZupm3J2y47VO84oxLHzv1qD7ZnnY05be2mi7O0yw',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/trending/all/day?language=en-US',
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        const filteredMovies = response.results.filter(
          (movie) =>
            movie.title &&
            movie.poster_path &&
            movie.overview &&
            movie.release_date &&
            movie.vote_average &&
            movie.genre_ids &&
            movie.vote_count,
        );

        this.setState({ movies: filteredMovies });
      })
      .catch((err) => this.setState({ error: err.toString() }));
  }

  render() {
    const { movies, error } = this.state;
    const { children } = this.props;
    return children({ movies, error });
  }
}

export default MovieFetcher;

MovieFetcher.propTypes = {
  children: PropTypes.func.isRequired,
};
