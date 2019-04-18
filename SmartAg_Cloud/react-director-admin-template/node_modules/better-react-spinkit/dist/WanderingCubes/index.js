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

var defaultSize = 16;

var WanderingCubes = function WanderingCubes(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      cubeSize = _ref.cubeSize,
      duration = _ref.duration,
      size = _ref.size,
      timingFunction = _ref.timingFunction,
      props = _objectWithoutProperties(_ref, ['color', 'cubeSize', 'duration', 'size', 'timingFunction']);

  var name = (0, _util.animationName)('wandering-cubes');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var outer = {
    height: finalSize,
    paddingBottom: cubeSize,
    paddingRight: cubeSize,
    position: 'relative',
    width: finalSize
  };
  var cube = _extends({}, (0, _util.animate)({ name: name, duration: duration, timingFunction: timingFunction }), {
    backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color),
    height: cubeSize,
    left: 0,
    position: 'absolute',
    top: 0,
    width: cubeSize
  });
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          25% { -webkit-transform: translateX(' + finalSize + 'px) rotate(-90deg) scale(0.5) }\n          50% { -webkit-transform: translateX(' + finalSize + 'px) translateY(' + finalSize + 'px) rotate(-180deg) }\n          75% { -webkit-transform: translateX(0px) translateY(' + finalSize + 'px) rotate(-270deg) scale(0.5) }\n          100% { -webkit-transform: rotate(-360deg) }\n        }\n        @keyframes ' + name + ' {\n          25% { \n            -webkit-transform: translateX(' + finalSize + 'px) rotate(-90deg) scale(0.5);\n                    transform: translateX(' + finalSize + 'px) rotate(-90deg) scale(0.5);\n          } 50% { \n            -webkit-transform: translateX(' + finalSize + 'px) translateY(' + finalSize + 'px) rotate(-179deg);\n                    transform: translateX(' + finalSize + 'px) translateY(' + finalSize + 'px) rotate(-179deg);\n          } 50.1% { \n            -webkit-transform: translateX(' + finalSize + 'px) translateY(' + finalSize + 'px) rotate(-180deg);\n                    transform: translateX(' + finalSize + 'px) translateY(' + finalSize + 'px) rotate(-180deg);\n          } 75% { \n            -webkit-transform: translateX(0px) translateY(' + finalSize + 'px) rotate(-270deg) scale(0.5);\n                    transform: translateX(0px) translateY(' + finalSize + 'px) rotate(-270deg) scale(0.5);\n          } 100% { \n            -webkit-transform: rotate(-360deg);\n                    transform: rotate(-360deg);\n          }\n        }\n      '
    }, props),
    _react2.default.createElement(
      'div',
      { style: outer },
      _react2.default.createElement('div', {
        style: _extends({}, cube)
      }),
      _react2.default.createElement('div', {
        style: _extends({}, cube, (0, _util.animate)({
          delay: '-0.9s'
        }))
      })
    )
  );
};

WanderingCubes.propTypes = {
  /**
   *  The color of the spinner.
   */
  color: _propTypes2.default.string,
  /**
   *  Maximum size of the cubes
   */
  cubeSize: _propTypes2.default.number,
  /**
   *  The duration of the animation.
   */
  duration: _propTypes2.default.string,
  /**
   *  The size of the spinner.
   */
  size: _propTypes2.default.number,
  timingFunction: _propTypes2.default.oneOf(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])
};

WanderingCubes.defaultProps = {
  cubeSize: 7,
  duration: '2s',
  size: defaultSize,
  timingFunction: 'ease-in-out'
};

WanderingCubes.contextTypes = _util.defaults.contextTypes;

exports.default = WanderingCubes;