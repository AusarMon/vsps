import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserInfo from '../components/user-info';
import { history } from '../services';
import * as userActions from '../actions/user';

const propTypes = {
  signout: PropTypes.func,
  username: PropTypes.string,
  email: PropTypes.string,
};

class UserInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChangePasswordClick = this.handleChangePasswordClick.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
  }

  handleChangePasswordClick() {
    history.push('/password');
  }

  handleSignoutClick() {
    this.props.signout();
    history.push('/login');
  }

  render() {
    return (
      <UserInfo
        username={this.props.username}
        email={this.props.email}
        onChangePasswordClick={this.handleChangePasswordClick}
        onSignoutClick={this.handleSignoutClick}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const { username, email } = user;
  return {
    username,
    email,
  };
}

UserInfoContainer.propTypes = propTypes;

export default connect(mapStateToProps, {
  signout: userActions.signout,
})(UserInfoContainer);
