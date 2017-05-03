import React, { Component, PropTypes } from 'react';
import NavItem from './NavItem';

const propTypes = {
  user: PropTypes.object,
  onSignoutClick: PropTypes.func,
};

export default class Header extends Component {
  renderNotLogin() {
    return (
      <nav className="vp-header-nav">
        <NavItem
          type="link"
          link="/login"
          iconName="denglu"
          title="登录"
        />
        <NavItem
          type="link"
          link="/signup"
          iconName="geren"
          title="注册"
        />
      </nav>
    );
  }
  renderLogin() {
    return (
      <nav className="vp-header-nav">
        <NavItem
          type="link"
          link="/"
          iconName="dianping"
          title="编程"
        />
        <NavItem
          type="link"
          link="/library"
          iconName="jihe"
          title="集合"
        />
        <NavItem
          type="link"
          link="/square"
          iconName="all"
          title="广场"
        />
        <NavItem
          type="link"
          link="/user"
          iconName="geren"
          title="信息"
        />
        <NavItem
          onButtonClick={this.props.onSignoutClick}
          iconName="logout"
          title="退出"
        />
      </nav>
    );
  }
  render() {
    return (
      <header className="vp-header clearfix">
        <h1 className="vp-header-brand"><i className="iconfont icon-code vp-header-brand__icon" />
          <span>可视化编程</span>
        </h1>
        {this.props.user.token ?
          this.renderLogin() :
          this.renderNotLogin()
        }
      </header>
    );
  }
}

Header.propTypes = propTypes;
