import React, { Component, PropTypes } from 'react';
import noop from '../utils/noop';
import '../../styles/icon-button.scss';

const propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

const defaultProps = {
  icon: 'plus',
  onClick: noop,
  style: {},
};

export default class IconButton extends Component {

  render() {
    return (
      <div
        className="vp-icon-button"
        style={this.props.style}
        onClick={this.props.onClick}
      >
        {('text' in this.props) ?
          <span className="vp-icon-button__text">{this.props.text}</span> :
          <i className={`fa fa-${this.props.icon}`} />
        }
      </div>
    );
  }
}

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;
