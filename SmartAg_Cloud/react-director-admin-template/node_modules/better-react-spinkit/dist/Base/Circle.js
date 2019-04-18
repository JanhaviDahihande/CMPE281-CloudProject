'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('../util');

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var prefixer = new _inlineStylePrefixer2.default();

var rotate = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

var delays = [0, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

var applyRotate = function applyRotate(index) {
  return prefixer.prefix({
    transform: 'rotate(' + rotate[index] + 'deg)'
  });
};

var innerCircle = {
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%'
};

var BaseCircle = function BaseCircle(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      defaultSize = _ref.defaultSize,
      name = _ref.name,
      size = _ref.size,
      props = _objectWithoutProperties(_ref, ['color', 'defaultSize', 'name', 'size']);

  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var outer = {
    height: finalSize,
    position: 'relative',
    width: finalSize
  };
  var innerCircleBefore = _extends({}, (0, _util.animate)({
    name: name,
    fillMode: 'both'
  }), {
    borderRadius: '100%',
    height: '20%',
    margin: '0 auto',
    width: '20%'
  });
  return _react2.default.createElement(
    _2.default,
    props,
    _react2.default.createElement(
      'div',
      { style: outer },
      (0, _lodash.range)(12).map(function (index) {
        return _react2.default.createElement(
          'div',
          {
            key: index,
            style: _extends({}, innerCircle, applyRotate(index))
          },
          _react2.default.createElement('div', {
            style: _extends({}, innerCircleBefore, (0, _util.animate)({
              delay: '-' + delays[index] + 's'
            }), {
              backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color)
            })
          })
        );
      })
    )
  );
};

BaseCircle.contextTypes = _util.defaults.contextTypes;

BaseCircle.propTypes = {
  color: _propTypes2.default.string,
  css: _propTypes2.default.string.isRequired,
  defaultSize: _propTypes2.default.number.isRequired,
  name: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.number
};

exports.default = BaseCircle;