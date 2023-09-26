//jest.config.js
module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  "moduleNameMapper": {
    "axios": "axios/dist/node/axios.cjs"
  }
};
