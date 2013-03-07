'use strict';

var grunt = require('grunt');

exports.browserify = {
  bundle: function(test) {
    test.expect(2);
    var actual = grunt.file.read('tmp/bundle.js');
    test.ok(actual.indexOf("module.exports = 'im a lib';") !== -1);
    test.ok(actual.indexOf("var good = 'yes';") !== -1);
    test.done();
  },
};
