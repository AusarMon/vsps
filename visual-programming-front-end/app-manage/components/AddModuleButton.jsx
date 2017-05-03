import React, { Component, PropTypes } from 'react';
import noop from '../utils/noop';
import '../../styles/add-module-button.scss';

const propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: noop,
};

export default class AddModuleButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div
        className="vp-add-module-btn"
        onClick={this.handleClick}
        style={this.props.style}
      >
        <i
          className="fa fa-plus fa-2x"
        />
      </div>
    );
  }
}

AddModuleButton.propTypes = propTypes;
AddModuleButton.defaultProps = defaultProps;
