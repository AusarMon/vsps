import React, { Component, PropTypes } from 'react';
import UnderlineInput from './UnderlineInput';
import Button from './Button';
import { Link } from 'react-router';
import '../../styles/login.scss';
import '../../styles/link.scss';

export default class SignUp extends Component {
  render() {
    return (
      <div className="vp-login">
        <UnderlineInput placeholder="用户名" value="a" />
        <UnderlineInput placeholder="密码" />
        <Button
          type="hollow"
          radius
          style={{
            width: '100px',
            display: 'block',
            margin: '16px 0',
          }}
        >
        注册
        </Button>
        <Link className="vp-link" to="/signup">注册</Link>
      </div>
    );
  }
}
