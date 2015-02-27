var config = {
  preprocessor: 'stylus',
  sourcemaps: false,
  autoprefix: true,
  chmod: 666,
  path: {
    source: './content/stylus',
    dist: './content/dist',
    import: 'import/*.styl',
    watch: './content/stylus/*.styl'
  },
  bundles: [
    {
      name: 'site.css',
      files: ['base.styl', 'site.styl']
    },
    {
      name: 'app.css',
      files: ['base.styl', 'app.styl']
    }
  ]
}

module.exports = config
