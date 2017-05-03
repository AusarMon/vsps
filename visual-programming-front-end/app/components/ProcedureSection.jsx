import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import ModuleBlock from './ModuleBlock';
import AddModuleButton from './AddModuleButton';
import ProgramModule from './Module';
import { addInput } from '../actions/InputActions';
import { addVariable } from '../actions/VariableActions';
import { addOutput } from '../actions/OutputActions';
import { addOperator } from '../actions/OperatorActions';
import { addUnaryOperator } from '../actions/UnaryOperatorActions';
import { addWhile } from '../actions/WhileActions';
import { addIf } from '../actions/IfActions';

const propTypes = {
  entities: PropTypes.object,
  nodes: PropTypes.array,
  dispatch: PropTypes.func,
};

const defaultProps = {
  data: [],
};

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

export default class ProcedureSection extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
    this.inputModuleBlockClick = this.inputModuleBlockClick.bind(this);
    this.variableModuleBlockClick = this.variableModuleBlockClick.bind(this);
    this.ouputModuleBlockClick = this.ouputModuleBlockClick.bind(this);
    this.operatorModuleBlockClick = this.operatorModuleBlockClick.bind(this);
    this.whileModuleBlockClick = this.whileModuleBlockClick.bind(this);
    this.ifModuleBlockClick = this.ifModuleBlockClick.bind(this);
    this.unaryOperatorModuleBlockClick = this.unaryOperatorModuleBlockClick.bind(this);
  }

  inputModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addInput());
    this.setState({ variableModalOpen: false });
  }

  variableModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addVariable());
    this.setState({ variableModalOpen: false });
  }

  ouputModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addOutput());
    this.setState({ variableModalOpen: false });
  }

  operatorModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addOperator({ area: 'PROCEDURE_AREA' }));
    this.setState({ variableModalOpen: false });
  }

  unaryOperatorModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addUnaryOperator({ area: 'PROCEDURE_AREA' }));
    this.setState({ variableModalOpen: false });
  }

  whileModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addWhile({ area: 'PROCEDURE_AREA' }));
    this.setState({ variableModalOpen: false });
  }

  ifModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addIf({ area: 'PROCEDURE_AREA' }));
    this.setState({ variableModalOpen: false });
  }

  createModule(programModule) {
    if (!programModule) {
      return undefined;
    }
    return (
      <ProgramModule
        key={programModule.id}
        programModule={programModule}
        dispatch={this.props.dispatch}
        entities={this.props.entities}
      />
    );
  }

  renderAddButton() {
    return (
      <div>
        <AddModuleButton
          style={{
            color: '#fff',
            backgroundColor: 'gray',
          }}
          onClick={() => { this.setState({ variableModalOpen: true }); }}
        />
        { this.state.variableModalOpen ?
          <Modal
            onCloseButtonClick={() => { this.setState({ variableModalOpen: false }); }}
          >
            <ModuleBlock
              module="operator"
              name="操作"
              onClick={this.operatorModuleBlockClick}
            />
            <ModuleBlock
              module="unaryOperator"
              name="一元操作"
              onClick={this.unaryOperatorModuleBlockClick}
            />
            <ModuleBlock
              module="while"
              name="循环"
              onClick={this.whileModuleBlockClick}
            />
            <ModuleBlock
              module="if"
              name="条件"
              onClick={this.ifModuleBlockClick}
            />
          </Modal> :
          null
        }
      </div>
    );
  }

  render() {
    return (
      <div
        className="vp-section"
        style={{
          borderRight: '1px solid #d9d9d9',
        }}
      >
        {this.props.nodes.map(id => this.createModule(this.props.entities[id]))}
        {this.renderAddButton()}
      </div>
    );
  }
}

ProcedureSection.propTypes = propTypes;
ProcedureSection.defaultProps = defaultProps;
