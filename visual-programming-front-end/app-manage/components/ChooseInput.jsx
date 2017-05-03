import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import clickOutside from './highorder/ClickOutside';
import noop from '../utils/noop';
import '../../styles/choose-input.scss';

const propTypes = {
  value: PropTypes.string,
  defaultSelectFirst: PropTypes.bool,
  options: PropTypes.array,
  onOptionSelect: PropTypes.func,
  withInput: PropTypes.bool, // 这个选择 input 组件可以带有一个用户可以输入内容的输入框
  inputValue: PropTypes.string, // 用户自己在输入框中输入的内容
  showInputValue: PropTypes.bool, // 是显示自己输入的内容还是显示选择的内容
  handleWithInputValueChange: PropTypes.func, // 当用户自己输入的输入框中的内容发生改变时候调用的函数
};

const defaultProps = {
  defaultSelectFirst: true,
  onOptionSelect: noop,
  withInput: false,
  inputValue: '',
  handleWithInputValueChange: noop,
  showInputValue: false,
};

export default class ChooseInput extends clickOutside(Component) {

  constructor(props) {
    super(props);
    this.onSelectClick = this.onSelectClick.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    let value = '';
    if (props.defaultSelectFirst && props.options[0]) {
      value = props.options[0].value;
    }
    if ('value' in props) {
      value = props.value;
    }
    this.state = { open: false, value };
  }

  componentDidMount() {
    this.registerClickOutside(this.close, this.chooseInput);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  onSelectClick() {
    this.setState({ open: !this.state.open });
    this.bindClickOutside();
  }

  open() {
    this.setState({ open: true });
    this.bindClickOutside();
  }

  close() {
    this.setState({ open: false });
    this.unbindClickOutside();
  }

  handleOptionSelect(value) {
    this.props.onOptionSelect(value);
  }

  handleInputChange(event) {
    event.stopPropagation();
    this.props.handleWithInputValueChange(event.target.value);
  }

  getCurrentText() {
    const { showInputValue, withInput, inputValue } = this.props;
    if (showInputValue && withInput) {
      return inputValue;
    }
    return this.getCurrentSelectedText();
  }

  getCurrentSelectedText() {
    const value = this.state.value;
    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].value === value) {
        return this.props.options[i].text;
      }
    }
    return '';
  }

  render() {
    const itemsClassName = classNames({
      'vp-choose-input__items': this.state.open,
      'vp-choose-input__items--hidden': !this.state.open,
    });
    return (
      <div
        className="vp-choose-input"
        onClick={this.onSelectClick}
        ref={node => { this.chooseInput = node; }}
      >
        <div
          className="vp-choose-input__select"
        >
          {this.getCurrentText()}
        </div>
        <div className={itemsClassName}>
          { this.props.withInput ?
            <input
              className="vp-choose-input__input-item"
              type="text"
              value={this.props.inputValue}
              onChange={this.handleInputChange}
              onClick={(event) => { event.stopPropagation(); }}
            /> :
            null
          }
          {this.props.options.map(option => (
            <div
              key={option.value}
              className="vp-choose-input__item"
              onClick={() => {
                this.handleOptionSelect(option.value);
              }}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ChooseInput.propTypes = propTypes;
ChooseInput.defaultProps = defaultProps;
