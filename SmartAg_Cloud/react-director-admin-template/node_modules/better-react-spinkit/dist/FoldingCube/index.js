'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('../Base');

var _Base2 = _interopRequireDefault(_Base);

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cubeDelay = require('./cubeDelay');

var _cubeDelay2 = _interopRequireDefault(_cubeDelay);

var _cubeRotateZ = require('./cubeRotateZ');

var _cubeRotateZ2 = _interopRequireDefault(_cubeRotateZ);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultSize = 18;

var FoldingCube = function FoldingCube(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      duration = _ref.duration,
      secondBounceDelay = _ref.secondBounceDelay,
      size = _ref.size,
      timingFunction = _ref.timingFunction,
      props = _objectWithoutProperties(_ref, ['color', 'duration', 'secondBounceDelay', 'size', 'timingFunction']);

  var name = (0, _util.animationName)('folding-cube');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var outer = {
    height: finalSize,
    padding: finalSize / 4,
    position: 'relative',
    transform: 'rotateZ(45deg)',
    width: finalSize,
    WebkitTransform: 'rotateZ(45deg)'
  };
  var cube = {
    float: 'left',
    height: '50%',
    position: 'relative',
    width: '50%',
    WebkitTransform: 'scale(1.1)',
    MsTransform: 'scale(1.1)',
    transform: 'scale(1.1)'
  };
  var cubeBefore = _extends({}, (0, _util.animate)({ name: name, duration: duration, timingFunction: timingFunction }), {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color),
    WebkitTransformOrigin: '100% 100%',
    MsTransformOrigin: '100% 100%',
    TransformOrigin: '100% 100%'
  });
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          0%, 10% {\n            -webkit-transform: perspective(140px) rotateX(-180deg);\n                    transform: perspective(140px) rotateX(-180deg);\n                    opacity: 0;\n          }\n          25%, 75% {\n            -webkit-transform: perspective(140px) rotateX(0deg);\n                    transform: perspective(140px) rotateX(0deg);\n                    opacity: 1;\n          }\n          90%, 100% {\n            -webkit-transform: perspective(140px) rotateY(180deg);\n                    transform: perspective(140px) rotateY(180deg);\n                    opacity: 0;\n          }\n        }\n        @keyframes ' + name + ' {\n          0%, 10% {\n            -webkit-transform: perspective(140px) rotateX(-180deg);\n                    transform: perspective(140px) rotateX(-180deg);\n                    opacity: 0;\n          }\n          25%, 75% {\n            -webkit-transform: perspective(140px) rotateX(0deg);\n                    transform: perspective(140px) rotateX(0deg);\n                    opacity: 1;\n          }\n          90%, 100% {\n            -webkit-transform: perspective(140px) rotateY(180deg);\n                    transform: perspective(140px) rotateY(180deg);\n                    opacity: 0;\n          }\n        }\n      '
    }, props),
    _react2.default.createElement(
      'div',
      { style: outer },
      (0, _lodash.range)(4).map(function (index) {
        var rotateZ = (0, _cubeRotateZ2.default)(index);
        var transform = 'scale(1.1) rotateZ(' + rotateZ + ')';
        var delay = (0, _cubeDelay2.default)(index);
        return _react2.default.createElement(
          'div',
          {
            key: index,
            style: _extends({}, cube, rotateZ ? { transform: transform, WebkitTransform: transform } : {})
          },
          _react2.default.createElement('div', {
            style: _extends({}, cubeBefore, delay ? (0, _util.animate)({ delay: delay }) : {})
          })
        );
      })
    )
  );
};

FoldingCube.contextTypes = _util.defaults.contextTypes;

FoldingCube.defaultProps = {
  duration: '2.4s',
  size: defaultSize,
  timingFunction: 'linear'
};

FoldingCube.propTypes = {
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
  size: _propTypes2.default.number,
  timingFunction: _propTypes2.default.oneOf(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])
};

exports.default = FoldingCube;