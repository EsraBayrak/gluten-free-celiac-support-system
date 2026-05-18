module.exports = [
    {
        files: ["**/*.js"],
        ignores: ["node_modules/**"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs"
        },
        languageOptions: {
             ecmaVersion: 2021,
             sourceType: "commonjs",
             globals: {
    console: "readonly",
    require: "readonly",
    module: "readonly",
    describe: "readonly",
    test: "readonly",
    expect: "readonly"
}
},
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "semi": ["error", "always"]
        }
    }
];