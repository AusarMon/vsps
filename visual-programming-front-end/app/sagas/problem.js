import { take, put, call, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { api, history } from '../services';
import normalize from '../utils/normalize';
import * as problemActions from '../actions/problem';

// 其实 fetchProblem 也是 fetchProgram 的一种，他们的数据结构是一样的
export function* runFetchProblem({ id }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.fetchProblem, id, token);
  if (response) {
    // 对 response 进行操作
    const { name, description, program } = normalize(response);
    const { variableArea, procedureArea, entities } = program;
    yield put(problemActions.fetchProblem.success({
      id,
      name,
      description,
      variableArea,
      procedureArea,
      entities,
    }, response));
  } else {
    yield put(problemActions.fetchProblem.failure({ id }, error));
  }
}

export function* runFetchAllProblems() {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.fetchAllProblems, token);
  if (response) {
    yield put(problemActions.fetchAllProblems.success({ }, response));
  } else {
    yield put(problemActions.fetchAllProblems.failure({ }, error));
  }
}

export function* runSaveProblem({ program }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.saveProblem, program, token);
  if (response) {
    yield put(problemActions.saveProblem.success({ program }, response));
  } else {
    yield put(problemActions.saveProblem.failure({ program }, error));
  }
}

// 目前还没有确定 runExecProblem 返回的数据结构
export function* runExecProblem({ id }) {
  const token = yield select(state => state.user.token);
  const { response, error } = yield call(api.execProblem, id, token);
  if (response) {
    yield put(problemActions.execProblem.success({ id }, response));
  } else {
    yield put(problemActions.execProblem.failure({ id }, error));
  }
}

export function* fetchProblem() {
  yield* takeEvery(problemActions.FETCH_PROBLEM.REQUEST, runFetchProblem);
}

export function* fetchAllProblems() {
  yield* takeEvery(problemActions.FETCH_ALL_PROBLEMS.REQUEST, runFetchAllProblems);
}

export function* saveProblem() {
  yield* takeEvery(problemActions.SAVE_PROBLEM.REQUEST, runSaveProblem);
}


export function* execProblem() {
  yield* takeEvery(problemActions.EXEC_PROBLEM.REQUEST, runExecProblem);
}

export default function* problem() {
  yield fork(fetchProblem);
  yield fork(fetchAllProblems);
  yield fork(saveProblem);
  yield fork(execProblem);
}
