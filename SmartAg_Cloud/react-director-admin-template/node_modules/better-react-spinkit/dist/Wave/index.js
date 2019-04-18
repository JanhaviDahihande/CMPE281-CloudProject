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

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultSize = 22;

var Wave = function Wave(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      columns = _ref.columns,
      columnWidth = _ref.columnWidth,
      gutterWidth = _ref.gutterWidth,
      reverse = _ref.reverse,
      scaleYEnd = _ref.scaleYEnd,
      scaleYStart = _ref.scaleYStart,
      size = _ref.size,
      props = _objectWithoutProperties(_ref, ['color', 'columns', 'columnWidth', 'gutterWidth', 'reverse', 'scaleYEnd', 'scaleYStart', 'size']);

  var name = (0, _util.animationName)('wave');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var outer = {
    display: 'flex',
    justifyContent: 'space-between',
    height: finalSize - finalSize * 0.2,
    width: finalSize
  };
  var column = _extends({}, (0, _util.animate)({ name: name }), {
    backgroundColor: color || betterReactSpinkit.color || _util.defaults.color,
    height: '100%',
    width: columnWidth
  });
  var cols = reverse ? (0, _lodash.range)(columns).reverse() : (0, _lodash.range)(columns);
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          0%, 40%, 100% {\n            -webkit-transform: scaleY(' + scaleYStart + ')\n          }\n          20% {\n            -webkit-transform: scaleY(' + scaleYEnd + ')\n          }\n        }\n        @keyframes ' + name + ' {\n          0%, 40%, 100% {\n            transform: scaleY(' + scaleYStart + ');\n            -webkit-transform: scaleY(' + scaleYStart + ');\n          }\n          20% {\n            transform: scaleY(' + scaleYEnd + ');\n            -webkit-transform: scaleY(' + scaleYEnd + ');\n          }\n        }\n      '
    }, props),
    _react2.default.createElement(
      'div',
      { style: outer },
      cols.map(function (index) {
        return _react2.default.createElement('div', {
          key: index,
          style: _extends({}, column, (0, _util.animate)({ delay: '-' + index / 10 + 's' }), {
            marginRight: index !== columns ? gutterWidth : 0
          })
        });
      })
    )
  );
};

Wave.propTypes = {
  /**
   * The color of the spinner.
   */
  color: _propTypes2.default.string,
  /**
   * The amount of columns.
   */
  columns: _propTypes2.default.number,
  /**
   * The width of each column.
   */
  columnWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * The pixel value between columns.
   */
  gutterWidth: _propTypes2.default.number,
  /**
   * Reverse the animation.
   */
  reverse: _propTypes2.default.bool,
  /**
   * Ending column height.
   */
  scaleYEnd: _propTypes2.default.number,
  /**
   * Starting column height.
   */
  scaleYStart: _propTypes2.default.number,
  /**
   * The size of the spinner.
   */
  size: _propTypes2.default.number
};

Wave.defaultProps = {
  columns: 5,
  columnWidth: '20%',
  gutterWidth: 1,
  reverse: false,
  scaleYEnd: 1,
  scaleYStart: 0.4,
  size: defaultSize
};

Wave.contextTypes = _util.defaults.contextTypes;

exports.default = Wave;