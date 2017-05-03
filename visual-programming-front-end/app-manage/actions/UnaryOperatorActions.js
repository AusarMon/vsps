import uuid from '../utils/uuid';

export const addUnaryOperator = ({ parentId, playload, area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('OPERATOR'),
    parentId,
    playload,
    moduleType: 'OPERATOR',
    op: 'unary_plus',
    sub: 'UNARY',
  },
});

export const changeUnaryOperator = ({
  id,
  first,
  firstType,
  firstIndex,
  op,
  assignValue,
  assignIndex,
}) => ({
  type: 'UPDATE_MODULE',
  module: {
    id,
    first,
    firstType,
    firstIndex,
    op,
    assignValue,
    assignIndex,
  },
});

export const deleteUnaryOperator = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
