/*!
 * Gruntfile.js
 * 
 * Copyright (c) 2014
 */


module.exports = function (grunt) {


// Load tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
// Browsers
var browsers = [
  // Latest Versions
  { browserName: 'firefox', platform: 'WIN8' },
  { browserName: 'chrome', platform: 'WIN8' },
  { browserName: 'opera', platform: 'WIN7' },

  // Internet Explorer
  { browserName: 'internet explorer', platform: 'WIN8', version: '10' },
  { browserName: 'internet explorer', platform: 'VISTA', version: '9' },
  { browserName: 'internet explorer', platform: 'XP', version: '8' }
];

// Config
grunt.initConfig({

  // --------------------------------------------------------------------------
  // PKG CONFIG
  // --------------------------------------------------------------------------
  'pkg': grunt.file.readJSON('package.json'),

  // --------------------------------------------------------------------------
  // JSHINT
  // --------------------------------------------------------------------------
  'jshint': {
    src: [
      'Gruntfile.js',
      'src/**/*.js',
      'test/**/*.js'
    ],
    build: [
      'dist/**/*.js',
      '!dist/**/*.min.js'
    ],
    options: {
      jshintrc: '.jshintrc',
      force: true
    }
  },

  // --------------------------------------------------------------------------
  // CLEAN (EMPTY DIRECTORY)
  // --------------------------------------------------------------------------
  'clean': ['dist'],

  // --------------------------------------------------------------------------
  // REQUIREJS BUILD
  // --------------------------------------------------------------------------
  'requirejs': {
    compile: {
      options: {
        name: 'kid',
        baseUrl: 'src',
        out: 'dist/kid.js',
        optimize: 'none',
        skipModuleInsertion: true,
        onBuildWrite: function(name, path, contents) {
          return require('amdclean').clean({
            code: contents,
            prefixMode: 'camelCase',
            escodegen: {
              format: {
                indent: { style: '  ' }
              }
            }
          });
        }
      }
    }
  },

  // --------------------------------------------------------------------------
  // UMD WRAP
  // --------------------------------------------------------------------------
  'umd': {
    umd: {
      src: 'dist/kid.js',
      objectToExport: 'kid',
      globalAlias: 'kid',
      template: 'src/tmpls/umd.hbs',
      dest: 'dist/umd/kid.js'
    },
    amd: {
      src: 'dist/kid.js',
      objectToExport: 'kid',
      globalAlias: 'kid',
      template: 'src/tmpls/amd.hbs',
      dest: 'dist/amd/kid.js'
    },
    common: {
      src: 'dist/kid.js',
      objectToExport: 'kid',
      globalAlias: 'kid',
      template: 'src/tmpls/common.hbs',
      dest: 'dist/common/kid.js'
    },
    standalone: {
      src: 'dist/kid.js',
      objectToExport: 'kid',
      globalAlias: 'kid',
      template: 'src/tmpls/standalone.hbs',
      dest: 'dist/kid.js'
    }
  },

  // --------------------------------------------------------------------------
  // MINIFY JS
  // --------------------------------------------------------------------------
  'uglify': {
    all: {
      expand: true,
      cwd: 'dist/',
      src: ['**/*.js'],
      dest: 'dist/',
      ext: '.min.js'
    }
  },

  // --------------------------------------------------------------------------
  // STATIC SERVER
  // --------------------------------------------------------------------------
  'connect': {
    server: {
      options: { base: '', port: 9999 }
    }
  },

  // --------------------------------------------------------------------------
  // TESTS
  // --------------------------------------------------------------------------
  'saucelabs-mocha': {
    all: {
      options: {
        urls: ['http://127.0.0.1:9999/test/_runner.html'],
        build: process.env.TRAVIS_JOB_ID || '<%= pkg.version %>',
        tunnelTimeout: 5,
        concurrency: 3,
        browsers: browsers,
        testname: 'kid'
      }
    }
  },

  // --------------------------------------------------------------------------
  // MOCHA
  // --------------------------------------------------------------------------
  'mocha_phantomjs': {
    all: ['test/_runner.html']
  }

});

// Tasks    
grunt.registerTask('default', ['jshint:src', 'clean', 'requirejs', 'umd:umd', 'umd:amd', 'umd:common', 'umd:standalone', 'uglify', 'jshint:build']);
grunt.registerTask('test-local', ['default', 'mocha_phantomjs']);
grunt.registerTask('test', ['default', 'connect', 'saucelabs-mocha']);


};