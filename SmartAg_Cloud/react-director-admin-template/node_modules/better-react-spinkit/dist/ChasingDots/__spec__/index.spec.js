'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallow = require('react-test-renderer/shallow');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _Base = require('../../Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = (0, _shallow.createRenderer)();

describe('ChasingDots', function () {
  var tree = void 0;

  beforeEach(function () {
    renderer.render(_react2.default.createElement(_2.default, null));
    tree = renderer.getRenderOutput();
  });

  it('renders a container', function () {
    (0, _expect2.default)(tree.type).toEqual(_Base2.default);
  });

  // it('renders an outer div', () => {
  //   const outerDiv = tree.props.children
  //   expect(outerDiv.type).toEqual('div')
  //   expect(outerDiv.props.style).toExist()
  // })

  // it('renders two inner divs', () => {
  //   const innerDivs = tree.props.children.props.children
  //   expect(innerDivs.length).toEqual(2)
  //   expect(innerDivs[0].type).toEqual('div')
  //   expect(innerDivs[1].type).toEqual('div')
  //   expect(innerDivs[0].props.style).toExist()
  //   expect(innerDivs[1].props.style).toExist()
  // })
});