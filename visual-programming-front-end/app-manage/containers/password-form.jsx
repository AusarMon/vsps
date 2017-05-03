import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PasswordForm from '../components/password-form';
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
    console.log('click');
    this.props.changePassword({ oldPassword, newPassword });
  }

  render() {
    return (
      <PasswordForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}

PasswordContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  changePassword: userActions.changePassword.request,
})(PasswordContainer);
