module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'harvardHelp',
      externals: {
        react: 'React'
      }
    }
  }
}
