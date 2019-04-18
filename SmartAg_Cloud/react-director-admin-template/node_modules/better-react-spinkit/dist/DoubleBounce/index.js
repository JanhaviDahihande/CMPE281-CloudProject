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

var DoubleBounce = function DoubleBounce(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      duration = _ref.duration,
      scaleEnd = _ref.scaleEnd,
      scaleStart = _ref.scaleStart,
      size = _ref.size,
      props = _objectWithoutProperties(_ref, ['color', 'duration', 'scaleEnd', 'scaleStart', 'size']);

  var name = (0, _util.animationName)('double-bounce');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var outer = {
    height: finalSize,
    position: 'relative',
    width: finalSize
  };
  var ball = _extends({}, (0, _util.animate)({ name: name, duration: duration }), {
    backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color),
    borderRadius: '100%',
    height: '100%',
    opacity: 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  });
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          0%, 100% {\n            -webkit-transform: scale(' + scaleStart + ');\n                    transform: scale(' + scaleStart + ');\n          }\n          50% {\n            -webkit-transform: scale(' + scaleEnd + ');\n                    transform: scale(' + scaleEnd + ');\n          }\n        }\n        @keyframes ' + name + ' {\n          0%, 100% {\n            -webkit-transform: scale(' + scaleStart + ');\n                    transform: scale(' + scaleStart + ');\n          }\n          50% {\n            -webkit-transform: scale(' + scaleEnd + ');\n                    transform: scale(' + scaleEnd + ');\n          }\n        }\n      '
    }, props),
    _react2.default.createElement(
      'div',
      { style: outer },
      _react2.default.createElement('div', { style: ball }),
      _react2.default.createElement('div', {
        style: _extends({}, ball, (0, _util.animate)({
          delay: '-1s'
        }))
      })
    )
  );
};

DoubleBounce.contextTypes = _util.defaults.contextTypes;

DoubleBounce.defaultProps = {
  duration: '2s',
  scaleEnd: 1,
  scaleStart: 0,
  size: defaultSize
};

DoubleBounce.propTypes = {
  /**
   * The color of the spinner.
   */
  color: _propTypes2.default.string,
  /**
   * The duration of the animation.
   */
  duration: _propTypes2.default.string,
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

exports.default = DoubleBounce;