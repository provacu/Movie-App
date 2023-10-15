import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import './SearchPanel.css';

class SearchPanel extends React.Component {
  handleSearchChange = (e) => {
    const { setSearchText } = this.props;
    setSearchText(e.target.value);
  };

  render() {
    return (
      <div className="searchpanel__input">
        <Input.Search
          placeholder="Type to search..."
          allowClear
          size="middle"
          style={{
            margin: '15px',
            width: 'calc(100% - 30px)',
          }}
          onChange={this.handleSearchChange}
          onPressEnter={this.handleSearchChange}
        />
      </div>
    );
  }
}

SearchPanel.propTypes = {
  setSearchText: PropTypes.func.isRequired,
};

export default SearchPanel;
