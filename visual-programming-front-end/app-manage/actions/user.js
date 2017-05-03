import createRequestType from './utils/create-request-type';
import createRequestAction from './utils/create-request-action';

export const USER_REGISTER = createRequestType('USER_REGISTER');
export const USER_LOGIN = createRequestType('USER_LOGIN');
export const USER_CHANGE_PASSWORD = createRequestType('USER_CHANGE_PASSWORD');
export const USER_SIGNOUT = 'USER_SIGNOUT';

const register = createRequestAction(USER_REGISTER);
const login = createRequestAction(USER_LOGIN);
const changePassword = createRequestAction(USER_CHANGE_PASSWORD);
const signout = () => ({
  type: USER_SIGNOUT,
});

export {
  register,
  login,
  changePassword,
  signout,
};
