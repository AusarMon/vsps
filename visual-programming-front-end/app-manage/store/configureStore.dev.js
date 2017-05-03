import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';
import DevTools from '../containers/devtools';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  DevTools.instrument()
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
