import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import 'react-validation-form/src/form.css';
import getRoutes from './routes';
import configureStore from './store/configureStore';
import rootSaga from './sagas';
import { history } from './services';
import '../styles/base.scss';

const store = configureStore();
store.runSaga(rootSaga);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
  <Provider store={store}>
    <div>
      {getRoutes(history, store)}
    </div>
  </Provider>,
  app
);
