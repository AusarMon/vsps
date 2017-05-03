const initialState = {
  message: '',
  type: 'error',
  timestamp: Date.now(),
};

const error = (state = initialState, action) => {
  if (action.error) {
    if (typeof action.error === 'string') {
      return {
        ...state,
        message: action.error,
        type: 'error',
        timestamp: Date.now(),
      };
    } else {
      return {
        ...state,
        message: action.error.message,
        type: 'error',
        timestamp: Date.now(),
      };
    }
  }
  if (action.message) {
    if (typeof action.message === 'string') {
      return {
        ...state,
        message: action.message,
        type: 'success',
        timestamp: Date.now(),
      };
    }
  }
  switch (action.type) {
    case 'CLEAR_ALERT':
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
};

export default error;
