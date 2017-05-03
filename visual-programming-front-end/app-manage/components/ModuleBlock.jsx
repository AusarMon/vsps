import React, { Component, PropTypes } from 'react';
import noop from '../utils/noop';
import '../../styles/module-block.scss';

const propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  style: PropTypes.object,
  module: PropTypes.string,
};

const defaultProps = {
  onClick: noop,
  name: '',
  style: {},
  module: 'variable',
};

export default class ModuleBlock extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className={`${this.props.module}-module-block`}>
        <div
          className={`${this.props.module}-module-block__entity`}
          onClick={this.handleClick}
          style={this.props.style}
        >
          {this.props.name}
        </div>
      </div>
    );
  }
}

ModuleBlock.propTypes = propTypes;
ModuleBlock.defaultProps = defaultProps;
