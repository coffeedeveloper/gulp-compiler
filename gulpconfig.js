var config = {
  autoprefix: true,
  chmod: 666,
  server: {
    nodemon: {
      script: 'server.js',
      ext: 'js html',
      env: {'NODE_ENV': 'development'}
    },
    webpack: {
      entry: './scripts/entry.js',
      output: {
        path: './build',
        filename: 'client.js'
      }
    }
  },
  images: {
    level: 5,
    source: './content/images/*',
    dist: './content/dist'
  },
  minify: [
    {
      type: 'css',
      files: '*.css',
      dist: './content/dist',
    },
    {
      type: 'js',
      files: '*.js',
      dist: './content/dist',
    }
  ],
  tasks: [
    {
      preprocessor: 'stylus',
      sourcemaps: false,
      path: {
        source: './content/stylus',
        dist: './content/dist',
        import: 'import/*.styl',
        watch: './content/stylus/*.styl'
      },
      bundles: [
        {
          name: 'stylus.css',
          files: ['base.styl', 'site.styl']
        }
      ]
    },
    {
      preprocessor: 'stylus',
      sourcemaps: false,
      path: {
        source: './content/another',
        dist: './content/dist',
        import: false,
        watch: './content/another/*.styl'
      },
      bundles: [
        {
          name: 'xxoo.css',
          files: ['xxoo.styl']
        }
      ]
    },
    {
      preprocessor: 'less',
      sourcemaps: false,
      path: {
        source: './content/less',
        dist: './content/dist',
        import: false,
        watch: './content/less/*.less'
      },
      bundles: [
        {
          name: 'less.css',
          files: ['test.less']
        }
      ]
    },
    {
      preprocessor: 'react',
      sourcemaps: false,
      path: {
        source: './content/react',
        dist: './content/dist',
        import: 'import/',
        watch: './content/react/*.jsx'
      },
      bundles: [
        {
          name: 'test.js',
          files: ['test.jsx']
        }
      ]
    }
  ]
};

module.exports = config;
