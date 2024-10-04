/*!
 * ScrambleText
 * https://github.com/yomotsu/ScrambleText
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
// 	typeof define === 'function' && define.amd ? define(factory) :
// 	(global.ScrambleText = factory());
// }(this, (function () { 'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

let ATTR_IDLING = "data-scramble-text-idling";
let ATTR_RUNNING = "data-scramble-text-running";

export const ScrambleText = (function () {
  function ScrambleText(el) {
    let option =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ScrambleText);

    this._startTime = 0;
    this._elapsedTime = 0;
    this._running = false;
    this._idling = true;
    this._position = 0;
    this._contents = split(el.innerHTML);
    this._anim = anim.bind(this);

    this.el = el;
    this.timeOffset = option.timeOffset || 50;
    this.fps = option.fps || 60;
    this.chars = option.chars || [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "!",
      "#",
      "$",
      "%",
      "&",
      ":",
      ";",
      "?",
      "@",
      "[",
      "]",
      "^",
      "_",
      "{",
      "|",
      "}",
      "~",
    ];
    this.callback =
      typeof option.callback === "function" ? option.callback : function () {};
    this.play();
    this.ignoreDifferentChars = option.ignoreDifferentChars;

    return this;
  }

  ScrambleText.prototype.play = function play() {
    if (this._running) return this;

    this._idling = true;
    this._running = true;
    this._position = 0;
    this.el.setAttribute(ATTR_IDLING, "");
    this.el.setAttribute(ATTR_RUNNING, "");
    this._anim();

    return this;
  };

  ScrambleText.prototype.start = function start() {
    this._idling = false;
    this._startTime = Date.now();
    this._elapsedTime = 0;
    this._position = 0;
    this.el.removeAttribute(ATTR_IDLING);

    return this;
  };

  ScrambleText.prototype.stop = function stop() {
    this._running = false;
    this.el.removeAttribute(ATTR_IDLING);
    this.el.removeAttribute(ATTR_RUNNING);

    return this;
  };

  return ScrambleText;
})();

function anim() {
  let elapsedTime = Date.now() - this._startTime;
  let deltaTime = elapsedTime - this._elapsedTime;
  let needsUpdate = 1000 / this.fps <= deltaTime;

  if (!needsUpdate) {
    requestAnimationFrame(this._anim);
    return;
  }

  this._elapsedTime = elapsedTime;
  this._position = this._idling ? 0 : (this._elapsedTime / this.timeOffset) | 0;

  if (!this._running) return;

  if (this._position >= this._contents.length) {
    this._running = false;
    this.el.innerHTML = this._contents
      .map(function (el) {
        return el.content;
      })
      .join("");
    this.el.removeAttribute("data-scramble-text-running");
    this.callback();
    return;
  }

  requestAnimationFrame(this._anim);

  let textArray = suffle(
    this._contents,
    this.chars,
    this._position,
    this.ignoreDifferentChars,
  );

  this.el.innerHTML = textArray.join("");
}

function suffle(contents, chars, position, ignoreDifferentChars) {
  let textArray = [];

  for (let i = 0, l = contents.length; i < l; i++) {
    if (contents[i].type === "tag") {
      textArray.push(contents[i].content);
      continue;
    }

    if (i < position) {
      textArray.push(contents[i].content);
      continue;
    }

    if (ignoreDifferentChars && !chars.includes(contents[i].content)) {
      textArray.push(contents[i].content);
      continue;
    }

    if (/\s/.test(contents[i].content)) {
      textArray.push(contents[i].content);
    }

    textArray.push(getRandCharacter(chars));
  }

  return textArray;
}

function getRandCharacter(chars) {
  let randNum = Math.floor(Math.random() * chars.length);
  let lowChoice = -0.5 + Math.random();
  let picketCharacter = chars[randNum];
  let choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
  return choosen;
}

function split(string) {
  let array = [];
  let tag = /^(\s*)?<\/?[a-z](.*?)>(\s*)?/i;
  let space = /^\s+/;

  string = string.replace(space, "").replace(/\s+$/, "");

  while (string.length !== 0) {
    let matchTag = string.match(tag);

    if (!!matchTag) {
      array.push({
        type: "tag",
        content: matchTag[0].replace(/^(\s*)(.+)(\s*)$/, "$1$2$3"),
      });
      string = string.replace(matchTag[0], "");
      continue;
    }

    let matchSpace = string.match(space);

    if (!!matchSpace) {
      array.push({
        type: "space",
        content: " ",
      });
      string = string.replace(matchSpace[0], "");
      continue;
    }

    array.push({
      type: "character",
      content: string[0],
    });
    string = string.slice(1);
  }

  return array;
}

// return ScrambleText;

// })));
