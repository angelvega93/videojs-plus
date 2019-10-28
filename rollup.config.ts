import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve';
import sass from 'rollup-plugin-sass';

const pkg = require('./package.json');

const libraryName = 'videojs-plus';

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      globals: {
        'video.js': 'videojs'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals: {
        'video.js': 'videojs'
      }
    }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['video.js'],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),

    sass({
      output: `dist/${libraryName}.css`,
      data: `@import './scss/index.scss';`
      // processor: css =>
      //   postcss([autoprefixer])
      //     .process(css)
      //     .then(result => result.css)
    }),

    serve({
      contentBase: ['dist', 'public']
    })
  ]
};
