module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./"],
          alias: {
            "components": "./components",
            "assets": "./assets",
            "constants": "./constants",
            "hooks": "./hooks",
            "navigation": "./navigation",
            "context": "./context",
            "providers": "./providers",
            "screens": "./screens",
            "App": "./App.tsx",
            "types": "./types.tsx"
          },
        },
      ],
    ],
  };
};
