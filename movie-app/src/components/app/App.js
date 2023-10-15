import React, { useState, useEffect, useContext } from 'react';
import { Spin, Tabs } from 'antd';
import MovieList from '../movie-list/MovieList';
import MovieFetcher from '../movie-fetcher/MovieFetcher';
import GenreProvider from '../genre-provider/GenreProvider';
import SearchPanel from '../search-panel/SearchPanel';
import Paginator from '../paginator/Paginator';
import { RatingContext } from '../rating-context/RatingContext';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const { ratedMovies } = useContext(RatingContext);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    const setDynamicPageSize = () => {
      const width = window.innerWidth;

      if (width <= 1440) {
        setPageSize(10);
      } else {
        setPageSize(15);
      }
    };

    setDynamicPageSize();

    window.addEventListener('resize', setDynamicPageSize);

    return () => {
      window.removeEventListener('resize', setDynamicPageSize);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const searchTab = {
    label: 'Search',
    key: '1',
    children: (
      <div>
        <SearchPanel setSearchText={setSearchText} searchText={searchText} />
        <MovieFetcher
          searchText={searchText}
          currentPage={currentPage}
          pageSize={pageSize}
        >
          {({ movies, error }) => {
            if (error) {
              return <div>Error: {error}</div>;
            }
            if (!movies.length) {
              return (
                <div className="app__spinner">
                  <Spin size="large" />
                </div>
              );
            }
            return <MovieList movies={movies} searchText={searchText} />;
          }}
        </MovieFetcher>
        <Paginator
          currentPage={currentPage}
          pageSize={pageSize}
          onChangePage={handleChangePage}
        />
      </div>
    ),
  };
  const ratedTab = {
    label: 'Rated',
    key: '2',
    children: ratedMovies.length ? (
      <MovieList movies={ratedMovies.filter((movie) => movie.rating > 0)} />
    ) : (
      <div className="app__rated-empty">
        You did not rate any movies. Please rate some movies.
      </div>
    ),
  };
  const tabItems = [searchTab, ratedTab];

  return (
    <GenreProvider>
      <div>
        <Tabs items={tabItems} defaultActiveKey="1" centered />
      </div>
    </GenreProvider>
  );
}

export default App;
