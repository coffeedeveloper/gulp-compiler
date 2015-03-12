var config = {
  preprocessor: 'less',
  sourcemaps: false,
  autoprefix: true,
  chmod: 666,
  path: {
    source: './content/less',
    dist: './content/dist',
    import: './import',
    watch: './content/less/*.less'
  },
  bundles: [
    {
      name: 'site.css',
      files: ['base.less', 'site.less']
    }
  ]
}

module.exports = config
