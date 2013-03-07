module.exports = function (grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    browserify: {
      tests: {
        src: 'test/fixtures/index.js',
        dest: 'tmp/bundle.js',
      },
    },

    // clean up before and after tests
    clean: {
      files: ['tmp']
    },
    // run tests
    nodeunit: {
      files: ['test/*_test.js']
    },

    beautify: {
      files: '<%= jshint.files %>'
    },
    watch: {
      files: '<%= jshint.files %>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globals: {}
      }
    },
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-beautify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Run the test steps
  grunt.registerTask('test', ['clean', 'browserify', 'nodeunit', 'clean']);

  // Default task.
  grunt.registerTask('default', ['beautify', 'jshint', 'nodeunit']);

};
