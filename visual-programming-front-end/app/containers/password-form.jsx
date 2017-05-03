import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PasswordForm from '../components/password-form';
import LoadingOverlay from '../components/loading-overlay';
import * as userActions from '../actions/user';

const propTypes = {
  changePassword: PropTypes.func,
  isLoading: PropTypes.bool,
};

class PasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ oldPassword, newPassword }) {
    this.props.changePassword({ oldPassword, newPassword });
  }

  render() {
    return (
      <div>
        <LoadingOverlay isShowing={this.props.isLoading} />
        <PasswordForm
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

PasswordContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { user } = state;
  const { isLoading } = user;
  return {
    isLoading,
  };
}

export default connect(mapStateToProps, {
  changePassword: userActions.changePassword.request,
})(PasswordContainer);
