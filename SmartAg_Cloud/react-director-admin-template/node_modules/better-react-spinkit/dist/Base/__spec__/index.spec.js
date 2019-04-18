'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallow = require('react-test-renderer/shallow');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = (0, _shallow.createRenderer)();

describe('Base', function () {
  var outer = void 0,
      style = void 0;

  beforeEach(function () {
    renderer.render(_react2.default.createElement(_2.default, { css: '.testing { width: auto; }' }));
    outer = renderer.getRenderOutput();
    style = outer.props.children[0];
  });

  it('renders outer as a span', function () {
    (0, _expect2.default)(outer.type).toEqual('span');
  });

  it('renders a style tag', function () {
    (0, _expect2.default)(style.type).toEqual('style');
  });
});