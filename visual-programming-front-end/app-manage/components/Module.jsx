import React, { Component, PropTypes } from 'react';
import VariableModule from './VariableModule';
import InputModule from './InputModule';
import OutputModule from './OutputModule';
import ConditionModule from './ConditionModule';
import OperatorModule from './OperatorModule';
import UnaryOperatorModule from './UnaryOperatorModule';


const dataTypes = [
  {
    text: '数字',
    value: 'number',
  },
  {
    text: '布尔',
    value: 'bool',
  },
  {
    text: '列表',
    value: 'list',
  },
];


const propTypes = {
  programModule: PropTypes.object,
  dispatch: PropTypes.func,
  entities: PropTypes.object,
};

export default class ProgramModule extends Component {
  render() {
    switch (this.props.programModule.moduleType) {
      case 'INPUT':
        return (
          <InputModule
            {...this.props.programModule}
            types={dataTypes}
            dispatch={this.props.dispatch}
          />
        );
      case 'VARIABLE':
        return (
          <VariableModule
            {...this.props.programModule}
            types={dataTypes}
            dispatch={this.props.dispatch}
          />
        );
      case 'OUTPUT':
        return (
          <OutputModule
            {...this.props.programModule}
            types={dataTypes}
            dispatch={this.props.dispatch}
          />
        );
      case 'OPERATOR':
        if (this.props.programModule.sub === 'UNARY') {
          return (
            <UnaryOperatorModule
              {...this.props.programModule}
              entities={this.props.entities}
              dispatch={this.props.dispatch}
            />
          );
        }
        return (
          <OperatorModule
            {...this.props.programModule}
            entities={this.props.entities}
            dispatch={this.props.dispatch}
          />
        );
      case 'WHILE':
        return (
          <ConditionModule
            {...this.props.programModule}
            entities={this.props.entities}
            dispatch={this.props.dispatch}
          />
        );
      case 'IF':
        return (
          <ConditionModule
            {...this.props.programModule}
            entities={this.props.entities}
            dispatch={this.props.dispatch}
          />
        );
      default:
        return null;
    }
  }
}

ProgramModule.propTypes = propTypes;
