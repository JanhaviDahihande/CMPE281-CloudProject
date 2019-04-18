'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _minifyCssString = require('minify-css-string');

var _minifyCssString2 = _interopRequireDefault(_minifyCssString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Base = function Base(_ref) {
  var css = _ref.css,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ['css', 'children']);

  return _react2.default.createElement(
    'span',
    props,
    _react2.default.createElement('style', { children: (0, _minifyCssString2.default)(css) }),
    children
  );
};

Base.propTypes = {
  children: _propTypes2.default.node,
  css: _propTypes2.default.string.isRequired
};

exports.default = Base;