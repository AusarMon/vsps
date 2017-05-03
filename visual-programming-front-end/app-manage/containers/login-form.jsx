import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import * as userActions from '../actions/user';

const propTypes = {
  login: PropTypes.func,
  isLoading: PropTypes.bool,
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ username, password }) {
    this.props.login({ username, password });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}

LoginContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  login: userActions.login.request,
})(LoginContainer);
