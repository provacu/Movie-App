import { useEffect } from 'react';
import PropTypes from 'prop-types';

function NetworkState({ onNetworkState }) {
  useEffect(() => {
    const updateNetworkState = () => onNetworkState(navigator.onLine);

    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);

    updateNetworkState();

    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);
    };
  }, [onNetworkState]);

  return null;
}

NetworkState.propTypes = {
  onNetworkState: PropTypes.func.isRequired,
};

export default NetworkState;
