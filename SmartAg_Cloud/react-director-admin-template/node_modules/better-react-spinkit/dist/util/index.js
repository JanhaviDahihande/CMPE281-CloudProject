'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preside = exports.defaults = exports.animationName = exports.animate = undefined;

var _animate = require('./animate');

Object.defineProperty(exports, 'animate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_animate).default;
  }
});

var _animationName = require('./animationName');

Object.defineProperty(exports, 'animationName', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_animationName).default;
  }
});

var _preside = require('./preside');

Object.defineProperty(exports, 'preside', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_preside).default;
  }
});

var _defaults2 = require('./defaults');

var _defaults = _interopRequireWildcard(_defaults2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.defaults = _defaults;