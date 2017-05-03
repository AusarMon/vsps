import * as actions from '../actions/problem';

const initialState = {
  isLoading: false,
  items: [],
};

const problemList = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_PROBLEMS.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.FETCH_ALL_PROBLEMS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.response,
      };
    case actions.FETCH_ALL_PROBLEMS.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default problemList;
