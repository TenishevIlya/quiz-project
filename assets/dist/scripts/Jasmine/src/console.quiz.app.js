"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var checkTheAnswer = function checkTheAnswer(answer, value) {
  return value === answer;
};

var askNextQuestion = function askNextQuestion(text) {
  var answer = prompt(text);
  return answer;
};

var hasNextQuestion = function hasNextQuestion(obj, key) {
  return obj.hasOwnProperty(key);
};

var json = '[{"user_name":"jdeanesy0","first_name":"Joyan","last_name":"De Anesy","birth_date":"1999-06-27T08:49:07Z"},{"user_name":"lmincini1","first_name":"Lowe","last_name":"Mincini","birth_date":"1999-02-04T00:49:27Z"},{"user_name":"ahoult2","first_name":"Aggie","last_name":"Hoult","birth_date":"1999-05-10T04:12:57Z"},{"user_name":"uaxe3","first_name":"Upton","last_name":"Axe","birth_date":"1998-04-12T04:21:39Z"},{"user_name":"bmahaddie4","first_name":"Basilio","last_name":"Mahaddie","birth_date":"1997-02-11T08:23:53Z"},{"user_name":"mvalentetti5","first_name":"Maximo","last_name":"Valentetti","birth_date":"1997-02-10T19:23:16Z"}]';
var data = JSON.parse(json);
console.info('Initial data', data);

var toUser = function toUser(item, birthday) {
  return {
    name: "".concat(item.first_name, " ").concat(item.last_name),
    birthday: birthday
  };
};

var extract = function extract(data) {
  return data.reduce(function (prev, current) {
    var birthday = new Date(current.birth_date);
    var year = birthday.getUTCFullYear();
    return _objectSpread({}, prev, _defineProperty({}, year, [].concat(_toConsumableArray(prev[year] || []), [toUser(current, birthday)])));
  }, {});
};

var prepared = extract(data);
console.info('prepared', prepared);