"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (propValue, contextValue, defaultValue) {
  return propValue && propValue !== defaultValue ? propValue : contextValue || defaultValue;
};