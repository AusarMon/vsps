import * as actions from '../actions/program';

const initialState = {
  isLoading: false,
  items: [],
};

const programList = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_PROGRAMS.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.FETCH_ALL_PROGRAMS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.response,
      };
    case actions.FETCH_ALL_PROGRAMS.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actions.DELETE_PROGRAM.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.DELETE_PROGRAM.SUCCESS:
      {
        let index = -1;
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].programId === action.id) {
            index = i;
          }
        }
        if (index !== -1) {
          return {
            ...state,
            isLoading: false,
            items: [...state.items.slice(0, index), ...state.items.slice(index + 1)],
          };
        }
        return {
          ...state,
          isLoading: false,
        };
      }
    case actions.DELETE_PROGRAM.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default programList;
