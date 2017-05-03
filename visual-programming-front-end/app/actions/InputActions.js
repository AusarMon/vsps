import uuid from '../utils/uuid';

export const addInput = ({ area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('INPUT'),
    moduleType: 'INPUT',
    dtype: 'number',
  },
});

export const changeInput = ({ id, name, dtype, desc }) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    name,
    dtype,
    desc,
  },
});

export const deleteInput = ({ id, parentId }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
    parentId,
  },
});
