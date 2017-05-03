/**
 * 此时进来的 value 为 object
 */
function procedureNodeTransform(value, target, nameMap) {
  if (('first' in value) && ('firstType' in value) && value.firstType === 'VAR') {
    // reassign...but simple
    value.first = nameMap[value.first];
  }
  if (('second' in value) && ('secondType' in value) && value.secondType === 'VAR') {
    value.second = nameMap[value.second];
  }
  if (value.assignValue) {
    value.assignValue = nameMap[value.assignValue];
  }
  if (value.condition) {
    procedureNodeTransform(value.condition, target, nameMap);
  }
  if (value.procedure) {
    value.procedure.forEach(v => {
      procedureNodeTransform(v, target, nameMap);
    });
  }
  const procedure = [];
  if (value.condition) {
    value.condition = value.condition.id;
  }
  if (value.procedure) {
    value.procedure.forEach(v => {
      procedure.push(v.id);
    });
    value.procedure = procedure;
  }
  target.entities[value.id] = value;
}

function responseTransform(response) {
  const { name, description, structInfo } = response;
  const json = JSON.parse(structInfo);
  const nameMap = {};
  const target = {
    entities: {},
    variableArea: [],
    procedureArea: [],
  };
  json.variableArea.forEach(value => {
    target.entities[value.id] = value;
    target.variableArea.push(value.id);
    // 产生一个变量的 name 与 id 的映射表，方面下面查询
    nameMap[value.name] = value.id;
  });
  /**
   * 值得注意的一些事情
   * 1. 在 procedureArea 中，返回的数据中的操作符是名称，由 type 指定是变量还是直接量
   *    因此在处理数据的时候，需要将 firstType 和 secondType 的值转换成 ID
   * 2. 在 if 和 while 模块中包含 condition 和 procedure 模块
   *    对其进行递归
   */
  json.procedureArea.forEach(value => {
    procedureNodeTransform(value, target, nameMap);
    target.procedureArea.push(value.id);
  });
  return {
    name,
    description,
    program: target,
  };
}

export default responseTransform;
