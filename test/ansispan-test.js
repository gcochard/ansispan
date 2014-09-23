var assert = require('assert'),
    vows = require('vows'),
    ansispan = require('../');

require('colors');

var dataSets = {
  simple: {
    input: 'hello world'.green,
    output: '<span style="color: green">hello world</span>'
  },
  nested: {
    input: 'hello world'.green.red,
    output: '<span style="color: red"><span style="color: green">hello world</span></span>'
  },
  many: {
    input: 'hello '.green + 'world'.red,
    output: '<span style="color: green">hello </span><span style="color: red">world</span>'
  },
  'many same colors': {
    input: 'hello '.green + 'world'.green,
    output: '<span style="color: green">hello </span><span style="color: green">world</span>'
  },
  'colors with \\033\\[0;Xm': {
    input: '\033\[0;32mhello world\033\[39m',
    output: '<span style="color: green">hello world</span>'
  },
  'colors with reset bit': {
    input: '\033[35mhello world\033[0m',
    output: '<span style="color: purple">hello world</span>'
  },
  bold: {
    input: 'hello world'.bold,
    output: '<span style="font-weight: bold;">hello world</span>'
  },
  italics: {
    input: 'hello world'.italic,
    output: '<span style="font-style: italic;">hello world</span>'
  },
  '\033[30mblack\033[0m': {
    input: '\033[30mhello world\033[0m',
    output: '<span style="color: black">hello world</span>'
  },
  '\033[31mred\033[0m': {
    input: '\033[31mhello world\033[0m',
    output: '<span style="color: red">hello world</span>'
  },
  '\033[32mgreen\033[0m': {
    input: '\033[32mhello world\033[0m',
    output: '<span style="color: green">hello world</span>'
  },
  '\033[33myellow\033[0m': {
    input: '\033[33mhello world\033[0m',
    output: '<span style="color: yellow">hello world</span>'
  },
  '\033[34mblue\033[0m': {
    input: '\033[34mhello world\033[0m',
    output: '<span style="color: blue">hello world</span>'
  },
  '\033[35mpurple\033[0m': {
    input: '\033[35mhello world\033[0m',
    output: '<span style="color: purple">hello world</span>'
  },
  '\033[36mcyan\033[0m': {
    input: '\033[36mhello world\033[0m',
    output: '<span style="color: cyan">hello world</span>'
  },
  '\033[37mwhite\033[0m': {
    input: '\033[37mhello world\033[0m',
    output: '<span style="color: white">hello world</span>'
  },
  'high intensity \033[90mblack\033[0m': {
    input: '\033[90mhello world\033[0m',
    output: '<span style="color: #646464">hello world</span>'
  },
  'high intensity \033[91mred\033[0m': {
    input: '\033[91mhello world\033[0m',
    output: '<span style="color: #FFF0F0">hello world</span>'
  },
  'high intensity \033[92mgreen\033[0m': {
    input: '\033[92mhello world\033[0m',
    output: '<span style="color: #F0FFF0">hello world</span>'
  },
  'high intensity \033[93myellow\033[0m': {
    input: '\033[93mhello world\033[0m',
    output: '<span style="color: #FFFFF0">hello world</span>'
  },
  'high intensity \033[94mblue\033[0m': {
    input: '\033[94mhello world\033[0m',
    output: '<span style="color: #F0F0FF">hello world</span>'
  },
  'high intensity \033[95mmagenta\033[0m': {
    input: '\033[95mhello world\033[0m',
    output: '<span style="color: #FFF0FF">hello world</span>'
  },
  'high intensity \033[96mcyan\033[0m': {
    input: '\033[96mhello world\033[0m',
    output: '<span style="color: #F0FFFF">hello world</span>'
  },
  'high intensity \033[97mwhite\033[0m': {
    input: '\033[97mhello world\033[0m',
    output: '<span style="color: #FFFFFF">hello world</span>'
  }
};

function getTopics() {
  var topics = {};
  Object.keys(dataSets).forEach(function (set) {
    topics['when using ' + set + ' data set'] = {
      topic: ansispan(dataSets[set].input),
      'should return correct output': function (result) {
        assert.isString(result);
        assert.equal(result, dataSets[set].output);
      }
    };
  });
  return topics;
}

vows.describe('ansispan').addBatch({
  'When using ansispan': getTopics()
}).export(module);

