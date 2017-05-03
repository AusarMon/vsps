import { take, put, call, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { api, history } from '../services';
import * as userActions from '../actions/user';

export function* runLogin({ username, password }) {
  const { response, error } = yield call(api.login, username, password);
  if (response) {
    yield put(userActions.login.success({ username }, response));
    history.push('/library');
  } else {
    yield put(userActions.login.failure({ username }, error));
  }
}

export function* runRegister({ username, password, email }) {
  const { response, error } = yield call(api.register, username, password, email);
  if (response) {
    yield put(userActions.register.success({ username, message: '注册成功，请登录' }, response));
    history.push('/login');
  } else {
    yield put(userActions.register.failure({ username }, error));
  }
}

export function* runChangePassword({ oldPassword, newPassword }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.changepassword, oldPassword, newPassword, token);
  if (response) {
    yield put(userActions.changePassword.success({ message: '修改密码成功' }, response));
    history.push('/library');
  } else {
    yield put(userActions.changePassword.failure({ }, error));
  }
}

export function* login() {
  yield* takeEvery(userActions.USER_LOGIN.REQUEST, runLogin);
}

export function* register() {
  yield* takeEvery(userActions.USER_REGISTER.REQUEST, runRegister);
}

export function* changePassword() {
  yield* takeEvery(userActions.USER_CHANGE_PASSWORD.REQUEST, runChangePassword);
}

export default function* user() {
  yield fork(login);
  yield fork(register);
  yield fork(changePassword);
}
