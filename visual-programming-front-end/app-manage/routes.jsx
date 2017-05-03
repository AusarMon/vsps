import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Editor from './containers/Editor';
import Login from './containers/login-form';
import SignupForm from './containers/signup-form';
import Password from './containers/password-form';
import ProgramLibrary from './containers/program-library';
import ProblemLibrary from './containers/problem-library';
import UserInfo from './containers/user-info';

const getRoutes = (history, store) => {
  const requireAuth = (nexState, replace, callback) => {
    const { user: { token } } = store.getState();
    if (!token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nexState.location.pathname },
      });
    }
    callback();
  };
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Editor} />
        <Route path="login" component={Login} />
        <Route path="signup" component={SignupForm} />
        <Route path="password" component={Password} onEnter={requireAuth} />
        <Route path="user" component={UserInfo} onEnter={requireAuth} />
        <Route path="square" component={ProblemLibrary} onEnter={requireAuth} />
      </Route>
    </Router>
  );
};

export default getRoutes;
