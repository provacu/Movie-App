import React from 'react';
import MovieList from '../movie-list/MovieList';
import MovieFetcher from '../movie-fetcher/MovieFetcher';
import 'antd/dist/reset.css';

function App() {
  return (
    <div>
      <MovieFetcher>
        {({ movies, error }) => {
          if (error) {
            return <div>Error: {error}</div>;
          }

          if (!movies.length) {
            return <div>Loading...</div>;
          }

          return <MovieList movies={movies} />;
        }}
      </MovieFetcher>
    </div>
  );
}

export default App;
