import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import AddModuleButton from './AddModuleButton';
import '../../styles/condition-module.scss';
import Modal from './Modal';
import ModuleBlock from './ModuleBlock';
import { addWhile, deleteWhile } from '../actions/WhileActions';
import { addOperator } from '../actions/OperatorActions';
import { addUnaryOperator } from '../actions/UnaryOperatorActions';
import { addIf } from '../actions/IfActions';
import ProgramModule from './Module';

const propTypes = {
  id: PropTypes.string,
  entities: PropTypes.object,
  condition: PropTypes.string,
  procedure: PropTypes.array,
  moduleType: PropTypes.string,
  dispatch: PropTypes.func,
};

export default class ConditionModule extends Component {

  constructor(props) {
    super(props);
    this.state = { conditionModalOpen: false, modalOpen: false };
    this.handleAddConditionButtonClick = this.handleAddConditionButtonClick.bind(this);
    this.handleAddModuleButtonClick = this.handleAddModuleButtonClick.bind(this);
    this.operatorModuleBlockClick = this.operatorModuleBlockClick.bind(this);
    this.unaryOperatorModuleBlockClick = this.unaryOperatorModuleBlockClick.bind(this);
    this.conditionUnaryOperatorModuleBlockClick = this.conditionUnaryOperatorModuleBlockClick.bind(this);
    this.whileModuleBlockClick = this.whileModuleBlockClick.bind(this);
    this.conditionOperatorModuleBlockClick = this.conditionOperatorModuleBlockClick.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.ifModuleBlockClick = this.ifModuleBlockClick.bind(this);
  }

  onDeleteButtonClick() {
    const { dispatch, id } = this.props;
    dispatch(deleteWhile({ id }));
  }

  handleAddConditionButtonClick() {
    this.setState({ conditionModalOpen: true });
  }

  handleAddModuleButtonClick() {
    this.setState({ modalOpen: true });
  }

  operatorModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addOperator({ parentId: this.props.id, playload: 'procedure' }));
    this.setState({ modalOpen: false });
  }

  unaryOperatorModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addUnaryOperator({ parentId: this.props.id, playload: 'procedure' }));
    this.setState({ modalOpen: false });
  }

  conditionUnaryOperatorModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addUnaryOperator({ parentId: this.props.id, playload: 'condition' }));
    this.setState({ modalOpen: false });
  }

  whileModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addWhile({ parentId: this.props.id, playload: 'procedure' }));
    this.setState({ modalOpen: false });
  }

  conditionOperatorModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addOperator({ parentId: this.props.id, playload: 'condition' }));
    this.setState({ conditionModalOpen: false });
  }

  ifModuleBlockClick() {
    const { dispatch } = this.props;
    dispatch(addIf({ parentId: this.props.id, playload: 'procedure' }));
    this.setState({ conditionModalOpen: false });
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

  render() {
    const titleClassName = classNames({
      'vp-condition-module__title': true,
      'vp-while-module__title': this.props.moduleType === 'WHILE',
    });
    const conditonClassName = classNames({
      'vp-condition-module__condition': true,
      'vp-while-module__condition': this.props.moduleType === 'WHILE',
    });
    const boardClassName = classNames({
      'vp-condition-module__board': true,
      'vp-while-module__board': this.props.moduleType === 'WHILE',
    });
    return (
      <div>
        <div className="vp-condition-module">
          <div className={titleClassName}>
            <span>
              {this.props.moduleType === 'WHILE' ? '循环' : '条件'}
            </span>
            <i
              className="fa fa-times vp-module__close"
              onClick={this.onDeleteButtonClick}
            />
          </div>
          <div className="vp-condition-module__body">
            <div className={conditonClassName}>
              {this.createModule(this.props.entities[this.props.condition])}
              {!this.props.entities[this.props.condition] ?
                <AddModuleButton
                  style={{
                    color: '#dedede',
                  }}
                  onClick={this.handleAddConditionButtonClick}
                /> : null
              }
              { this.state.conditionModalOpen ?
                <Modal
                  onCloseButtonClick={() => { this.setState({ conditionModalOpen: false }); }}
                >
                  <ModuleBlock
                    module="operator"
                    name="操作"
                    onClick={this.conditionOperatorModuleBlockClick}
                  />
                  <ModuleBlock
                    module="unaryOperator"
                    name="一元操作"
                    onClick={this.conditionUnaryOperatorModuleBlockClick}
                  />
                </Modal> :
                null
              }
            </div>
            <div className={boardClassName}>
              {this.props.procedure.map(id => this.createModule(this.props.entities[id]))}
              <AddModuleButton
                style={{
                  color: '#e7e5e6',
                }}
                onClick={this.handleAddModuleButtonClick}
              />
              { this.state.modalOpen ?
                <Modal
                  onCloseButtonClick={() => { this.setState({ modalOpen: false }); }}
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
          </div>
        </div>
      </div>
    );
  }
}

ConditionModule.propTypes = propTypes;
