process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: (config) => {
    config.devServer.hot(true);

    // config.devServer.clientLogLevel('silent');
    config.devServer.overlay({ warnings: true, errors: true });
  },
};
