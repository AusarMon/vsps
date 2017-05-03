import { fork } from 'redux-saga/effects';
import program from './program';
import problem from './problem';
import user from './user';

export default function* root() {
  yield fork(program);
  yield fork(problem);
  yield fork(user);
}
