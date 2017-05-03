import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import * as programActions from '../actions/program';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.handleExecButtonClick = this.handleExecButtonClick.bind(this);
  }

  // @deprecated
  handleExecButtonClick(id) {
    const request = new Request(`http://localhost:8080/v1/program/gen/${id}`, {
      method: 'GET',
      headers: {
        'X-Authorization': `Bearer ${this.props.token}`,
      },
    });
    fetch(request).then(response => response.text()).then(text => {
      console.log(text);
      const iframe = document.createElement('iframe');
      iframe.innerHTML = text;
      document.body.appendChild(iframe);
    });
  }

  render() {
    // TODO: 不要弄成将所有 props 传进去，将需要的 props 传进去
    return (
      <Sidebar {...this.props} onExecButtonClick={this.handleExecButtonClick} />
    );
  }
}

function mapStateToProps(state) {
  const { entities, program, user } = state;
  const { id, variableArea, procedureArea, name, description } = program;
  const { token } = user;
  return {
    entities,
    id,
    name,
    description,
    variableArea,
    procedureArea,
    token,
  };
}

export default connect(mapStateToProps, {
  onProgramTitleChange: programActions.titleChange,
  onProgramDescChange: programActions.descChange,
  addProgram: programActions.addProgram.request,
  updateProgram: programActions.updateProgram.request,
})(SidebarContainer);
