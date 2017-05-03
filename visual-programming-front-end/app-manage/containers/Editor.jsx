import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarContainer from './SidebarContainer';
import LoadingOverlay from '../components/loading-overlay';
import VariableSectionContainer from './VariableSectionContainer';
import ProcedureSectionContainer from './ProcedureSectionContainer';
import '../../styles/header-nav.scss';
import '../../styles/header.scss';
import '../../styles/utils.scss';

const propTypes = {
  isLoading: PropTypes.bool,
};

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
  }
  render() {
    return (
      <div>
        <LoadingOverlay isShowing={this.props.isLoading} />
        <SidebarContainer />
        <div className="vp-container">
          <VariableSectionContainer />
        </div>
      </div>
    );
  }
}

Editor.propTypes = propTypes;

function mapStateToProps(state) {
  const { program } = state;
  const { isLoading } = program;
  return {
    isLoading,
  };
}

export default connect(mapStateToProps)(Editor);
