import React from 'react';
import classNames from 'classnames';

const NavButton = (props) => {
  const className = classNames({
    'vp-header-nav__item': true,
    'vp-header-nav__item--selected': props.selected,
  });
  return (
    <div className="vp-header-nav__item">
      <svg className="icon">
        <use xlinkHref="#icon-denglu" />>
      </svg>
      <span>登录</span>
    </div>
  );
};

export default NavButton;
