require('babel-register');
var getConfig = require('hjs-webpack');

module.exports = getConfig({
    in: 'src/main.js',
    out: 'dist',
    clearBeforeBuild: true
});