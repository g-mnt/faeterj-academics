module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
        'babel-preset-expo',
    ],
      env: {
          production: {
              plugins: ['react-native-paper/babel'],
          },
      },
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
