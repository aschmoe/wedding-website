'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: [
          'assets/scss',
          'bower_components/bourbon/app/assets/stylesheets'
        ]
      },
      dist: {
        options: {
          outputStyle: 'extended'
        },
        files: {
          'assets/css/screen.css': 'assets/scss/screen.scss',
          'assets/css/app.css': 'assets/scss/app.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass']
      },
      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      },
      livereload: {
        files: ['*.hbs', '!assets/bower_components/**', 'assets/js/**/*.js', 'assets/css/**/*.css', 'assets/images/**/*.{jpg,gif,svg,jpeg,png}']
      }
    }

  });

  
  grunt.registerTask('compile-sass', ['sass']);
  
  grunt.registerTask('default', ['compile-sass', 'watch']);
};
