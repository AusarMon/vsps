import action from './action';

export default function createRequestAction(actionTypes) {
  return {
    request: (data = {}) => action(actionTypes.REQUEST, { ...data }),
    success: (data = {}, response) => action(actionTypes.SUCCESS, { ...data, response }),
    failure: (data = {}, error) => action(actionTypes.FAILURE, { ...data, error }),
  };
}
