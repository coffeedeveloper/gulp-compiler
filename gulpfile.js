var gulp         = require('gulp')
var stylus       = require('gulp-stylus')
var watch        = require('gulp-watch')
var uglify       = require('gulp-uglify')
var minifyCSS    = require('gulp-minify-css')
var sourcemaps   = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var concat       = require('gulp-concat')

gulp.task('compile', function() {
  gulp.src('./content/stylus/*.styl')
      .pipe(stylus())
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./content/dist'))
})

gulp.watch('./content/stylus/*.styl', ['compile'])

gulp.task('default', ['compile'])
