var gulp         = require('gulp')
var stylus       = require('gulp-stylus')
var watch        = require('gulp-watch')
var uglify       = require('gulp-uglify')
var minifyCSS    = require('gulp-minify-css')
var sourcemaps   = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var concat       = require('gulp-concat')
var rename       = require('gulp-rename')
var clean        = require('gulp-clean')
var less         = require('gulp-less')
var path         = require('path')

//var runSequence  = require('run-sequence').use(gulp)

var config  = require('./config')
var bundles = config.bundles

gulp.task('compile', function() {
  bundles.forEach(function(bundle) {
    var files = []
    bundle.files.forEach(function(f, i, arr) {
      files.push(path.join(bundle.source || config.path.source, f))
    })

    var stylusConfig = {}

    if (config.sourcemaps) {
      stylusConfig.sourcemap = {
        inline: true, sourceRoot: '.',
        basePath: config.path.dist
      }
    }

    var sourcemapsInitConfig = { loadMaps: true }

    var sourcemapsWriteConfig = {
      includeContent: true, sourceRoot: '.'
    }

    if (bundle.import !== false)
      stylusConfig.import = bundle.import || config.path.import

    var g = gulp.src(files)

    if (config.preprocessor == 'stylus')
      g = g.pipe(stylus(stylusConfig))

    if (config.sourcemaps)
      g = g.pipe(sourcemaps.init(sourcemapsInitConfig))

    if (config.autoprefix)
      g = g.pipe(autoprefixer())

    g = g.pipe(concat(bundle.name))

    if (config.sourcemaps)
      g = g.pipe(sourcemaps.write('.', sourcemapsWriteConfig))

    g.pipe(gulp.dest(config.path.dist))

  })
})

gulp.task('minify', function() {
  gulp.src(path.join(config.path.dist, '*.css'))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.path.dist))
})

gulp.task('clean', function() {
  gulp.src(path.join(config.path.dist, '*'))
      .pipe(clean())
})

gulp.watch(config.path.watch, ['compile'])

gulp.task('default', ['clean', 'compile'])

gulp.task('publish', ['minify'])
