import typescript from 'rollup-plugin-ts';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { folderInput } from 'rollup-plugin-folder-input';
import { terser } from 'rollup-plugin-terser';

export default {
  input: [
    'src/**/*.ts',
  ],
  output: {
    dir: 'lib',
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'auto',
  },
  external: ['axios', 'jwt-decode', 'universal-cookie'],
  plugins: [
    folderInput(),
    peerDepsExternal({
      includeDependencies: true,
    }),
    json(),
    typescript({
      tsconfig: resolvedConfig => ({
        ...resolvedConfig,
        declaration: true,
        importHelpers: true,
        plugins: [
          {
            "transform": "@zerollup/ts-transform-paths",
            "exclude": ["*"]
          }
        ]
      }),
    }),
    terser(),
  ],
};
