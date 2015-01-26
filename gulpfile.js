var gulp         = require('gulp')
var stylus       = require('gulp-stylus')
var watch        = require('gulp-watch')
var uglify       = require('gulp-uglify')
var minifyCSS    = require('gulp-minify-css')
var sourcemaps   = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var concat       = require('gulp-concat')
var rename       = require('gulp-rename')
var path         = require('path')

var config     = require('./config')
var sourceFiles = path.join(config.path.source, '*.styl')

var bundles = config.bundles

gulp.task('compile', function() {
  gulp.src(['content/stylus/base.styl', 'content/stylus/app.styl'])
      .pipe(stylus())
      .pipe(concat('app.css'))
      .pipe(gulp.dest('content/dist'))

  // bundles.forEach(function(bundle) {
  //   var files = []
  //   bundle.files.forEach(function(f, i, arr) {
  //     files.push(path.join(config.path.source, f))
  //   })
  //   console.log(files)
  //   gulp.src(files)
  //       .pipe(stylus())
  //       .pipe(rename(bundle.name))
  //       .pipe(gulp.dest(config.path.dist))
  // })
  // gulp.src(sourceFiles)
  //     .pipe(stylus({
  //       import: config.path.import,
  //       sourcemap: {
  //         inline: true,
  //         sourceRoot: '.',
  //         basePath: config.path.dist
  //       }
  //     }))
  //     .pipe(sourcemaps.init({
  //       loadMaps: true
  //     }))
  //     .pipe(autoprefixer())
  //     .pipe(sourcemaps.write('.', {
  //       includeContent: true,
  //       sourceRoot: '.'
  //     }))
  //     .pipe(gulp.dest(config.path.dist))
})

gulp.watch('./content/stylus/*.styl', ['compile'])

gulp.task('default', ['compile'])
