import autoprefixer from 'autoprefixer'
import precss from 'precss'
import {plugin as analyze} from 'rollup-plugin-analyzer'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import autoExternal from 'rollup-plugin-auto-external'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

//
// Rubber Duck: compiling as commonjs in a node based build or runtime environment
// will "just work" because "externals" will be pulled down as package dependencies
// and imported / required appropriately.
//
// Rubber Duck: an object exported is one build, an array exported is Array.length builds.
export default [
  // Individual modules.
  ...[
    'rr-event-log',
    'rr-heartbeat',
    'rr-keyqueue',
    'rr-notify',
    'rr-scorekeeper',
  ].map((mod) => ({
    input: `src/${mod}/index.js`,
    output: {
      dir: 'dist/',
      exports: 'named',
      file: `${mod}.js`,
      format: 'cjs',
    },
    plugins: [
      analyze(),
      autoExternal(),
      resolve(),
      commonjs(),
      // This needs to go before babel.
      postcss({
        modules: true,
        plugins: [
          autoprefixer(),
          precss(),
        ],
      }),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
        externalHelpers: true,
        plugins: ['external-helpers'],
      }),
    ],
  })),
  // Kitchen sink module.
  {
    input: 'src/index.js',
    output: {
      dir: 'dist',
      exports: 'named',
      file: 'index.js',
      format: 'cjs',
    },
    plugins: [
      analyze(),
      autoExternal(),
      resolve(),
      commonjs(),
      // This needs to go before babel.
      postcss({
        modules: true,
        plugins: [
          autoprefixer(),
          precss(),
        ],
      }),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
        // Assuming external code will include any necessary polyfills or helpers.
        externalHelpers: true,
        plugins: ['external-helpers'],
      }),
    ],
  }
]
