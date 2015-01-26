var config = {
  path: {
    source: './content/stylus',
    dist: './content/dist',
    import: 'import/*.styl'
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
