/*
 * @Author: Alan
 * @LastEditors: Alan
 */
module.exports = () => ({
    noUnusedParameters: true,
    noUnusedLocals: true,
    strictNullChecks: true,
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: true,
    allowSyntheticDefaultImports: true,
    sourceMap: true,
    forceConsistentCasingInFileNames: true,
    noImplicitReturns: false,
    suppressImplicitAnyIndexErrors: true,
    allowJs: true,
    skipLibCheck: true,
    experimentalDecorators: true,
    strict: true,
    allowUnreachableCode: false,
    strictNullChecks: true,
    noImplicitAny: true,
    baseUrl: ".",
    paths: {
        "@/*": ["./src/*"]
    }
})
