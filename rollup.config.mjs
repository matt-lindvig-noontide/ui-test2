import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import localResolve from 'rollup-plugin-local-resolve';
import generatePackageJson from 'rollup-plugin-generate-package-json'

export default {
   input: 'src/index.js',
   output: {
      file: 'public/bundle.js',
      format: 'umd',
      name: 'facilityhawk',
      sourcemap:true
   },
   plugins: [
      replace({
         preventAssignment: false,
         'process.env.NODE_ENV': '"production"'
      }),
      localResolve(),
      nodeResolve({
         browser: true,
         ignoreGlobal: false,
         include: ['node_modules/**', 'src/**'],
         skip: ['react', 'react-dom'],
         mainFields: ['index'],
      }),
      babel({
         babelHelpers: 'bundled',
         presets: ['@babel/preset-react'],
         plugins: [
           [
             'module-resolver',
             {
               root: ['./src'],
               // alias: {
               //    "^(.+)/(.+)": "./src/\\1/\\2/index.js"
               // }
             }
           ]
         ],
         extensions: ['.js', '.jsx']
      }),
      commonjs(),
      peerDepsExternal(),
   ]
}