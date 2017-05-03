import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import clickOutside from './highorder/ClickOutside';
import noop from '../utils/noop';
import '../../styles/text-input.scss';

const propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

const defaultProps = {
  defaultValue: '',
  onChange: noop,
  style: {},
  type: 'text',
};

export default class TextInput extends clickOutside(Component) {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    this.state = {
      value,
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value });
  }

  componentDidMount() {
    this.registerClickOutside(this.close, this.textInput);
  }

  handleClick() {
    this.open();
  }

  handleChange(e) {
    if ('value' in this.props) {
      this.props.onChange(e.target.value);
    } else {
      this.setState({ value: e.target.value });
    }
  }

  open() {
    this.setState({ open: true });
    this.bindClickOutside();
  }

  close() {
    this.setState({ open: false });
    this.unbindClickOutside();
  }

  render() {
    const inputWrapperClassName = classNames({
      'vp-text-input__input-wrapper': this.state.open,
      'vp-text-input__input-wrapper--hidden': !this.state.open,
    });
    return (
      <div
        className={this.props.type === 'text' ? 'vp-text-input' : 'vp-index-input' }
        style={this.props.style}
        onClick={this.handleClick}
        ref={node => { this.textInput = node; }}
      >
        <div
          className="vp-text-input__disp"
        >
          {this.state.value}
        </div>
        <div
          className={inputWrapperClassName}
        >
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;
