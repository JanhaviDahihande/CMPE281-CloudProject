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

var _lodash = require('lodash');

var _randomDelays = require('./randomDelays');

var _randomDelays2 = _interopRequireDefault(_randomDelays);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultSize = 18;
var memoizedRandomDelays = (0, _lodash.memoize)(_randomDelays2.default);

var CubeGrid = function CubeGrid(_ref, _ref2) {
  var _ref2$betterReactSpin = _ref2.betterReactSpinkit,
      betterReactSpinkit = _ref2$betterReactSpin === undefined ? {} : _ref2$betterReactSpin;

  var color = _ref.color,
      col = _ref.col,
      size = _ref.size,
      row = _ref.row,
      props = _objectWithoutProperties(_ref, ['color', 'col', 'size', 'row']);

  var name = (0, _util.animationName)('cube-grid');
  var finalSize = (0, _util.preside)(size, betterReactSpinkit.size, defaultSize);
  var grid = {
    display: 'flex',
    flexFlow: 'row wrap',
    height: finalSize,
    width: finalSize
  };
  var cube = _extends({}, (0, _util.animate)({ name: name }), {
    backgroundColor: (0, _util.preside)(color, betterReactSpinkit.color, _util.defaults.color),
    height: 100 / row + '%',
    width: 100 / col + '%'
  });
  var total = row * col;
  if (total > 1000) {
    return null;
  }
  var delays = memoizedRandomDelays(total);
  return _react2.default.createElement(
    _Base2.default,
    _extends({
      css: '\n        @-webkit-keyframes ' + name + ' {\n          0%, 70%, 100% {\n            -webkit-transform: scale3D(1, 1, 1);\n                    transform: scale3D(1, 1, 1);\n          }\n          35% {\n            -webkit-transform: scale3D(0, 0, 1);\n                    transform: scale3D(0, 0, 1);\n          }\n        }\n        @keyframes ' + name + ' {\n          0%, 70%, 100% {\n            -webkit-transform: scale3D(1, 1, 1);\n                    transform: scale3D(1, 1, 1);\n          }\n          35% {\n            -webkit-transform: scale3D(0, 0, 1);\n                    transform: scale3D(0, 0, 1);\n          }\n        }\n      '
    }, props),
    _react2.default.createElement(
      'div',
      { style: grid },
      (0, _lodash.range)(total).map(function (index) {
        return _react2.default.createElement('div', {
          key: index,
          style: _extends({}, cube, (0, _util.animate)({
            delay: delays[index] + 's'
          }))
        });
      })
    )
  );
};

CubeGrid.contextTypes = _util.defaults.contextTypes;

CubeGrid.defaultProps = {
  col: 3,
  row: 3,
  size: defaultSize
};

CubeGrid.propTypes = {
  /**
   * The color of the tiles.
   */
  color: _propTypes2.default.string,
  /**
   * The amount of columns.
   */
  col: _propTypes2.default.number,
  /**
   * The amount of rows.
   */
  row: _propTypes2.default.number,
  /**
   * The size of the grid.
   */
  size: _propTypes2.default.number
};

exports.default = CubeGrid;