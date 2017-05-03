import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spin from '../components/spin';
import LoadingOverlay from '../components/loading-overlay';
import ProgramLibrary from '../components/program-library';
import { history } from '../services';
import * as programActions from '../actions/program';

const propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  fetchAllProgram: PropTypes.func,
  fetchProgram: PropTypes.func,
  createProgram: PropTypes.func,
  deleteProgram: PropTypes.func,
};

class ProgramLibraryContainer extends Component {
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllProgram();
  }

  handleCardClick(id) {
    this.props.fetchProgram({ id });
    history.push('/');
  }

  handleCreateClick() {
    this.props.createProgram();
    history.push('/');
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <LoadingOverlay isShowing={this.props.isLoading} />
        <ProgramLibrary
          items={this.props.items}
          onCardClick={this.handleCardClick}
          onCreateClick={this.handleCreateClick}
          onDeleteClick={this.props.deleteProgram}
        />
      </div>
    );
  }
}

ProgramLibraryContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { programList } = state;
  const { isLoading, items } = programList;
  return {
    isLoading,
    items,
  };
}

export default connect(mapStateToProps, {
  fetchAllProgram: programActions.fetchAllProgram.request,
  fetchProgram: programActions.fetchProgram.request,
  createProgram: programActions.createLocal,
  deleteProgram: programActions.deleteProgram.request,
})(ProgramLibraryContainer);



