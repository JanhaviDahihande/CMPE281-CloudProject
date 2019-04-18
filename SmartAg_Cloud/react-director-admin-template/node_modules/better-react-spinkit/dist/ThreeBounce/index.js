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

var defaultSize = 10;

var ThreeBounce = function ThreeBounce(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      duration = _ref.duration,
      gutter = _ref.gutter,
      scaleEnd = _ref.scaleEnd,
      scaleStart = _ref.scaleStart,
      size = _ref.size,
      timingFunction = _ref.timingFunction,
      props = _objectWithoutProperties(_ref, ['color', 'duration', 'gutter', 'scaleEnd', 'scaleStart', 'size', 'timingFunction']);

  var name = (0, _util.animationName)('three-bounce');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var ball = _extends({}, (0, _util.animate)({ duration: duration, name: name, timingFunction: timingFunction }), {
    backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color),
    borderRadius: '100%',
    display: 'inline-block',
    height: finalSize,
    width: finalSize
  });
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          0%, 80%, 100% {\n            -webkit-transform: scale(' + scaleStart + ');\n          }\n          40% {\n            -webkit-transform: scale(' + scaleEnd + ');\n          }\n        }\n\n        @keyframes ' + name + ' {\n          0%, 80%, 100% {\n            transform: scale(' + scaleStart + ');\n            -webkit-transform: scale(' + scaleStart + ');\n          }\n          40% {\n            transform: scale(' + scaleEnd + ');\n            -webkit-transform: scale(' + scaleEnd + ');\n          }\n        }\n      '
    }, props),
    _react2.default.createElement('div', {
      style: _extends({}, ball, (0, _util.animate)({ delay: '-0.32s' }), {
        marginRight: gutter
      })
    }),
    _react2.default.createElement('div', {
      style: _extends({}, ball, (0, _util.animate)({ delay: '-0.16s' }), {
        marginRight: gutter
      })
    }),
    _react2.default.createElement('div', {
      style: _extends({}, ball)
    })
  );
};

ThreeBounce.contextTypes = _util.defaults.contextTypes;

ThreeBounce.defaultProps = {
  duration: '1.5s',
  size: defaultSize,
  scaleEnd: 1,
  scaleStart: 0,
  gutter: 2,
  timingFunction: 'ease-in-out'
};

ThreeBounce.propTypes = {
  /**
   * The color of the dots.
   */
  color: _propTypes2.default.string,
  /**
   * The speed of the animation.
   */
  duration: _propTypes2.default.string,
  /**
   * The pixel value between dots.
   */
  gutter: _propTypes2.default.number,
  /**
   * End the animation with dots at x times the size value.
   */
  scaleEnd: _propTypes2.default.number,
  /**
   * Start the animation with dots at x times the size value.
   */
  scaleStart: _propTypes2.default.number,
  /**
   * The size of dots.
   */
  size: _propTypes2.default.number,
  timingFunction: _propTypes2.default.oneOf(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])
};

exports.default = ThreeBounce;