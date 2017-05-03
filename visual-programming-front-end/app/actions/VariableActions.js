import uuid from '../utils/uuid';

export const addVariable = ({ area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('VARIABLE'),
    moduleType: 'VARIABLE',
    initType: 'immediate',
    dtype: 'number',
  },
});

export const changeVariable = ({ id, name, dtype, value }) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    name,
    dtype,
    value,
  },
});

export const deleteVariable = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
