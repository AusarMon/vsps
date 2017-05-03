import * as actions from '../actions/user';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  username: '',
  email: '',
  token: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.USER_LOGIN.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.USER_LOGIN.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        username: action.username,
        email: action.email,
        token: action.response.token,
      };
    case actions.USER_LOGIN.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        username: '',
        email: '',
        token: '',
      };
    case actions.USER_REGISTER.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.USER_REGISTER.SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actions.USER_REGISTER.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actions.USER_CHANGE_PASSWORD.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.USER_CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actions.USER_CHANGE_PASSWORD.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actions.USER_SIGNOUT:
      return {
        isAuthenticated: false,
        isLoading: false,
        username: '',
        email: '',
        token: '',
      };
    default:
      return state;
  }
}
