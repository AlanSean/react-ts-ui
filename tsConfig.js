module.exports = () => ({
  "noUnusedParameters": true,
  "target": "es6",
  "sourceMap": true,
  "jsx": "preserve",
  "allowSyntheticDefaultImports": true,
  "forceConsistentCasingInFileNames": true,
  "noImplicitReturns": false,
  "suppressImplicitAnyIndexErrors": true,
  "noUnusedLocals": true,
  "allowJs": true,
  "skipLibCheck": true,
  "experimentalDecorators": true,
  "strict": true,
  "allowUnreachableCode": false,
  "strictNullChecks": true,
  "declaration": true,
  "noImplicitAny": true,
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
})