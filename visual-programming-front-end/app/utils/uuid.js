let id = 0;

const uuid = (name) => `${name}-${Date.now()}-${id++}`;

export default uuid;
