var config = {
  autoprefix: true,
  chmod: 666,
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
}

module.exports = config
