/* eslint-disable no-undef */
'use strict';

// This logging shortcut is designed to only output console.log commands when DEBUG_MODE is true
// thus, not cluttering the console log when in production mode.
// it is also designed to work with Grep Console for colorization (for those of us using WebStorm). Download here: https://plugins.jetbrains.com/plugin/7125-grep-console

let debugMode = false;
let lineCount = 0;
let antiGrouping = false;

const debug = function() {
  debugMode = true;
};

function displayMessages(...msg) {
  if (!debugMode || !msg) {
    return;
  }

  // alternate between debug and log to prevent grouping of similiar messages.
  lineCount = lineCount === 0 ? 1 : 0;

  if (msg[0] === ' Info:') {
    console.info(...msg);
  } else if (msg[0] === ' Problem:') {
    console.warn(...msg);
  } else {
    if (lineCount === 0 && antiGrouping) {
      console.debug(...msg);
    } else {
      console.log(...msg);
    }
  }
}

debug.prototype.getMode = function() {
  return debugMode;
};

debug.prototype.setMode = function(mode) {
  debugMode = mode;
};

debug.prototype.getAntiGrouping = function() {
  return antiGrouping;
};

debug.prototype.setAntiGrouping = function(enabled) {
  antiGrouping = enabled;
};

debug.prototype.getInitialMode = function() {
  return (
    !!DEBUG_MODE || !!(process.argv && process.argv.includes('DEBUG_MODE=true'))
  );
};

debug.prototype.info = function(...msg) {
  displayMessages(' Info:', ...msg);
};

debug.prototype.log = function(...msg) {
  displayMessages(' Note:', ...msg);
};

debug.prototype.command = function(...msg) {
  displayMessages(' Command:', ...msg);
};

debug.prototype.sendOk = function(...msg) {
  displayMessages(' Send Ok:', ...msg);
};

debug.prototype.sendError = function(...msg) {
  displayMessages(' Send Error:', ...msg);
};

debug.prototype.send = function(...msg) {
  displayMessages(' Send:', ...msg);
};

debug.prototype.receive = function(...msg) {
  displayMessages(' Receive:', ...msg);
};

debug.prototype.problem = function(...msg) {
  displayMessages(' Problem:', ...msg);
};

module.exports = new debug();
