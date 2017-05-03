import createRequestType from './utils/create-request-type';
import createRequestAction from './utils/create-request-action';

export const ADD_PROGRAM = createRequestType('ADD_PROGRAM');
export const UPDATE_PROGRAM = createRequestType('UPDATE_PROGRAM');
export const FETCH_PROGRAM = createRequestType('FETCH_PROGRAM');
export const FETCH_ALL_PROGRAMS = createRequestType('FETCH_ALL_PROGRAMS');
export const DELETE_PROGRAM = createRequestType('DELETE_PROGRAM');
export const CREATE_PROGRAM_LOCAL = 'CREATE_PROGRAM_LOCAL';
export const PROGRAM_TITLE_CHANGE = 'PROGRAM_TITLE_CHANGE';
export const PROGRAM_DESC_CHANGE = 'PROGRAM_DESC_CHANGE';

const addProgram = createRequestAction(ADD_PROGRAM);
const updateProgram = createRequestAction(UPDATE_PROGRAM);
const fetchProgram = createRequestAction(FETCH_PROGRAM);
const fetchAllProgram = createRequestAction(FETCH_ALL_PROGRAMS);
const deleteProgram = createRequestAction(DELETE_PROGRAM);
const createLocal = () => {
  return {
    type: CREATE_PROGRAM_LOCAL,
  };
};

const titleChange = (value) => {
  return {
    type: PROGRAM_TITLE_CHANGE,
    value,
  };
};

const descChange = (value) => {
  return {
    type: PROGRAM_DESC_CHANGE,
    value,
  };
};

export {
  addProgram,
  updateProgram,
  fetchProgram,
  fetchAllProgram,
  deleteProgram,
  createLocal,
  titleChange,
  descChange,
};
