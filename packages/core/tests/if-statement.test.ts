import { describe, it, expect } from 'vitest';
import * as compiler from '../src';
import { ID, CLIENT, SERVER } from './example';

describe('IfStatement', () => {
  describe('client', () => {
    it('should transform valid server if statements', async () => {
      const code = `
      if (cond()) {
        'use server';
        await doStuff();
      }
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
    it('should skip server if statements in non-async functions', async () => {
      const code = `
      const example = () => {
        if (cond()) {
          'use server';
          doStuff();
        }
      };
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
    it('should transform valid server functions with scope', async () => {
      const code = `
      async function foo() {
        const value = 'foo bar';
        if (cond()) {
          'use server';
          await doStuff(value);
        }
      }
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
    it('should skip top-level values for scope', async () => {
      const code = `
      const value = 'foo bar';
      if (cond()) {
        'use server';
        await doStuff(value);
      }
      `;
      expect(await compiler.compile(code, ID, CLIENT)).toMatchSnapshot();
    });
  });
  describe('server', () => {
    it('should transform valid server if statements', async () => {
      const code = `
      if (cond()) {
        'use server';
        await doStuff();
      }
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
    it('should skip server if statements in non-async functions', async () => {
      const code = `
      const example = () => {
        if (cond()) {
          'use server';
          doStuff();
        }
      };
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
    it('should transform valid server functions with scope', async () => {
      const code = `
      async function foo() {
        const value = 'foo bar';
        if (cond()) {
          'use server';
          await doStuff(value);
        }
      }
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
    it('should skip top-level values for scope', async () => {
      const code = `
      const value = 'foo bar';
      if (cond()) {
        'use server';
        await doStuff(value);
      }
      `;
      expect(await compiler.compile(code, ID, SERVER)).toMatchSnapshot();
    });
  });
});
