import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';
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
      <SignupForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}

SignupContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  register: userActions.register.request,
})(SignupContainer);
