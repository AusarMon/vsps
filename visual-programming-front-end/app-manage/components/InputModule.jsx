import React, { Component, PropTypes } from 'react';
import ChooseInput from './ChooseInput';
import TextInput from './TextInput';
import noop from '../utils/noop';
import '../../styles/input-module.scss';
import { changeInput, deleteInput } from '../actions/InputActions.js';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  dtype: PropTypes.string,
  desc: PropTypes.string,
  undeletable: PropTypes.bool,
  types: PropTypes.array,
  dispatch: PropTypes.func,
};

const defaultProps = {
  name: '',
  dtype: '',
  desc: '',
  types: [],
  undeletable: false,
  onChange: noop,
};

export default class InputModule extends Component {
  constructor(props) {
    super(props);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleDataTypeInputChange = this.handleDataTypeInputChange.bind(this);
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
  }

  onCloseButtonClick() {
    const { id, dispatch } = this.props;
    dispatch(deleteInput({ id }));
  }

  handleNameInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeInput({
      id: this.props.id,
      name: value,
      dtype: this.props.dtype,
      desc: this.props.desc,
    }));
  }

  handleDataTypeInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeInput({
      id: this.props.id,
      name: this.props.name,
      dtype: value,
      desc: this.props.desc,
    }));
  }

  handleDescriptionInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeInput({
      id: this.props.id,
      name: this.props.name,
      dtype: this.props.dtype,
      desc: value,
    }));
  }

  render() {
    return (
      <div className="vp-input-module">
        <div className="vp-input-module__title">
          <span>输入</span>
          {!this.props.undeletable ?
            <i
              className="fa fa-times vp-module__close"
              onClick={this.onCloseButtonClick}
            /> : null
          }
        </div>
        <div className="vp-input-module__body">
          <div className="vp-input-module__item">
            <label className="vp-input-module__name">名称</label>
            <TextInput
              value={this.props.name}
              onChange={this.handleNameInputChange}
            />
          </div>
          <div className="vp-input-module__item">
            <label className="vp-input-module__name">类型</label>
            <ChooseInput
              value={this.props.dtype}
              onOptionSelect={this.handleDataTypeInputChange}
              options={this.props.types}
            />
          </div>
          <div className="vp-input-module__item">
            <label className="vp-input-module__name">描述</label>
            <TextInput
              value={this.props.desc}
              onChange={this.handleDescriptionInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

InputModule.propTypes = propTypes;
InputModule.defaultProps = defaultProps;
