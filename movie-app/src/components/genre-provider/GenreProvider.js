/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import GenreContext from '../genre-context/GenreContext';
import './GenreProvider.css';

class GenreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      error: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const genreOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2NlMTc3YWNiOGJhMjIwNGVmYzcyZTY5MzJlZDY4ZCIsInN1YiI6IjY1MTk3YTc1OTNiZDY5MDExYjhlM2NjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RrZZupm3J2y47VO84oxLHzv1qD7ZnnY05be2mi7O0yw',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      genreOptions,
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({ genres: response.genres, isLoading: false });
      })
      .catch((err) => {
        const errorMessage = err.toString();
        this.setState({ error: errorMessage, isLoading: false });
      });
  }

  render() {
    const { children } = this.props;
    const { genres, error, isLoading } = this.state;

    if (error) {
      return <Alert message={error} type="error" />;
    }

    if (isLoading) {
      return (
        <div className="genreprovider__spinner">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <GenreContext.Provider value={{ genres, error }}>
        {children}
      </GenreContext.Provider>
    );
  }
}

GenreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GenreProvider;
