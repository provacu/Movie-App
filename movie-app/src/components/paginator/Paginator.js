/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './Paginator.css';

class Paginator extends React.Component {
  render() {
    const { currentPage, pageSize, onChangePage } = this.props;
    return (
      <div className="paginator">
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          pageSize={pageSize}
          total={50}
          onChange={onChangePage}
        />
      </div>
    );
  }
}

export default Paginator;

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
