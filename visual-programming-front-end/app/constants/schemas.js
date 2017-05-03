import { Schema, arrayOf } from 'normalizr';

const module = new Schema('modules');

module.define({
  condition: arrayOf(module),
  procedure: arrayOf(module),
});
