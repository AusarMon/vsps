import React, { Component, PropTypes } from 'react';
import '../../styles/underline-input.scss';

const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
};

const defaultProps = {
  type: 'text',
};

export default class UnderlineInput extends Component {
  render() {
    return (
      <input
        type={this.props.type}
        className="vp-underline-input"
        placeholder={this.props.placeholder}
        value={this.props.value}
        {...this.props}
      />
    );
  }
}

UnderlineInput.propTypes = propTypes;
UnderlineInput.defaultProps = defaultProps;
