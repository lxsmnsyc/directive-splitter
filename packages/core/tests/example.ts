import * as compiler from '../src';

export const SERVER: compiler.Options = {
  directives: [
    {
      value: 'use server',
      import: {
        source: 'directive-splitter/example-server',
        kind: 'named',
        name: 'server',
      },
    },
  ],
  mode: 'server',
  env: 'development',
};
export const CLIENT: compiler.Options = {
  directives: [
    {
      value: 'use server',
      import: {
        source: 'directive-splitter/example-client',
        kind: 'named',
        name: 'server',
      },
    },
  ],
  mode: 'client',
  env: 'development',
};
export const ID = 'example.ts';