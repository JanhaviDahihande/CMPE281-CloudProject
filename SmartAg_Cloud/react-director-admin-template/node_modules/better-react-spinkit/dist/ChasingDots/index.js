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

var ChasingDots = function ChasingDots(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      dotSize = _ref.dotSize,
      scaleEnd = _ref.scaleEnd,
      scaleStart = _ref.scaleStart,
      size = _ref.size,
      props = _objectWithoutProperties(_ref, ['color', 'dotSize', 'scaleEnd', 'scaleStart', 'size']);

  var name = (0, _util.animationName)('chasing-dots');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var outer = _extends({}, (0, _util.animate)({ name: name + '-rotate' }), {
    height: finalSize,
    position: 'relative',
    width: finalSize
  });
  var dot = _extends({}, (0, _util.animate)({ name: name + '-bounce' }), {
    backgroundColor: color || betterReactSpinkit.color || _util.defaults.color,
    borderRadius: '100%',
    display: 'inline-block',
    height: dotSize,
    position: 'absolute',
    top: 0,
    width: dotSize
  });
  var dotTwo = _extends({}, dot, (0, _util.animate)({ delay: '-1.0s' }), {
    bottom: 0,
    top: 'auto'
  });
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + '-rotate {\n          100% {\n            -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n          }\n        }\n        @keyframes ' + name + '-rotate {\n          100% {\n            -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n          }\n        }\n        @-webkit-keyframes ' + name + '-bounce {\n          0%, 100% {\n            -webkit-transform: scale(' + scaleStart + ');\n                    transform: scale(' + scaleStart + ');\n          }\n          50% {\n            -webkit-transform: scale(' + scaleEnd + ');\n                    transform: scale(' + scaleEnd + ');\n          }\n        }\n        @keyframes ' + name + '-bounce {\n          0%, 100% {\n            -webkit-transform: scale(' + scaleStart + ');\n                    transform: scale(' + scaleStart + ');\n          }\n          50% {\n            -webkit-transform: scale(' + scaleEnd + ');\n                    transform: scale(' + scaleEnd + ');\n          }\n        }\n      '
    }, props),
    _react2.default.createElement(
      'div',
      { style: outer },
      _react2.default.createElement('div', { style: dot }),
      _react2.default.createElement('div', { style: dotTwo })
    )
  );
};

ChasingDots.contextTypes = _util.defaults.contextTypes;

ChasingDots.defaultProps = {
  dotSize: '45%',
  scaleEnd: 1,
  scaleStart: 0,
  size: defaultSize
};

ChasingDots.propTypes = {
  /**
   * The color of the dots.
   */
  color: _propTypes2.default.string,
  /**
   * The maximum size of the dots.
   */
  dotSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
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

exports.default = ChasingDots;