import uuid from '../utils/uuid';

export const addIf = ({ parentId, playload, area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('IF'),
    moduleType: 'IF',
    condition: '',
    procedure: [],
    parentId,
    playload,
  },
});

export const deleteIf = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
