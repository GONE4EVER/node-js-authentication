module.exports = {
  extends: ["airbnb-base"],
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    "ecmaVersion": 2019,
    sourceType: "module"
  },
  rules: {
    "no-multiple-empty-lines": ["error", { max: 2 }],
    "array-bracket-spacing": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline"
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true
      }
    ]
  }
};
