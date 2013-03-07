/*
 * grunt-browserify
 * https://github.com/pix/grunt-browserify
 *
 * Copyright (c) 2013 Camille Moncelier
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  var browserify = require('browserify');

  function getBrowserify(opts) {
    var b = browserify(grunt.util._.omit(opts, [
      'require', 'ignore', 'alias', 'prepend', 'append', 'before',
    ]));

    // require
    if (opts.require) { b.require(opts.require); }

    // ignore
    if (opts.ignore) { b.ignore(opts.ignore); }

    // alias
    Object.keys(opts.alias).forEach(function(from) {
      var to = opts.alias[from];
      grunt.verbose.writeln('Adding alias "' + from + '" to "' + to + '"');
      b.alias(to, from);
    });

    // prepend
    var prepend = grunt.file.expand({filter: 'isFile'}, opts.prepend).map(function(filepath) {
      return grunt.file.read(filepath);
    }).join('');
    b.prepend(prepend);

    // append
    var append = grunt.file.expand({filter: 'isFile'}, opts.append).map(function(filepath) {
      return grunt.file.read(filepath);
    }).join('');
    b.append(append);

    return b;
  }

  grunt.registerMultiTask('browserify', 'Compile with browserify.', function() {
    var self = this;
    var options = this.options({
      alias: {}, prepend: [], append: [],
    });
    this.files.forEach(function(file) {
      var b = getBrowserify(options);

      // before for using plugins
      if (typeof options.before === 'function') {
        options.before.call(self, b);
      }

      grunt.file.expand({filter: 'isFile'}, file.src).forEach(function(filepath) {
        grunt.verbose.writeln('Adding "' + file.src + '" to the entry file list');
        b.addEntry(filepath);
      });
      grunt.log.ok('Compiled to ' + file.dest);
      grunt.file.write(file.dest, b.bundle());
    });
  });

};
