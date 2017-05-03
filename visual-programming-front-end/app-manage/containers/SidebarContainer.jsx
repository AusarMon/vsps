import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import * as programActions from '../actions/program';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.handleExecButtonClick = this.handleExecButtonClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    console.log('ready to update?');
    if (nextProps.description !== this.props.description || nextProps.name !== this.props.name) {
      console.log('do update');
      return true;
    }
    console.log('not update');
    return false;
  }

  componentWillReceiveProps(nextProps) {
    console.log('component will receive props');
    console.log(nextProps.description);
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
    const { entities, id, name, description, variableArea, procedureArea, token } = this.props;
    return (
      <Sidebar
        entities={entities}
        id={id}
        name={name}
        desc={description}
        variableArea={variableArea}
        procedureArea={procedureArea}
        token={token}
        onExecButtonClick={this.handleExecButtonClick}
        onProgramTitleChange={this.props.onProgramDescChange}
        onProgramDescChange={this.props.onProgramDescChange}
        addProgram={this.props.addProgram}
      />
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
})(SidebarContainer);
