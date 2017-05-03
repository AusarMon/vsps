import React, { Component, PropTypes } from 'react';
import ChooseInput from './ChooseInput';
import TextInput from './TextInput';
import noop from '../utils/noop';
import '../../styles/output-module.scss';
import { changeOutput, deleteOutput } from '../actions/OutputActions';

/* eslint-disable */

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
  onChange: noop,
};

export default class OutputModule extends Component {
  constructor(props) {
    super(props);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleDataTypeInputChange = this.handleDataTypeInputChange.bind(this);
    this.handleValueInputChange = this.handleValueInputChange.bind(this);
  }

  onCloseButtonClick() {
    const { id, dispatch } = this.props;
    dispatch(deleteOutput({ id }));
  }

  handleNameInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeOutput({
      id: this.props.id,
      name: value,
      dtype: this.props.dtype,
      desc: this.props.desc,
    }));
  }

  handleDataTypeInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeOutput({
      id: this.props.id,
      name: this.props.name,
      dtype: value,
      desc: this.props.desc,
    }));
  }

  handleValueInputChange(desc) {
    const { dispatch } = this.props;
    dispatch(changeOutput({
      id: this.props.id,
      name: this.props.name,
      dtype: this.props.dtype,
      desc,
    }));
  }

  render() {
    return (
      <div className="vp-output-module">
        <div className="vp-output-module__title">
          <span>输出</span>
          {!this.props.undeletable ?
            <i
              className="fa fa-times vp-module__close"
              onClick={this.onCloseButtonClick}
            /> : null
          }
        </div>
        <div className="vp-output-module__body">
          <div className="vp-output-module__item">
            <label className="vp-output-module__name">名称</label>
            <TextInput
              value={this.props.name}
              onChange={this.handleNameInputChange}
            />
          </div>
          <div className="vp-output-module__item">
            <label className="vp-output-module__name">类型</label>
            <ChooseInput
              value={this.props.dtype}
              onOptionSelect={this.handleDataTypeInputChange}
              options={this.props.types}
            />
          </div>
          <div className="vp-output-module__item">
            <label className="vp-output-module__name">描述</label>
            <TextInput
              value={this.props.desc}
              onChange={this.handleValueInputChange}
            />
          </div>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

OutputModule.propTypes = propTypes;
OutputModule.defaultProps = defaultProps;
