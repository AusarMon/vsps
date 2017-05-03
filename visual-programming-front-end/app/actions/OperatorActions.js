import uuid from '../utils/uuid';

export const addOperator = ({ parentId, playload, area }) => ({
  type: 'CREATE_MODULE',
  area,
  module: {
    id: uuid('OPERATOR'),
    parentId,
    playload,
    moduleType: 'OPERATOR',
    op: 'plus',
  },
});

export const changeOperator = ({
  id,
  first,
  firstType,
  firstIndex,
  second,
  secondType,
  secondIndex,
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
    second,
    secondType,
    secondIndex,
    op,
    assignValue,
    assignIndex,
  },
});

export const deleteOperator = ({ id }) => ({
  type: 'DELETE_MODULE',
  module: {
    id,
  },
});
