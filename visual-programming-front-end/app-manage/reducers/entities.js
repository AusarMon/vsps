import _ from 'lodash';
import * as actions from '../actions/program';
import * as problemActions from '../actions/problem';

const modules = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      if (action.module.parentId && action.module.playload) {
        // TODO: 暂时先 mutable 吧，看一下是否可行，之后改成 immutable
        // DONE: 改成不可变的了
        if (action.module.playload === 'procedure') {
          // state[action.module.parentId][action.module.playload].push(action.module.id);
          return {
            ...state,
            [action.module.parentId]: {
              ...state[action.module.parentId],
              procedure: [...state[action.module.parentId].procedure, action.module.id],
            },
            [action.module.id]: {
              ...action.module,
            },
          };
        } else if (action.module.playload === 'condition') {
          // state[action.module.parentId][action.module.playload] = action.module.id;
          return {
            ...state,
            [action.module.parentId]: {
              ...state[action.module.parentId],
              condition: action.module.id,
            },
            [action.module.id]: {
              ...action.module,
            },
          };
        }
      }
      return {
        ...state,
        [action.module.id]: {
          ...action.module,
        },
      };
    case 'UPDATE_MODULE':
      return {
        ...state,
        [action.module.id]: {
          ...state[action.module.id],
          ...action.module,
        },
      };
    case 'DELETE_MODULE':
      // 关于这里代码的一点记录
      // 在删除一个模块的时候（比如删除 WHILE 模块）
      // 里面可能嵌套了许多其他模块
      // 这个时候这个 DELETE_MODULE 只能删除其 condition 和 procedure 对应在 entities 中的模块
      // 如果有更深的层级，就不会删除
      // 当然，其实根本就不用删除任何这个模块引用的模块，因为在 procedureArea 和 variableArea 中已经
      // 不会引用到相关的模块了
      {
        const shallowState = {
          ...state,
        };
        const deletedModule = state[action.module.id];
        if (deletedModule) {
          // 因为 condition 变成字符串了，所以就直接删除 m.condition
          // m.condition 是键值
          if (deletedModule.condition) {
            delete shallowState[deletedModule.condition];
          }
          if (deletedModule.procedure) {
            deletedModule.procedure.map((id) => {
              delete shallowState[id];
            });
          }
        }
        return _.omit(shallowState, action.module.id);
      }
    case actions.FETCH_PROGRAM.SUCCESS:
      // 替换掉 entities
      return action.entities;
    // problem 的数据结构与 program 是一样的，除了多了两个字段，rate 跟 state
    // rate 为通过率 state 为题目的状态
    case problemActions.FETCH_PROBLEM.SUCCESS:
      return action.entities;
    case actions.CREATE_PROGRAM_LOCAL:
      return {};
    default:
      return state;
  }
};

export default modules;
