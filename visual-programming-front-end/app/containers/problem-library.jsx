import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from '../components/loading-overlay';
import ProblemLibrary from '../components/problem-library';
import { history } from '../services';
import * as problemActions from '../actions/problem';

const propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  fetchAllProblems: PropTypes.func,
  fetchProblem: PropTypes.func,
};

class ProblemLibraryContainer extends Component {
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    console.log('ProblemLibraryContainer');
    this.props.fetchAllProblems();
  }

  handleCardClick(id) {
    this.props.fetchProblem({ id });
    history.push('/');
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <LoadingOverlay isShowing={this.props.isLoading} />
        <ProblemLibrary
          items={this.props.items}
          onCardClick={this.handleCardClick}
        />
      </div>
    );
  }
}

ProblemLibraryContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { problemList } = state;
  const { isLoading, items } = problemList;
  return {
    isLoading,
    items,
  };
}

export default connect(mapStateToProps, {
  fetchAllProblems: problemActions.fetchAllProblems.request,
  fetchProblem: problemActions.fetchProblem.request,
})(ProblemLibraryContainer);



