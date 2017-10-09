module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "env": {
      "browser": true
    },
    // add your custom rules here
    "rules": {
      "semi": 0,
      "eol-last": 0,
      'arrow-parens': 0,
      'comma-dangle': 0,
      'no-new': 0,
      'no-console': 0,
      'no-debugger': 0,
      'import/extensions': 0,
      'space-before-function-paren': 0,
      'object-shorthand': 0,
      'func-names': 0,
      // 'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}