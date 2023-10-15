import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const RatingContext = createContext();

export function RatingProvider({ children }) {
  const [movieRatings, setMovieRatings] = useState(
    () => JSON.parse(localStorage.getItem('movieRatings')) || {},
  );

  const [ratedMovies, setRatedMovies] = useState(
    () => JSON.parse(localStorage.getItem('ratedMovies')) || [],
  );

  const updateRating = (movieId, rating, movieData) => {
    // Update the rating in the state
    const newRatings = { ...movieRatings, [movieId]: rating };
    setMovieRatings(newRatings);

    // Update the rating in localStorage
    localStorage.setItem('movieRatings', JSON.stringify(newRatings));

    const existingMovieIndex = ratedMovies.findIndex(
      (movie) => movie.id === movieId,
    );

    let newRatedMovies = [...ratedMovies];

    if (rating > 0) {
      if (existingMovieIndex === -1) {
        newRatedMovies.push(movieData);
      }
    } else {
      newRatedMovies = newRatedMovies.filter((movie) => movie.id !== movieId);
    }

    setRatedMovies(newRatedMovies);
    localStorage.setItem('ratedMovies', JSON.stringify(newRatedMovies));
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'movieRatings') {
        setMovieRatings(JSON.parse(e.newValue));
      }
      if (e.key === 'ratedMovies') {
        setRatedMovies(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const providerValue = useMemo(
    () => ({ movieRatings, updateRating, ratedMovies }),
    [movieRatings, updateRating, ratedMovies],
  );

  return (
    <RatingContext.Provider value={providerValue}>
      {children}
    </RatingContext.Provider>
  );
}

RatingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
