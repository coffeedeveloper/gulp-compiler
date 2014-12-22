var gulp = require('gulp')
var stylus = require('gulp-stylus')
var watch = require('gulp-watch')

gulp.task('compile', function() {
  gulp.src('./content/stylus/*.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./content/dist'))
})

gulp.watch('./content/stylus/*.styl', ['compile'])

gulp.task('default', ['compile'])
