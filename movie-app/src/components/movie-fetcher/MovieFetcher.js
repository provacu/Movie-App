import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import NetworkState from '../network-state/NetworkState';
import './MovieFetcher.css';

class MovieFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      error: null,
      isLoading: true,
      network: true,
    };
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps) {
    const { currentPage, pageSize, searchText } = this.props;
    if (
      prevProps.currentPage !== currentPage ||
      prevProps.pageSize !== pageSize ||
      prevProps.searchText !== searchText
    ) {
      this.fetchMovies();
    }
  }

  onNetworkState = (isOnline) => {
    this.setState({ network: isOnline });
  };

  fetchMovies() {
    const { currentPage, pageSize, searchText } = this.props;
    const savedGuestSessionId = localStorage.getItem('guestSessionId');
    const expiresAt = localStorage.getItem('expiresAt');
    const currentTime = new Date().toISOString();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2NlMTc3YWNiOGJhMjIwNGVmYzcyZTY5MzJlZDY4ZCIsInN1YiI6IjY1MTk3YTc1OTNiZDY5MDExYjhlM2NjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RrZZupm3J2y47VO84oxLHzv1qD7ZnnY05be2mi7O0yw`,
      },
    };

    const fetchPromises = [];

    if (searchText) {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}`;
      fetchPromises.push(fetch(searchUrl, options).then((res) => res.json()));
    } else {
      fetchPromises.push(
        fetch(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${currentPage}&pageSize=${pageSize}`,
          options,
        ).then((res) => res.json()),
      );

      fetchPromises.push(
        fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}&pageSize=${pageSize}`,
          options,
        ).then((res) => res.json()),
      );

      fetchPromises.push(
        fetch(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}&pageSize=${pageSize}`,
          options,
        ).then((res) => res.json()),
      );

      if (expiresAt && expiresAt < currentTime) {
        localStorage.removeItem('guestSessionId');
        localStorage.removeItem('expiresAt');
      }

      if (!savedGuestSessionId) {
        fetchPromises.push(
          fetch(
            'https://api.themoviedb.org/3/authentication/guest_session/new',
            options,
          ).then((res) => res.json()),
        );
      }
    }

    Promise.all(fetchPromises)
      .then((responses) => {
        const trendingMovies = responses[0]?.results || [];
        const popularMovies = responses[1]?.results || [];
        const topRatedMovies = responses[2]?.results || [];
        const sessionResponse = responses.length === 4 ? responses[3] : null;

        const movieMap = {};
        const allMovies = [
          ...trendingMovies,
          ...popularMovies,
          ...topRatedMovies,
        ];

        allMovies.forEach((movie) => {
          if (!movieMap[movie.id]) {
            movieMap[movie.id] = movie;
          }
        });

        const uniqueMovies = Object.values(movieMap);

        const filteredMovies = uniqueMovies.filter(
          (movie) =>
            movie.title &&
            movie.poster_path &&
            movie.overview &&
            movie.release_date &&
            movie.vote_average &&
            movie.genre_ids,
        );

        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;
        const paginatedMovies = filteredMovies.slice(start, end);

        this.setState({ movies: paginatedMovies });

        if (sessionResponse && sessionResponse.success) {
          localStorage.setItem(
            'guestSessionId',
            sessionResponse.guest_session_id,
          );
          localStorage.setItem('expiresAt', sessionResponse.expires_at);
          this.setState({ network: sessionResponse.success });
        } else if (savedGuestSessionId) {
          this.setState({ network: true });
        }

        this.setState({ isLoading: false });
      })
      .catch((err) => {
        const errorMessage = err.toString();
        this.setState({ error: errorMessage, isLoading: false });
      });
  }

  render() {
    const { movies, error, isLoading, network } = this.state;
    const { children } = this.props;

    if (!network) {
      return (
        <Alert
          message="Something is wrong with your internet connection, please check and try again"
          type="error"
        />
      );
    }

    if (error) {
      return <Alert message={error} type="error" />;
    }

    return (
      <>
        <NetworkState onNetworkState={this.onNetworkState} />
        {isLoading ? (
          <div className="moviefetcher__spinner">
            <Spin size="large" />
          </div>
        ) : (
          children({ movies, error })
        )}
      </>
    );
  }
}

export default MovieFetcher;

MovieFetcher.propTypes = {
  children: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  searchText: PropTypes.string,
};

MovieFetcher.defaultProps = {
  currentPage: 1,
  pageSize: 15,
  searchText: '',
};
