import { combineReducers } from 'redux';
import entities from './entities';
import program from './program';
import user from './user';
import programList from './program-list';
import problemList from './problem-list';
import error from './error';


const rootReducer = combineReducers({
  entities,
  program,
  user,
  programList,
  problemList,
  error,
});

export default rootReducer;
