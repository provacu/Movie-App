/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import MovieBlock from '../movie-block/MovieBlock';
import { RatingContext } from '../rating-context/RatingContext';

class MovieList extends React.Component {
  render() {
    const { movies, searchText, currentPage, pageSize } = this.props;

    const searchedMovies = searchText
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase()),
        )
      : movies;

    const moviesToShow = searchedMovies.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );

    return (
      <RatingContext.Consumer>
        {() => (
          <Row gutter={[32]} style={{ margin: '16px 0' }}>
            {moviesToShow.map((movie) => {
              const {
                id,
                title,
                overview,
                poster_path: posterPath = '',
                poster: posterAlt = '',
                release_date: releaseDateAlt = '',
                releaseDate = '',
                vote_average: ratingAlt = '',
                rating = '',
                genre_ids: genreIds = [],
                genre = [],
              } = movie;

              const posterURL = `https://image.tmdb.org/t/p/original${
                posterPath || posterAlt
              }`;
              const finalReleaseDate = releaseDateAlt || releaseDate;
              const finalRating = ratingAlt || rating;
              const finalGenre = genreIds.length > 0 ? genreIds : genre;

              return (
                <Col key={id} xs={24} sm={20} md={16} lg={14} xl={12} xxl={8}>
                  <MovieBlock
                    id={id}
                    key={id}
                    title={title}
                    poster={posterURL}
                    overview={overview}
                    releaseDate={finalReleaseDate}
                    rating={finalRating}
                    genre={finalGenre}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </RatingContext.Consumer>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string,
      overview: PropTypes.string.isRequired,
      releaseDate: PropTypes.string,
      rating: PropTypes.number,
      genre: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  searchText: PropTypes.string,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};

MovieList.defaultProps = {
  searchText: '',
  currentPage: 1,
  pageSize: 15,
};

export default MovieList;
