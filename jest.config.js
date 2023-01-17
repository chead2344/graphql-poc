module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        diagnostics: {
          warnOnly: true,
        },
      },
    ],
  },
  testEnvironment: "node",
};
