import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import LoadingOverlay from '../components/loading-overlay';
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
      <div>
        <LoadingOverlay isShowing={this.props.isLoading} />
        <LoginForm
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

LoginContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { user } = state;
  const { isLoading } = user;
  return {
    isLoading,
  };
}

export default connect(mapStateToProps, {
  login: userActions.login.request,
})(LoginContainer);
