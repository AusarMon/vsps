import React, { Component, PropTypes } from 'react';
import ChooseInput from './ChooseInput';
import TextInput from './TextInput';
import IconButton from './IconButton';
import '../../styles/operator-module.scss';
import { changeUnaryOperator, deleteUnaryOperator } from '../actions/UnaryOperatorActions';

const propTypes = {
  id: PropTypes.string,
  first: PropTypes.string,
  firstType: PropTypes.string,
  firstIndex: PropTypes.string,
  op: PropTypes.string,
  assignValue: PropTypes.string,
  assignIndex: PropTypes.string,
  entities: PropTypes.object,
  parentId: PropTypes.string,
  dispatch: PropTypes.func,
};

const defaultProps = {
  first: '',
  op: '',
  parentId: '',
};

const opTypes = [
  {
    text: '＋',
    value: 'unary_plus',
  },
  {
    text: '－',
    value: 'unary_minus',
  },
];

export default class UnaryOperatorModule extends Component {
  constructor(props) {
    super(props);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.handleFisrtOperandSelect = this.handleFisrtOperandSelect.bind(this);
    this.chooseOperatorButtonClick = this.chooseOperatorButtonClick.bind(this);
    this.handleAssignInputClick = this.handleAssignInputClick.bind(this);
    this.handleFirstWithInputChange = this.handleFirstWithInputChange.bind(this);
    this.handleFirstIndexChange = this.handleFirstIndexChange.bind(this);
    this.handleAssignIndexChange = this.handleAssignIndexChange.bind(this);
  }

  onDeleteButtonClick() {
    const { dispatch, id } = this.props;
    dispatch(deleteUnaryOperator({ id }));
  }

  getChooseOptions() {
    const { entities } = this.props;
    const options = [];
    Object.keys(entities).forEach(function(key) {
      if (entities[key].moduleType === 'VARIABLE' || entities[key].moduleType === 'INPUT') {
        options.push({
          text: entities[key].name ? entities[key].name : '',
          value: key,
        });
      }
    });
    return options;
  }

  getAssignOptions() {
    const { entities } = this.props;
    const options = [];
    Object.keys(entities).forEach(function(key) {
      if (entities[key].moduleType === 'VARIABLE' || entities[key].moduleType === 'OUTPUT' || entities[key].moduleType === 'INPUT') {
        options.push({
          text: entities[key].name ? entities[key].name : '',
          value: key,
        });
      }
    });
    return options;
  }

  handleFisrtOperandSelect(value) {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      first: value,
      firstType: 'VAR',
      firstIndex: this.props.firstIndex,
      op: this.props.op,
      assignValue: this.props.assignValue,
      assignIndex: this.props.assignIndex,
    }));
  }

  handleAssignInputClick(value) {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      firstIndex: this.props.firstIndex,
      op: this.props.op,
      assignValue: value,
      assignIndex: this.props.assignIndex,
    }));
  }

  handleFirstWithInputChange(value) {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      first: value,
      firstType: 'immediate',
      firstIndex: this.props.firstIndex,
      op: this.props.op,
      assignValue: this.props.assignValue,
      assignIndex: this.propTypes.assignIndex,
    }));
  }

  chooseOperatorButtonClick() {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      firstIndex: this.props.firstIndex,
      op: this.getNextOpratorValue(),
      assignValue: this.props.assignValue,
      assignIndex: this.props.assignIndex,
    }));
  }

  getOpratorText() {
    for (let i = 0; i < opTypes.length; i++) {
      if (opTypes[i].value === this.props.op) {
        return opTypes[i].text;
      }
    }
    return '';
  }

  getNextOpratorValue() {
    for (let i = 0; i < opTypes.length; i++) {
      if (opTypes[i].value === this.props.op) {
        if (i + 1 === opTypes.length) {
          return opTypes[0].value;
        }
        return opTypes[i + 1].value;
      }
    }
    return '';
  }

  handleFirstIndexChange(value) {
    // 可能没有取索引，因为不一定是一个数组操作数
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      firstIndex: value,
      op: this.props.op,
      assignValue: this.props.assignValue,
      assignIndex: this.props.assignIndex,
    }));
  }

  handleAssignIndexChange(value) {
    const { dispatch } = this.props;
    dispatch(changeUnaryOperator({
      id: this.props.id,
      first: this.props.first,
      firstType: this.props.firstType,
      firstIndex: this.props.firstIndex,
      op: this.props.op,
      assignValue: this.props.assignValue,
      assignIndex: value,
    }));
  }

  render() {
    const firstInputValue = this.props.firstType === 'immediate' ? this.props.first : '';
    return (
      <div className="vp-operator-module">
        <div className="vp-operator-module__title">
          <span
            style={{
              marginRight: '16px',
            }}
          >
            一元
          </span>
          <ChooseInput
            value={this.props.assignValue}
            onOptionSelect={this.handleAssignInputClick}
            options={this.getAssignOptions()}
          />
          {this.props.entities[this.props.assignValue] && this.props.entities[this.props.assignValue].dtype === 'list' ?
            <TextInput
              type="index"
              value={this.props.assignIndex}
              onChange={this.handleAssignIndexChange}
            /> : null}
          <i
            className="fa fa-times vp-module__close"
            onClick={this.onDeleteButtonClick}
          />
        </div>
        <div className="vp-operator-module__body">
          <div className="vp-operator-module__item">
            <IconButton
              text={this.getOpratorText()}
              style={{
                color: '#2197d7',
              }}
              onClick={this.chooseOperatorButtonClick}
            />
          </div>
          <div className="vp-operator-module__item">
            <ChooseInput
              value={this.props.first}
              onOptionSelect={this.handleFisrtOperandSelect}
              options={this.getChooseOptions()}
              handleWithInputValueChange={this.handleFirstWithInputChange}
              inputValue={firstInputValue}
              showInputValue={this.props.firstType === 'immediate'}
              withInput
            />
            {this.props.entities[this.props.first] && this.props.entities[this.props.first].dtype === 'list' ?
              <TextInput
                type="index"
                value={this.props.firstIndex}
                onChange={this.handleFirstIndexChange}
              /> : null}
          </div>
        </div>
      </div>
    );
  }
}

UnaryOperatorModule.propTypes = propTypes;
UnaryOperatorModule.defaultProps = defaultProps;
