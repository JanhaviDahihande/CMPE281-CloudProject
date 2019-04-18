'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('../Base');

var _Base2 = _interopRequireDefault(_Base);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultSize = 18;

var RotatingPlane = function RotatingPlane(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      duration = _ref.duration,
      size = _ref.size,
      props = _objectWithoutProperties(_ref, ['color', 'duration', 'size']);

  var name = (0, _util.animationName)('rotating-plane');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          0% {\n            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n                    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n          }\n          50% {\n            -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n                    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n          }\n          100% {\n            -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n          }\n        }\n        @keyframes ' + name + ' {\n          0% {\n            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n                    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n          }\n          50% {\n            -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n                    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n          }\n          100% {\n            -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n          }\n        }\n      '
    }, props),
    _react2.default.createElement('div', {
      style: _extends({}, (0, _util.animate)({ name: name, duration: duration }), {
        backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color),
        height: finalSize,
        width: finalSize
      })
    })
  );
};

RotatingPlane.contextTypes = _util.defaults.contextTypes;

RotatingPlane.propTypes = {
  /**
   * The color of the spinner.
   */
  color: _propTypes2.default.string,
  /**
   * The duration of the animation.
   */
  duration: _propTypes2.default.string,
  /**
   * The size of the spinner.
   */
  size: _propTypes2.default.number
};

RotatingPlane.defaultProps = {
  duration: '1.2s',
  size: defaultSize
};

exports.default = RotatingPlane;