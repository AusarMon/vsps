import { take, put, call, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { api, history } from '../services';
import normalize from '../utils/normalize';
import * as programActions from '../actions/program';

export function* runFetchProgram({ id }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.fetchProgram, id, token);
  if (response) {
    // 对 response 进行操作
    const { name, description, program } = normalize(response);
    const { variableArea, procedureArea, entities } = program;
    yield put(programActions.fetchProgram.success({
      id,
      name,
      description,
      variableArea,
      procedureArea,
      entities,
    }, response));
  } else {
    yield put(programActions.fetchProgram.failure({ id }, error));
  }
}

export function* runFetchAllProgram() {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.fetchAllPrograms, token);
  if (response) {
    yield put(programActions.fetchAllProgram.success({ }, response));
  } else {
    yield put(programActions.fetchAllProgram.failure({ }, error));
  }
}

export function* runAddProgram({ program }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.addProgram, program, token);
  if (response) {
    yield put(programActions.addProgram.success({ program }, response));
  } else {
    yield put(programActions.addProgram.failure({ program }, error));
  }
}

export function* runUpdateProgram({ program }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.updateProgram, program, token);
  if (response) {
    yield put(programActions.updateProgram.success({ program }, response));
  } else {
    yield put(programActions.updateProgram.failure({ program }, error));
  }
}

export function* runDeleteProgram({ id }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.deleteProgram, id, token);
  if (response) {
    yield put(programActions.deleteProgram.success({ id }, response));
  } else {
    yield put(programActions.deleteProgram.failure({ id }, error));
  }
}

export function* fetchProgram() {
  yield* takeEvery(programActions.FETCH_PROGRAM.REQUEST, runFetchProgram);
}

export function* fetchAllPrograms() {
  yield* takeEvery(programActions.FETCH_ALL_PROGRAMS.REQUEST, runFetchAllProgram);
}

export function* addProgram() {
  yield* takeEvery(programActions.ADD_PROGRAM.REQUEST, runAddProgram);
}


export function* updateProgram() {
  yield* takeEvery(programActions.UPDATE_PROGRAM.REQUEST, runUpdateProgram);
}

export function* deleteProgram() {
  yield* takeEvery(programActions.DELETE_PROGRAM.REQUEST, runDeleteProgram);
}

export default function* program() {
  yield fork(fetchProgram);
  yield fork(fetchAllPrograms);
  yield fork(addProgram);
  yield fork(updateProgram);
  yield fork(deleteProgram);
}
