import React, { Component, PropTypes } from 'react';
import '../../styles/underline-textarea.scss';

const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default class UnderlineTextarea extends Component {
  render() {
    return (
      <textarea
        type={this.props.type}
        className="vp-underline-textarea"
        placeholder={this.props.placeholder}
        value={this.props.value}
        {...this.props}
      />
    );
  }
}

UnderlineTextarea.propTypes = propTypes;
