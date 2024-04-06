import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
   input: 'src/component.js',
   output: {
      file: 'public/bundle.js',
      format: 'cjs',
   },
   plugins: [
      nodeResolve({
         browser: true,
         dedupe: ['react', 'react-dom'],
      }),
      babel({
         babelHelpers: 'bundled',
         presets: ['@babel/preset-react'],
         extensions: ['.js', '.jsx']
      }),
      commonjs(),
      replace({
         preventAssignment: false,
         'process.env.NODE_ENV': '"production"'
      }),
      peerDepsExternal()
   ]
}