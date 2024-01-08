import { describe, it, expect } from 'vitest';
import * as compiler from '../src';
import { ID, CLIENT, SERVER } from './example';

describe('FunctionDeclaration', () => {
  describe('client', () => {
    it('should transform valid server functions', async () => {
      const code = `
      async function example() {
        'use server';
        return 'foo bar';
      }
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
    it('should skip non-async server functions', async () => {
      const code = `
      function example() {
        'use server';
        return 'foo bar';
      }
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
    it('should transform valid server functions with scope', async () => {
      const code = `
      const outer = () => {
        const value = 'foo bar';
        async function example() {
          'use server';
          return value;
        }
      }
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
    it('should skip top-level values for scope', async () => {
      const code = `
      const value = 'foo bar';
      const outer = () => {
        async function example() {
          'use server';
          return value;
        }
      }
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
  });
  describe('server', () => {
    it('should transform valid server functions', async () => {
      const code = `
      async function example() {
        'use server';
        return 'foo bar';
      }
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
    it('should skip non-async server functions', async () => {
      const code = `
      function example() {
        'use server';
        return 'foo bar';
      }
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
    it('should transform valid server functions with scope', async () => {
      const code = `
      const outer = () => {
        const value = 'foo bar';
        async function example() {
          'use server';
          return value;
        }
      }
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
    it('should skip top-level values for scope', async () => {
      const code = `
      const value = 'foo bar';
      const outer = () => {
        async function example() {
          'use server';
          return value;
        }
      }
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
  });
});
