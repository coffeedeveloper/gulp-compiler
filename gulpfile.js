var gulp         = require('gulp');

var path         = require('path');
var assign       = require('object-assign');
var chmod        = require('gulp-chmod');

//server
var watch        = require('gulp-watch');
var nodemon      = require('gulp-nodemon');

//css
var stylus       = require('gulp-stylus');
var less         = require('gulp-less');
var minifyCSS    = require('gulp-minify-css');

var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var react        = require('gulp-react');
var imagemin     = require('gulp-imagemin');
var del          = require('del');

var webpack      = require('webpack');


//var clean        = require('gulp-clean')

var config = require('./gulpconfig');
var tasks  = config.tasks;

gulp.task('compile', function () {
  tasks.forEach(function (task) {
    var bundles = task.bundles;

    bundles.forEach(function (bundle) {
      //inclue all file
      var files = [];
      bundle.files.forEach(function (f, i, arr) {
        files.push(path.join(bundle.source || task.path.source, f));
      });

      var stylusConfig = {};

      var lessConfig = {};

      if (task.sourcemaps) {
        stylusConfig.sourcemap = {
          inline: true, sourceRoot: '.',
          basePath: task.path.dist
        };
      }

      var sourcemapsInitConfig = { loadMaps: true };

      var sourcemapsWriteConfig = {
        includeContent: true, sourceRoot: '.'
      };

      if (bundle.import !== false && task.path.import !== false) {
        stylusConfig.import = bundle.import || task.path.import;
        lessConfig.paths = [bundle.import || task.path.import];
      }

      var g = gulp.src(files);

      switch (task.preprocessor) {
        case 'stylus':
          g = g.pipe(stylus(stylusConfig));
          break;
        case 'less':
          g = g.pipe(less());
          break;
        case 'react':
          g = g.pipe(react());
          break;
      }

      if (task.sourcemaps)
        g = g.pipe(sourcemaps.init(sourcemapsInitConfig));

      if (task.autoprefix)
        g = g.pipe(autoprefixer());

      g = g.pipe(concat(bundle.name));

      if (task.sourcemaps)
        g = g.pipe(sourcemaps.write('.', sourcemapsWriteConfig));

      if (task.chmod)
        g = g.pipe(chmod(task.chmod));

      g.pipe(gulp.dest(task.path.dist));

    });
  });
});

gulp.task('minify', function() {
  config.minify.forEach(function (task) {
    var g = gulp.src(path.join(task.dist, task.files));

    switch (task.type) {
      case 'css':
        g = g.pipe(minifyCSS());
        break;
      case 'js':
        g = g.pipe(uglify());
        break;
    }

    g = g.pipe(rename({suffix: '.min'}));
    g = g.pipe(gulp.dest(task.dist));
  });
});

gulp.task('clean', function (callback) {
  var arr = [];
  tasks.forEach(function (task) {
    if (task.path && task.path.dist &&
        arr.indexOf(task.path.dist) === -1) {
      arr.push(task.path.dist);
    }
  });
  del(arr, callback);
});

gulp.task('watch', function() {
  tasks.forEach(function (task) {
    gulp.watch(task.path.watch, ['compile']);
  });
});

gulp.task('images', function () {
  gulp.src(config.images.source)
      .pipe(imagemin({optimizationLevel: config.images.level}))
      .pipe(gulp.dest(config.images.dist));
});

gulp.task('server', function () {
  nodemon(config.server.nodemon);
});

gulp.task('webpack', function (callback) {
  webpack({
    entry: config.server.webpack.entry,
    output: config.server.webpack.output,
    module: {
      loaders: [
        { test: /\.(js|jsx)$/, loader: 'babel-loader'}
      ]
    },
    resolve: {
      root: path.resolve('./'),
      extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
    watch: true
  }, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({}));
  });
});


gulp.task('default', ['clean', 'compile', 'watch']);

gulp.task('publish', ['minify']);
