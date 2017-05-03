import React, { Component, PropTypes } from 'react';
import noop from '../utils/noop';
import '../../styles/modal.scss';
import '../../styles/dialog.scss';

const propTypes = {
  children: PropTypes.any,
  onCloseButtonClick: PropTypes.func,
};

const defaultProps = {
  onCloseButtonClick: noop,
};

export default class Modal extends Component {
  render() {
    return (
      <div className="zc-modal">
        <div className="vp-dialog">
          <div className="vp-dialog__top">
            <i
              className="fa fa-times vp-dialog__close"
              onClick={this.props.onCloseButtonClick}
            />
          </div>
          <div>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
