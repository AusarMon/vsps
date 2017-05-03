import uuid from '../utils/uuid';

export const addWhile = ({ parentId, playload, area }) => (
  {
    type: 'CREATE_MODULE',
    area,
    module: {
      id: uuid('WHILE'),
      moduleType: 'WHILE',
      condition: '',
      procedure: [],
      parentId,
      playload,
    },
  }
);

export const deleteWhile = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
