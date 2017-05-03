import React, { PropTypes } from 'react';
import Spin from './spin';
import '../../styles/loading-overlay.scss';

const propTypes = {
  isShowing: PropTypes.bool,
};

const LoadingOverlay = ({ isShowing }) => (
  <div className={`${isShowing ? 'loading-overlay' : ''}`}>
    {isShowing ? <Spin /> : null}
  </div>
);

LoadingOverlay.propTypes = propTypes;

export default LoadingOverlay;
