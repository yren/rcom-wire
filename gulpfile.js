var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha');

gulp.task('hint', function() {
  return gulp.src(['config/*.js', 'controllers/*.js', 
  'lib/*.js', 'models/*.js', 'schemas/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['hint'], function() {
  return gulp.src(['test/**/*.js'])
    .pipe(mocha());
});

gulp.task('default', ['test']);