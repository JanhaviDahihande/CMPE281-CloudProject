'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.color = exports.propTypes = exports.contextTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contextTypes = exports.contextTypes = {
  betterReactSpinkit: _propTypes2.default.shape({
    color: _propTypes2.default.string,
    size: _propTypes2.default.number
  })
};

var propTypes = exports.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.number
};

var color = exports.color = '#333';