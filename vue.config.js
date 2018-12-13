module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/dice' : '/',
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 18080, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },
};

