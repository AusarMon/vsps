import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import 'react-validation-form/src/form.css';
import getRoutes from './routes';
import configureStore from './store/configureStore';
import DevTools from './containers/devtools';
import rootSaga from './sagas';
import { history } from './services';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../styles/base.scss';

const store = configureStore();
store.runSaga(rootSaga);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
  <Provider store={store}>
    <div>
      {getRoutes(history, store)}
      <DevTools />
    </div>
  </Provider>,
  app
);
