import uuid from '../utils/uuid';

const variable = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VARIABLE':
      return [
        ...state,
        { id: uuid('VARIABLE'), moduleType: 'variable' },
      ];
      return {
        ...state,
        [action.id]: {
          
        }
      }
    case 'CHANGE_VARIABLE':
      {
        const { name, dtype, value } = action;
        let idx;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
            idx = i;
            break;
          }
        }
        return [
          ...state.slice(0, idx),
          Object.assign({}, state[idx], {
            name,
            dtype,
            value,
          }),
          ...state.slice(idx + 1),
        ];
      }
    case 'DELETE_VARIABLE':
      {
        let idx;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
            idx = i;
            break;
          }
        }
        return [
          ...state.slice(0, idx),
          ...state.slice(idx + 1),
        ];
      }
    case 'ADD_INPUT':
      return [
        ...state,
        { id: uuid('INPUT'), moduleType: 'input' },
      ];
    case 'CHANGE_INPUT':
      {
        const { name, dtype, description } = action;
        let idx;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
            idx = i;
            break;
          }
        }
        return [
          ...state.slice(0, idx),
          Object.assign({}, state[idx], {
            name,
            dtype,
            description,
          }),
          ...state.slice(idx + 1),
        ];
      }
    case 'DELETE_INPUT':
      {
        let idx;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
            idx = i;
            break;
          }
        }
        return [
          ...state.slice(0, idx),
          ...state.slice(idx + 1),
        ];
      }
    case 'ADD_OUTPUT':
      return [
        ...state,
        { id: uuid('OUTPUT'), moduleType: 'output' },
      ];
    case 'CHANGE_OUTPUT':
      {
        console.log('hahahaha')
        const { name, dtype, value } = action;
        let idx;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
            idx = i;
            break;
          }
        }
        return [
          ...state.slice(0, idx),
          Object.assign({}, state[idx], {
            name,
            dtype,
            value,
          }),
          ...state.slice(idx + 1),
        ];
      }
    case 'DELETE_OUTPUT':
      {
        let idx;
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
            idx = i;
            break;
          }
        }
        return [
          ...state.slice(0, idx),
          ...state.slice(idx + 1),
        ];
      }
    default:
      return state;
  }
};

export default variable;
