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

var Wordpress = function Wordpress(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      duration = _ref.duration,
      innerColor = _ref.innerColor,
      innerSize = _ref.innerSize,
      size = _ref.size,
      timingFunction = _ref.timingFunction,
      props = _objectWithoutProperties(_ref, ['color', 'duration', 'innerColor', 'innerSize', 'size', 'timingFunction']);

  var name = (0, _util.animationName)('wordpress');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var finalInnerSize = (0, _util.preside)(innerSize, null, finalSize / 4);
  var innerOffset = '18%';
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          0% {\n            -webkit-transform: rotate(0);\n                    transform: rotate(0);\n          }\n          100% {\n            -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n          }\n        }\n        @keyframes ' + name + ' {\n          0% {\n            -webkit-transform: rotate(0);\n                    transform: rotate(0);\n          }\n          100% {\n            -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n          }\n        }\n      '
    }, props),
    _react2.default.createElement(
      'div',
      {
        style: _extends({}, (0, _util.animate)({ name: name, timingFunction: timingFunction, duration: duration }), {
          backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color),
          borderRadius: finalSize,
          display: 'inline-block',
          height: finalSize,
          position: 'relative',
          width: finalSize
        })
      },
      _react2.default.createElement('div', {
        style: {
          backgroundColor: innerColor,
          borderRadius: finalInnerSize,
          display: 'block',
          height: finalInnerSize,
          left: innerOffset,
          position: 'absolute',
          top: innerOffset,
          width: finalInnerSize
        }
      })
    )
  );
};

Wordpress.propTypes = {
  /**
   * The color of the spinner.
   */
  color: _propTypes2.default.string,
  /**
   * The duration of the animation.
   */
  duration: _propTypes2.default.string,
  /**
   * The color of the inner circle.
   */
  innerColor: _propTypes2.default.string,
  /**
   * The size of the inner circle.
   */
  innerSize: _propTypes2.default.number,
  /**
   * The size of the spinner.
   */
  size: _propTypes2.default.number,
  timingFunction: _propTypes2.default.oneOf(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])
};

Wordpress.defaultProps = {
  duration: '2s',
  innerColor: '#fff',
  size: defaultSize,
  timingFunction: 'linear'
};

Wordpress.contextTypes = _util.defaults.contextTypes;

exports.default = Wordpress;