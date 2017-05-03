import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import ModuleBlock from './ModuleBlock';
import AddModuleButton from './AddModuleButton';
import { addInput } from '../actions/InputActions';
import { addVariable } from '../actions/VariableActions';
import { addOutput } from '../actions/OutputActions';
import ProgramModule from './Module';

const propTypes = {
  entities: PropTypes.object,
  nodes: PropTypes.array,
  dispatch: PropTypes.func,
};

const defaultProps = {
  data: [],
};

export default class VariableSection extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
    this.inputModuleBlockClick = this.inputModuleBlockClick.bind(this);
    this.variableModuleBlockClick = this.variableModuleBlockClick.bind(this);
    this.ouputModuleBlockClick = this.ouputModuleBlockClick.bind(this);
  }

  inputModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addInput({ area: 'VARIABLE_AREA' }));
    this.setState({ variableModalOpen: false });
  }

  variableModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addVariable({ area: 'VARIABLE_AREA' }));
    this.setState({ variableModalOpen: false });
  }

  ouputModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addOutput({ area: 'VARIABLE_AREA' }));
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
              module="input"
              name="输入"
              onClick={this.inputModuleBlockClick}
            />
            <ModuleBlock
              module="variable"
              name="变量"
              onClick={this.variableModuleBlockClick}
            />
            <ModuleBlock
              module="output"
              name="输出"
              onClick={this.ouputModuleBlockClick}
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

VariableSection.propTypes = propTypes;
VariableSection.defaultProps = defaultProps;
