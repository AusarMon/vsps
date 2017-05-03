import * as actions from '../actions/program';

const procedureArea = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      if (!action.module.parentId && action.area === 'PROCEDURE_AREA') {
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
    //   return state.procedureArea;
    default:
      return state;
  }
};

export default procedureArea;
