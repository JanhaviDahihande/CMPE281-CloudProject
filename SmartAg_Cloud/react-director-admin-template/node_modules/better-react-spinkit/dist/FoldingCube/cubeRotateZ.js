'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (i) {
  switch (i) {
    case 1:
      return '90deg';
    case 3:
      return '180deg';
    case 2:
      return '270deg';
    default:
      return false;
  }
};