if (process.env.NODE_ENV === 'production') {
  module.exports = require('./root.prod'); // eslint-disable-line
} else {
  module.exports = require('./root.dev'); // eslint-disable-line
}
