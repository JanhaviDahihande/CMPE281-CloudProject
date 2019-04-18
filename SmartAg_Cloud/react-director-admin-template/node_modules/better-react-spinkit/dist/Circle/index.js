'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Circle = require('../Base/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultSize = 22;

var Circle = function Circle(_ref) {
  var scaleEnd = _ref.scaleEnd,
      scaleStart = _ref.scaleStart,
      props = _objectWithoutProperties(_ref, ['scaleEnd', 'scaleStart']);

  var name = (0, _util.animationName)('circle');
  return _react2.default.createElement(_Circle2.default, _extends({
    css: '\n        @-webkit-keyframes ' + name + ' {\n          0%, 80%, 100% {\n            -webkit-transform: scale(' + scaleStart + ');\n                    transform: scale(' + scaleStart + ');\n          }\n          40% {\n            -webkit-transform: scale(' + scaleEnd + ');\n                    transform: scale(' + scaleEnd + ');\n          }\n        }\n\n        @keyframes ' + name + ' {\n          0%, 80%, 100% {\n            -webkit-transform: scale(' + scaleStart + ');\n                    transform: scale(' + scaleStart + ');\n          } 40% {\n            -webkit-transform: scale(' + scaleEnd + ');\n                    transform: scale(' + scaleEnd + ');\n          }\n        }\n      ',
    defaultSize: defaultSize,
    name: name
  }, props));
};

Circle.defaultProps = {
  scaleEnd: 0.7,
  scaleStart: 0.4,
  size: defaultSize
};

Circle.propTypes = {
  /**
   * The color of the spinner.
   */
  color: _propTypes2.default.string,
  /**
   * End the animation with dots at x times the size value.
   */
  scaleEnd: _propTypes2.default.number,
  /**
   * Start the animation with dots at x times the size value.
   */
  scaleStart: _propTypes2.default.number,
  /**
   * The size of the spinner.
   */
  size: _propTypes2.default.number
};

exports.default = Circle;