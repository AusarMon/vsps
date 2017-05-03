import React, { Component, PropTypes } from 'react';
import Button from './Button';
import '../../styles/user-info.scss';

const propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  onChangePasswordClick: PropTypes.func,
  onSignoutClick: PropTypes.func,
};

export default class UserInfo extends Component {
  render() {
    return (
      <div>
        <div className="user-info-card">
          <div className="user-info-card__username">{this.props.username}</div>
          <div className="user-info-card__email">{this.props.email}</div>
          <div className="user-info-card__button-wrapper">
            <Button
              type="hollow"
              radius
              onClick={this.props.onChangePasswordClick}
            >
              修改密码
            </Button>
          </div>
          <div className="user-info-card__button-wrapper">
            <Button
              type="hollow"
              radius
              onClick={this.props.onSignoutClick}
            >
              退出登录
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = propTypes;
