module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            App: './App.tsx',
            assets: './assets',
            components: './components',
            constants: './constants',
            context: './context',
            hooks: './hooks',
            navigation: './navigation',
            providers: './providers',
            screens: './screens',
            types: './types.tsx',
            utils: './utils',
          },
        },
      ],
    ],
  }
}
