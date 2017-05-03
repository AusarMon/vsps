import React, { Component, PropTypes } from 'react';
import ChooseInput from './ChooseInput';
import TextInput from './TextInput';
import noop from '../utils/noop';
import { changeVariable, deleteVariable } from '../actions/VariableActions';
import '../../styles/variable-module.scss';


const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  dtype: PropTypes.string,
  value: PropTypes.string,
  types: PropTypes.array,
  dispatch: PropTypes.func,
};

const defaultProps = {
  name: '',
  dtype: '',
  value: '',
  types: [],
  onChange: noop,
};


export default class VariableModule extends Component {
  constructor(props) {
    super(props);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleDataTypeInputChange = this.handleDataTypeInputChange.bind(this);
    this.handleValueInputChange = this.handleValueInputChange.bind(this);
  }

  onCloseButtonClick() {
    const { id, dispatch } = this.props;
    dispatch(deleteVariable({ id }));
  }

  handleNameInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeVariable({
      id: this.props.id,
      name: value,
      dtype: this.props.dtype,
      value: this.props.value,
    }));
  }

  handleDataTypeInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeVariable({
      id: this.props.id,
      name: this.props.name,
      dtype: value,
      value: this.props.value,
    }));
  }

  handleValueInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeVariable({
      id: this.props.id,
      name: this.props.name,
      dtype: this.props.dtype,
      value,
    }));
  }
  render() {
    return (
      <div className="vp-variable-module">
        <div className="vp-variable-module__title">
          <span>变量</span>
          <i
            className="fa fa-times vp-module__close"
            onClick={this.onCloseButtonClick}
          />
        </div>
        <div className="vp-variable-module__body">
          <div className="vp-variable-module__item">
            <label className="vp-variable-module__name">名称</label>
            <TextInput
              value={this.props.name}
              onChange={this.handleNameInputChange}
            />
          </div>
          <div className="vp-variable-module__item">
            <label className="vp-variable-module__name">类型</label>
            <ChooseInput
              value={this.props.dtype}
              onOptionSelect={this.handleDataTypeInputChange}
              options={this.props.types}
            />
          </div>
          <div className="vp-variable-module__item">
            <label className="vp-variable-module__name">取值</label>
            <TextInput
              value={this.props.value}
              onChange={this.handleValueInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

VariableModule.propTypes = propTypes;
VariableModule.defaultProps = defaultProps;
