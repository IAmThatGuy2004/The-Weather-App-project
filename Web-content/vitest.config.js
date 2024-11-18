import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // allows for global variables like document, window, etc.
    environment: 'jsdom', // ensures jsdom is used as the environment
  },
});