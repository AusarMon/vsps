import * as actions from '../actions/program';

const variableArea = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      if (!action.module.parentId && action.area === 'VARIABLE_AREA') {
        return [...state, action.module.id];
      }
      return state;
    case 'DELETE_MODULE':
      {
        const idx = state.indexOf(action.module.id);
        if (idx !== -1) {
          return [
            ...state.slice(0, idx),
            ...state.slice(idx + 1),
          ];
        }
        return state;
      }
    // case actions.FETCH_PROGRAM.SUCCESS:
    //   return state;
    default:
      return state;
  }
};

export default variableArea;
