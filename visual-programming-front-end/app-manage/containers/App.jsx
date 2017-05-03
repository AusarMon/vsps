import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Header from '../components/header';
import * as userActions from '../actions/user';
import { history } from '../services';
import '../font/iconfont.css';
import '../../styles/header-nav.scss';
import '../../styles/header.scss';
import '../../styles/utils.scss';

const propTypes = {
  children: PropTypes.any,
  user: PropTypes.object,
  signout: PropTypes.func,
  error: PropTypes.object,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { variableModalOpen: false };
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.message &&
      (nextProps.error.message !== this.props.error.message ||
      nextProps.error.timestamp !== this.props.error.timestamp)) {
        if (nextProps.error.type === 'error') {
          Alert.error(nextProps.error.message);
        } else if (nextProps.error.type === 'success') {
          Alert.success(nextProps.error.message);
        }
    }
  }

  handleSignoutClick() {
    this.props.signout();
    history.push('/login');
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Header
          user={this.props.user}
          onSignoutClick={this.handleSignoutClick}
        />
        {this.props.children}
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const { user, error } = state;
  return {
    user,
    error,
  };
}

export default connect(mapStateToProps, {
  signout: userActions.signout,
})(App);
