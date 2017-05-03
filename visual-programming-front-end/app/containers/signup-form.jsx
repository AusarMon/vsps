import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';
import LoadingOverlay from '../components/loading-overlay';
import * as userActions from '../actions/user';

const propTypes = {
  register: PropTypes.func,
  isLoading: PropTypes.bool,
};

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ username, password, email }) {
    this.props.register({ username, password, email });
  }

  render() {
    return (
      <div>
        <LoadingOverlay isShowing={this.props.isLoading} />
        <SignupForm
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

SignupContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { user } = state;
  const { isLoading } = user;
  return {
    isLoading,
  };
}

export default connect(mapStateToProps, {
  register: userActions.register.request,
})(SignupContainer);
