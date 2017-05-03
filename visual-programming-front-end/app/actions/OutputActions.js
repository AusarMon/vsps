import uuid from '../utils/uuid';

export const addOutput = ({ area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('OUTPUT'),
    moduleType: 'OUTPUT',
  },
});

export const changeOutput = ({ id, name, dtype, desc }) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    name,
    dtype,
    desc,
  },
});

export const deleteOutput = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
