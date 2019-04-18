"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (total) {
  var delays = [];
  for (var i = 0; i < total; i++) {
    delays.push((Math.random() * (1.0 - 0.1) + 0.1).toFixed(2));
  }
  return delays;
};