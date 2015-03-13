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
var chmod        = require('gulp-chmod')
var react        = require('gulp-react')
var path         = require('path')

//var runSequence  = require('run-sequence').use(gulp)

var config = require('./gulpconfig')
var tasks  = config.tasks

gulp.task('compile', function () {
  tasks.forEach(function (task) {
    var bundles = task.bundles

    bundles.forEach(function (bundle) {
      //inclue all file
      var files = []
      bundle.files.forEach(function (f, i, arr) {
        files.push(path.join(bundle.source || task.path.source, f))
      })

      var stylusConfig = {}

      var lessConfig = {}

      if (task.sourcemaps) {
        stylusConfig.sourcemap = {
          inline: true, sourceRoot: '.',
          basePath: task.path.dist
        }
      }

      var sourcemapsInitConfig = { loadMaps: true }

      var sourcemapsWriteConfig = {
        includeContent: true, sourceRoot: '.'
      }

      if (bundle.import !== false && task.path.import !== false) {
        stylusConfig.import = bundle.import || task.path.import
        lessConfig.paths = [bundle.import || task.path.import]
      }

      var g = gulp.src(files)

      switch (task.preprocessor) {
        case 'stylus':
          g = g.pipe(stylus(stylusConfig))
          break
        case 'less':
          g = g.pipe(less())
          break
        case 'react':
          g = g.pipe(react())
          break
      }

      if (task.sourcemaps)
        g = g.pipe(sourcemaps.init(sourcemapsInitConfig))

      if (task.autoprefix)
        g = g.pipe(autoprefixer())

      g = g.pipe(concat(bundle.name))

      if (task.sourcemaps)
        g = g.pipe(sourcemaps.write('.', sourcemapsWriteConfig))

      if (task.chmod)
        g = g.pipe(chmod(task.chmod))

      g.pipe(gulp.dest(task.path.dist))

    })
  })
})

gulp.task('minify', function() {
  gulp.src(path.join(config.path.dist, '*.css'))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.path.dist))
})

gulp.task('clean', function() {
  tasks.forEach(function (task) {
    gulp.src(path.join(task.path.dist, '*'))
        .pipe(clean())
  })
})

gulp.task('watch', function() {
  tasks.forEach(function (task) {
    gulp.watch(task.path.watch, ['compile'])
  })
})


gulp.task('default', ['clean', 'compile', 'watch'])

gulp.task('publish', ['minify'])
