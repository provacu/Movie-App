import React from 'react';
import { Card, Rate, Tag } from 'antd';
import PropTypes from 'prop-types';
import './MovieBlock.css';
import { format } from 'date-fns';
import GenreContext from '../genre-context/GenreContext';
import { RatingContext } from '../rating-context/RatingContext';

class MovieBlock extends React.Component {
  static stringLengthHandler = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    let trimmedString = str.substr(0, maxLength);
    const lastSpaceIndex = trimmedString.lastIndexOf(' ');

    if (lastSpaceIndex !== -1) {
      trimmedString = trimmedString.substr(0, lastSpaceIndex);
    }

    return `${trimmedString}...`;
  };

  constructor(props) {
    super(props);
    this.state = {
      personalRating: 0,
      isCardExpanded: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const savedRating = localStorage.getItem(`personalRating_${id}`);
    if (savedRating) {
      this.setState({ personalRating: Number(savedRating) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { personalRating } = this.state;
    const { id } = this.props;

    if (prevState.personalRating !== personalRating) {
      const ratedMovies = JSON.parse(
        localStorage.getItem('ratedMovies') || '[]',
      );

      const existingMovieIndex = ratedMovies.findIndex(
        (movie) => movie.id === id,
      );

      if (personalRating > -1) {
        if (existingMovieIndex === -1) {
          ratedMovies.push(this.props);
        }
      } else if (existingMovieIndex !== -1) {
        ratedMovies.splice(existingMovieIndex, 1);
      }

      localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies));
    }
  }

  toggleCardSize = () => {
    this.setState((prevState) => ({
      isCardExpanded: !prevState.isCardExpanded,
    }));
  };

  handleRateChange = (value, updateRating) => {
    const { id, title, poster, overview, releaseDate, rating, genre } =
      this.props;
    const movieData = {
      id,
      title,
      poster,
      overview,
      releaseDate,
      rating,
      genre,
    };
    this.setState({ personalRating: value });
    updateRating(id, value, movieData);
  };

  render() {
    const { id, title, poster, overview, releaseDate, rating, genre } =
      this.props;
    const { isCardExpanded } = this.state;

    const displayTitle = title || 'Unknown Movie';
    const displayOverview = overview
      ? MovieBlock.stringLengthHandler(overview, 205)
      : 'No overview available';
    const displayReleaseDate = releaseDate
      ? format(new Date(releaseDate), 'MMMM d, yyyy')
      : 'Release date unknown';
    const displayRating = rating ? parseFloat(rating).toFixed(1) : 'N/A';

    const handleRatingColor = () => {
      if (rating >= 7) {
        return '#66E900';
      }
      if (rating >= 5) {
        return '#E9D100';
      }
      if (rating >= 3) {
        return '#E97E00';
      }
      return '#E90000';
    };

    return (
      <RatingContext.Consumer>
        {({ movieRatings, updateRating }) => (
          <GenreContext.Consumer>
            {({ genres, error }) => {
              if (error) {
                return <div>Error: {error}</div>;
              }

              const genreNames = genre.map(
                (genreId) =>
                  genres.find((g) => g.id === genreId)?.name || 'Unknown',
              );

              const personalRating = movieRatings[id] || 0;

              return (
                <div className="movieblock__outer-card-wrapper">
                  <Card
                    align="horizontal"
                    bodyStyle={{
                      padding: '0',
                      borderRadius: '0',
                    }}
                    className={
                      isCardExpanded
                        ? 'movieblock__card--expanded'
                        : 'movieblock__card--collapsed'
                    }
                    hoverable
                    bordered
                    onClick={this.toggleCardSize}
                  >
                    <div className="movieblock__card">
                      <img
                        src={poster}
                        alt={title}
                        className={
                          isCardExpanded
                            ? 'movieblock__image-expanded'
                            : 'movieblock__image'
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
                        }}
                      />
                      <div className="movieblock__info">
                        <div className="movieblock__header">
                          <div className="movieblock__title">
                            {displayTitle}
                          </div>
                          <div
                            className="movieblock__info-rating"
                            style={{ borderColor: handleRatingColor() }}
                          >
                            {displayRating}
                          </div>
                        </div>
                        <p className="movieblock__info-date">
                          {format(new Date(displayReleaseDate), 'MMMM d, yyyy')}
                        </p>
                        <div className="movieblock__info-genre">
                          {genreNames.map((name) => (
                            <Tag key={name}>{name}</Tag>
                          ))}
                        </div>
                        <p className="movieblock__info-overview">
                          {isCardExpanded
                            ? overview || 'No overview available'
                            : displayOverview}
                        </p>
                        <Rate
                          value={personalRating}
                          allowHalf
                          count={10}
                          onChange={(value) =>
                            this.handleRateChange(value, updateRating)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            }}
          </GenreContext.Consumer>
        )}
      </RatingContext.Consumer>
    );
  }
}

MovieBlock.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genre: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MovieBlock;
