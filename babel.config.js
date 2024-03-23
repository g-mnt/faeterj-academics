module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
        'babel-preset-expo',
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
      plugins: [
          ['module-resolver', {
              alias: {
                  'mocks': './__mocks__',
                  '@': './src',
                  '@assets': './assets',
                  '@components': './src/components',
                  '@hooks': './src/hooks',
                  '@navigations': './src/navigations',
                  '@repositories': './src/services',
                  '@screens': './src/screens',
                  '@types': './src/types',
                  '@stores': './src/stores',
                  '@utils': './src/utils',
              }
          }]
      ]
  };
};
