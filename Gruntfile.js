'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    jshint: {
      mocha: {
        src: ['test/*test.js'],
        options: {
          globals: {
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true
          }
        }
      },
      server: {
        src: ['Gruntfile.js', 'server.js', 'models/*.js', 'routes/*.js']
      },
      client: {
        src: ['app/**/*.js'],
        options: {
          globals: {
            angular: true
          }
        }
      },
      options: {
        node: true
      }
    },

    simplemocha: {
      dev: {
        src: ['test/**/*.js']
      },
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: true,
        ui: 'bdd',
        reporter: 'tap'
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.jsx',
        output: {
          path: 'build/',
          file: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /\.jsx/,
              loader: 'jsx-loader'
            }
          ]
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    }
  });

  grunt.registerTask('mochatest', ['simplemocha:dev']);
  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('jshint:all', ['jshint:mocha', 'jshint:server', 'jshint:client']);
};
