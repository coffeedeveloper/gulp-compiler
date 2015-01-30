var config = {
  preprocessor: 'stylus',
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
    },
    {
      name: 'test.css',
      source: '../',
      import: false,
      files: ['test.styl']
    }
  ]
}

module.exports = config
