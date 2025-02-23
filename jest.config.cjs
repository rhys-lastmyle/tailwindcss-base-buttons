module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(color|color-convert|color-string|color-name)/)'
  ]
}; 