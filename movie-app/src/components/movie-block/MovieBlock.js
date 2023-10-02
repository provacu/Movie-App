/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import './MovieBlock.css';
import { format } from 'date-fns';

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

  render() {
    const { title, poster, overview, releaseDate, rating, genre, votes } =
      this.props;

    const shortenedOverview = MovieBlock.stringLengthHandler(overview, 205);

    return (
      <div className="movieblock__outer-card-wrapper">
        <Card
          align="horizontal"
          bodyStyle={{
            minWidth: '451px',
            minHeight: '279px',
            background: '#FFFFFF',
            borderRadius: '0',
          }}
          hoverable="true"
          bordered="true"
        >
          <div className="movieblock__card">
            <img src={poster} alt={title} className="movieblock__image" />
            <div className="movieblock__info">
              <span className="movieblock__title">{title}</span>
              <p className="movieblock__info-date">
                {format(new Date(releaseDate), 'MMMM d, yyyy')}
              </p>
              <p className="movieblock__info-genre">{genre.join(', ')}</p>
              <p className="movieblock__info-overview">{shortenedOverview}</p>
              <p className="movieblock__info-rating">{rating}</p>
              <p className="movieblock__info-votes">{votes}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default MovieBlock;

MovieBlock.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genre: PropTypes.arrayOf(PropTypes.number).isRequired,
  votes: PropTypes.number.isRequired,
};
