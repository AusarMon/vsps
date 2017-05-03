import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  type: PropTypes.string,
  link: PropTypes.string,
  iconName: PropTypes.string,
  title: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default class NavItem extends Component {
  renderLink() {
    return (
      <Link
        className="vp-header-nav__item"
        activeClassName="vp-header-nav__item--active"
        to={this.props.link}
        onlyActiveOnIndex={this.props.link === '/'}
      >
        <i className={`iconfont icon-${this.props.iconName} vp-header-nav__icon`} />
        <span>{`${this.props.title}`}</span>
      </Link>
    );
  }

  renderButton() {
    return (
      <div
        className="vp-header-nav__item"
        onClick={this.props.onButtonClick}
      >
        <i className={`iconfont icon-${this.props.iconName} vp-header-nav__icon`} />
        <span>{`${this.props.title}`}</span>
      </div>
    );
  }

  render() {
    return (
      this.props.type === 'link' ?
      this.renderLink() :
      this.renderButton()
    );
  }
}

NavItem.propTypes = propTypes;

